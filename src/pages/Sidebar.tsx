import { useState, useEffect, useMemo } from "react";
import { PlayIcon, Check } from "lucide-react";
import { useStore } from "@context/useStore";
import { Lesson } from "../types/lessons";
import { updateLessonCheckbox } from "../services/lessonsService";
import { Storage } from "@utils/storage";

export default function Sidebar() {
  const { courseLessons, setSelectedLesson, selectedLesson } = useStore();
  const [checkedLessons, setCheckedLessons] = useState<Record<string, boolean>>(
    {},
  );
  const courseId = Storage.get("selectedCourseId");

  // Initialize checkedLessons only once when courseLessons changes
  useEffect(() => {
    if (!Array.isArray(courseLessons) || courseLessons.length === 0) return;

    const newChecked = courseLessons.reduce<Record<string, boolean>>(
      (acc, lesson) => {
        acc[lesson.id] = Array.isArray(lesson.topicCheckbox)
          ? lesson.topicCheckbox[0]?.completed || false
          : false;
        return acc;
      },
      {},
    );

    // Update state only if there's a difference
    setCheckedLessons((prev) =>
      JSON.stringify(prev) === JSON.stringify(newChecked) ? prev : newChecked,
    );
  }, [courseLessons]);

  const handleCheckboxChange = async (lessonId: string) => {
    try {
      const newCheckedState = !checkedLessons[lessonId];
      setCheckedLessons((prev) => ({ ...prev, [lessonId]: newCheckedState }));

      await updateLessonCheckbox(lessonId, newCheckedState, courseId);
    } catch (error) {
      console.error("Failed to update lesson checkbox:", error);
    }
  };

  const lessonItems = useMemo(
    () =>
      courseLessons?.map((lesson: Lesson) => (
        <div
          key={lesson.id}
          className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
            selectedLesson?.id === lesson.id
              ? "bg-primary/10 border border-primary/20"
              : "bg-gray-50 dark:bg-darkPrimary hover:bg-gray-100"
          }`}
        >
          <input
            type="checkbox"
            id={`lesson-${lesson.id}`}
            checked={checkedLessons[lesson.id] || false}
            onChange={() => handleCheckboxChange(lesson.id)}
            className="hidden"
          />
          <label
            htmlFor={`lesson-${lesson.id}`}
            className={`flex-shrink-0 w-5 h-5 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all ${
              checkedLessons[lesson.id]
                ? "bg-primary border-primary text-white"
                : "border-gray-300 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-500"
            }`}
          >
            {checkedLessons[lesson.id] && <Check size={14} />}
          </label>

          <button
            onClick={() => setSelectedLesson(lesson)}
            className="flex items-center gap-2 w-full text-left cursor-pointer"
          >
            <PlayIcon
              className={`w-4 h-4 flex-shrink-0 transition-colors ${
                selectedLesson?.id === lesson.id
                  ? "text-primary"
                  : "text-gray-500 dark:text-gray-400 group-hover:text-primary"
              }`}
            />
            <span
              className={`text-sm font-medium transition-colors ${
                selectedLesson?.id === lesson.id
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-200 group-hover:text-primary"
              }`}
            >
              {lesson.title}
            </span>
          </button>
        </div>
      )),
    [courseLessons, checkedLessons, selectedLesson],
  );

  const filteredTrueLessons = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(checkedLessons).filter(([_, value]) => value === true),
  );

  return (
    <div className="fixed inset-y-0 left-0 lg:static w-auto rounded-lg bg-white dark:bg-darkSecondary transform transition-all duration-300 ease-in-out z-40">
      <div className="p-4 bg-gray-50 dark:bg-darkSecondary border-gray-200 rounded-lg flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Progress: {Object.keys(filteredTrueLessons).length} /{" "}
          {Object.keys(checkedLessons).length} Lessons Completed
        </h2>
      </div>

      <nav className="p-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {lessonItems}
      </nav>
    </div>
  );
}
