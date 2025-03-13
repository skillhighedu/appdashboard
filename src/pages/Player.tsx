import { useState, useEffect } from "react";
import { useStore } from "@context/useStore";
import { fetchCourseTopics } from "../services/lessonsService";
import {MessageCircle} from 'lucide-react'
export default function Content() {
  const [isLoading, setIsLoading] = useState(true);
  const { selectedLesson, setCourseLessons } = useStore();
  console.log(selectedLesson)
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourseTopics("67691eb73f409fe0a9890a04");
        setCourseLessons(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    loadCourses();
  }, [setCourseLessons]);

  return (
    <div className="w-full max-w-6xl bg-white dark:bg-darkBg shadow-sm border-0 rounded-xl overflow-hidden mx-auto">
      {/* Video Embed */}
      {isLoading || !selectedLesson ? (
        <div className="w-full" style={{ position: "relative", paddingTop: "56.25%" }}>
          <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-full h-full rounded-lg"></div>
        </div>
      ) : (
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src={selectedLesson.video}
            loading="lazy"
            style={{
              border: 0,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Video Details */}
      {/* Video Details */}
      <div className="p-6 bg-gray-50 dark:bg-dark border-t dark:border-gray-700 rounded-b-xl">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
          {selectedLesson?.title || "Lesson Title"}
        </h3>
        <p className="text-dark text-justify dark:text-gray-300">
          {selectedLesson?.description || "No description available."}
        </p>

        {/* Doubts Section */}
        <div className="flex items-center gap-3 mt-6 p-4 bg-white dark:bg-darkBg rounded-lg shadow">
          <MessageCircle className="w-6 h-6 text-primary dark:text-secondary" />
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Have doubts on this topic? <span className="text-primary">Raise a question for your mentor.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
