import { useEffect } from "react";
import { useStore } from "@context/useStore";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {fetchCourses} from '../services/courseService'

export default function Courses() {

  const {  enrolledCourses,setEnrolledCourses } = useStore();
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses(); 
        setEnrolledCourses(data)
      } catch (error) {
       console.log(error)
      }
    };

    loadCourses();
  }, [setEnrolledCourses]);

 
  return (
    <div className="p-6">
      <motion.h1 
        className="text-2xl font-bold mb-6 text-darkBg dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Courses
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
      >
        {enrolledCourses && enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-white dark:bg-dark rounded-3xl shadow-lg overflow-hidden dark:border-2 dark:border-dark"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Course Image */}
              <motion.div 
                className="relative w-full h-72 sm:h-80 md:h-96 lg:h-72"
                initial={{ opacity: 0.8, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <img
                  src={course.courseThumbnail}
                  alt={course.courseName}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </motion.div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-darkBg dark:text-white">
                  {course.courseName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                  {course.courseDescription}
                </p>
                <span className="block mt-2 text-sm font-medium text-gray-500">
                  {course.courseCount} Lessons
                </span>

                {/* Button Logic */}
              <Link to="/courseDashboard">
              <motion.button
                  className={` cursor-pointer mt-4 text-sm sm:text-md text-white py-2 px-4 rounded-lg flex items-center justify-center ${
                    course.topicCount === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#0D8267] to-[#031C16]'
                  }`}

                  disabled={course.topicCount === 0}
                  aria-label={`Go to Course ${course.courseName || course.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {course.topicCount === 0
                    ? 'Lessons will be updated soon..'
                    : 'Go to Course'}
                  {course.topicCount > 0 && <Rocket className="ml-3" />}
                </motion.button>
              </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p 
            className="text-center text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            No enrolled courses yet!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
