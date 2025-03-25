import { useEffect, useState } from "react";
import { useStore } from "@context/useStore";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../services/courseService";
import { Storage } from "@utils/storage";
import Loading from "./Loading";

export default function Courses() {
  const { enrolledCourses, setEnrolledCourses } = useStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCourses();
        setEnrolledCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError("Unable to load courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [setEnrolledCourses]);

  const handleSelectedCourse = (courseId: string) => {
    Storage.set("selectedCourseId", courseId);
    navigate("/courseDashboard");
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <h2 className="mb-6 text-2xl font-bold text-darkBg dark:text-white sm:text-3xl">
        Your Enrolled Courses
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }}
      >
        {isLoading ? (
          <div className="col-span-full flex justify-center">
            <Loading />
          </div>
        ) : error ? (
          <div className="col-span-full text-center">
            <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
            <button
              className="mt-4 rounded-lg bg-[#0D8267] px-6 py-2 text-white hover:bg-[#0F9B7C]"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : enrolledCourses && enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-white dark:bg-darkSecondary rounded-3xl shadow-sm border-0 overflow-hidden dark:border-0 dark:border-darkPrimary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileInView={{
                y: [0, -2, 0],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.div
                className="relative w-full h-72 sm:h-80 md:h-96 lg:h-80"
                initial={{ opacity: 0.8, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <img
                  src={course.courseThumbnail}
                  alt={course.courseName}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </motion.div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold text-darkBg dark:text-white">
                  {course.courseName}
                </h3>

                <motion.button
                  className={`cursor-pointer mt-4 text-sm sm:text-md text-white py-2 px-4 rounded-lg flex items-center justify-center ${
                    course.topicCount === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#0D8267] to-[#031C16]"
                  }`}
                  disabled={course.topicCount === 0}
                  aria-label={`Go to Course ${course.courseName || course.id}`}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectedCourse(course.id)}
                >
                  {course.topicCount === 0
                    ? "Lessons will be updated soon.."
                    : "Go to Course"}
                  {course.topicCount > 0 && <Rocket className="ml-3" />}
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
              No enrolled courses yet? Start your learning journey!
            </p>
            <motion.button
              className="rounded-lg bg-[#0D8267] px-6 py-2.5 text-white hover:bg-[#0F9B7C]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/explore")}
            >
              Explore Courses
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
