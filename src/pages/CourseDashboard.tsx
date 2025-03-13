import { motion } from "framer-motion";
import { useEffect } from "react";
import { useStore } from "@context/useStore";
import { fetchSelectedCourse } from "../services/courseService";
import { Storage } from "@utils/storage";
import Header from "@components/Header";
import CircleProgress from "@components/CircleProgress";
import Button from "@components/Button";
import Loading from "@components/Loading";
import { Zap, Brain, Folder } from 'lucide-react'
import Tooltip from "@components/ToolTip";
import { Link } from "react-router-dom";

export default function CourseDashboard() {
  const { selectedCourseData, setSelectedCourseData } = useStore();
  const courseId = Storage.get("selectedCourseId");

  useEffect(() => {
    const loadCourses = async () => {
      if (!courseId) return;

      try {
        const data = await fetchSelectedCourse(courseId);
        setSelectedCourseData(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    loadCourses();
  }, [courseId, setSelectedCourseData]);

  if (!selectedCourseData) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      <Header title="Course Dashboard" />

      {/* 📌 Course Header with Image & Name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white shadow-sm border-0 rounded-2xl overflow-hidden p-8 flex flex-col md:flex-row items-center gap-8"
      >
        {/* 📷 Course Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={selectedCourseData.courseData.courseThumbnail}
            alt={selectedCourseData.courseData.courseName}
            className="w-48 h-48 md:w-60 md:h-60 rounded-2xl object-cover border-4 border-white dark:border-gray-700"
          />
        </div>

        {/* 📄 Course Info */}
        <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-primary">
            {selectedCourseData.courseData.courseName}
          </h1>
          <p className="text-lg">
            {selectedCourseData.courseData.totalTopicsCount} Topics
          </p>

          {/* Buttons Section */}
          <div className="flex flex-col  md:flex-row gap-4 justify-center md:justify-start">
            <Link to="/course_player">
              <Tooltip text="Start Learning Now" position="bottom">
                <Button name="Start Learning" icon={<Zap />} />
              </Tooltip>
            </Link>
            <Link to="/quizList">
              <Tooltip text="Quiz">
                <Button name="Take Quiz" icon={<Brain />} />
              </Tooltip>
            </Link>

            <Link to="/projects">
              <Tooltip text="Project">
                <Button name="Start Project" icon={<Folder />} />
              </Tooltip>
            </Link>


          </div>
        </div>
      </motion.div>

      {/* 🎯 Course Progress Overview */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-0">
        {/* Circular Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <CircleProgress
            label="Topics Completed"
            value={selectedCourseData.topicProgress}
          />
          <CircleProgress
            label="Quiz Progress"
            value={selectedCourseData.quizProgress}
          />
          <CircleProgress
            label="Project Progress"
            value={selectedCourseData.projectProgress}
          />
        </div>
      </div>

      {/* 🏗️ Course Modules */}
      {/* 🏗️ Course Modules */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Course Curriculum
        </h3>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCourseData.courseData.modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 
             hover:shadow-xl hover:border-primary transition-all duration-300"
            >
              {/* Module Index Badge */}
              <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                {index + 1}
              </span>

              {/* Module Title */}
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {module.moduleName}
              </h4>


              {/* 📜 Module Contents List */}
              <ul className="mt-4 space-y-2">
                {module.contents?.map((content) => (
                  <li
                    key={content.id}
                    className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {content.contentName}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
