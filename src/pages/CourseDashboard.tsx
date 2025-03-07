import { motion } from "framer-motion";
import Header from "@components/Header";

const courses = [
  {
    id: 1,
    name: "Full Stack Web Development",
    image: "https://source.unsplash.com/1200x400/?coding,web",
    lessons: 24,
    quizzes: 8,
    projects: 5,
    progress: 65, // Progress percentage
  }
];

export default function CourseDashboard() {
  return (
    <div className="p-6">
      <Header title="Course Dashboard" />

      {courses.map((course) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-white dark:bg-dark shadow-lg rounded-2xl overflow-hidden dark:border dark:border-gray-700"
        >
          {/* 📌 Course Cover Image */}
          <div className="relative w-full h-52 md:h-64 lg:h-72">
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 🏗️ Course Content Section */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 📚 Lessons Block */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                📚 Lessons
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                {course.lessons} Lessons
              </p>
            </div>

            {/* 📂 Quizzes & Projects Column */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 📝 Quizzes Box */}
              <div className="bg-green-100 dark:bg-green-800 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  📝 Quizzes
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                  {course.quizzes} Quizzes
                </p>
              </div>

              {/* 🚀 Projects Box */}
              <div className="bg-blue-100 dark:bg-blue-800 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  🚀 Projects
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                  {course.projects} Projects
                </p>
              </div>
            </div>
          </div>

          {/* 🔄 Progress Bar */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              📊 Progress
            </h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-2">
              <motion.div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${course.progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {course.progress}% Completed
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
