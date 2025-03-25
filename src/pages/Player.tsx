import { useState, useEffect } from "react";
import { useStore } from "@context/useStore";
import { fetchCourseTopics } from "../services/lessonsService";
import { Storage } from "@utils/storage";

export default function Player() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { selectedLesson, setSelectedLesson, setCourseLessons } = useStore();
  const courseId = Storage.get("selectedCourseId");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourseTopics(courseId);
        setCourseLessons(data);

        // ✅ Select the first lesson ONLY if no lesson is currently selected
        if (!selectedLesson && data.length > 0) {
          if (data[0]) {
            setSelectedLesson(data[0]);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading lessons:", error);
      }
    };

    loadCourses();
  }, []);

  return (
    <div className="w-full bg-white dark:bg-darkSecondary rounded-lg shadow-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {isLoading || !selectedLesson ? (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-lg" />
        ) : (
          <iframe
            src={selectedLesson.video}
            loading="lazy"
            className="absolute inset-0 w-full h-full rounded-t-lg"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          {selectedLesson?.title || "Lesson Title"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {selectedLesson?.description || "No description available."}
        </p>
      </div>

      {/* <div className="flex justify-between p-3">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all cursor-pointer">
          Previous
        </button>
        <button  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-all cursor-pointer">
          Next
        </button>
      </div> */}
    </div>
  );
}
