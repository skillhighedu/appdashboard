import { motion } from "framer-motion";
import { useEffect } from "react";
import { useStore } from "@context/useStore";
import { fetchSelectedCourse } from "../services/courseService";
import { Storage } from "@utils/storage";
import Header from "@components/Header";
import CircleProgress from "@components/CircleProgress";
import { Button } from "@components/ui/button";
import Loading from "@components/Loading";
import { PlayCircle, Brain, Folder,GraduationCap } from "lucide-react";
import Tooltip from "@components/ToolTip";
import { Link, useNavigate } from "react-router-dom";
import { generateCerticateService } from "../services/certificateServices";

export default function CourseDashboard() {
  const { selectedCourseData, setSelectedCourseData, setCertificateDetails } =
    useStore();
  const courseId = Storage.get("selectedCourseId");
  const navigate = useNavigate();
  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) return;

      try {
        const data = await fetchSelectedCourse(courseId);
        setSelectedCourseData(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    loadCourse();
  }, [courseId, setSelectedCourseData]);

  async function handleDownloadCertificate(courseId: string) {
    try {
      const data = await generateCerticateService(courseId,navigate);
      if (data) {
        console.log(data)
        setCertificateDetails(data);
       
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  }

  if (!selectedCourseData) return <Loading />;

  return (
    <div className="min-h-screen max-width-[90rem] dark:bg-darkPrimary p-4 md:p-6 space-y-6">
      <Header title="Course Dashboard" />

      {/* 📌 Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-white dark:bg-darkSecondary shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-darkPrimary p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
      >
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={selectedCourseData.courseData.courseThumbnail}
            alt={selectedCourseData.courseData.courseName}
            className="w-40 h-40 md:w-56 md:h-56 rounded-xl object-cover border-2 border-white dark:border-darkSecondary shadow-md"
          />
        </div>
        <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0D8267] dark:text-white">
            {selectedCourseData.courseData.courseName}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            {selectedCourseData.courseData.totalTopicsCount} Topics • Explore
            Below
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link to="/course_player">
              <Tooltip text="Jump into Lessons" position="bottom">
                <Button className="text-white rounded-lg cursor-pointer">
                  <PlayCircle /> Start Learning
                </Button>
              </Tooltip>
            </Link>
            <Link to="/quizList">
              <Tooltip text="Test Your Knowledge" position="bottom">
                <Button
                  variant="outline"
                  className="text-primary border-primary cursor-pointer rounded-lg"
                >
                  <Brain /> Take Quiz
                </Button>
              </Tooltip>
            </Link>
            <Link to="/projects">
              <Tooltip text="Build Something Cool" position="bottom">
                <Button
                  variant="outline"
                  className="text-primary border-primary cursor-pointer rounded-lg"
                >
                  <Folder /> Start Projects
                </Button>
              </Tooltip>
            </Link>

            <Tooltip text="Download Your Certificate" position="bottom">
              <Button
                onClick={() => handleDownloadCertificate(courseId)}
                variant="outline"
                className="text-primary border-primary cursor-pointer rounded-lg"
              >
                <GraduationCap /> Claim Certificates
              </Button>
            </Tooltip>
          </div>
        </div>
      </motion.div>
      {/* 🎯 Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        className="bg-white dark:bg-darkSecondary p-6 rounded-xl shadow-md border border-gray-200 dark:border-darkPrimary"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Your Progress
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <CircleProgress
            label="Topics Completed"
            value={selectedCourseData.topicProgress}
            navigate="/course_player"
          />
          <CircleProgress
            label="Quiz Progress"
            value={selectedCourseData.quizProgress}
            navigate="/quizList"
          />
          <CircleProgress
            label="Project Progress"
            value={selectedCourseData.projectProgress}
            navigate="/projects"
          />
        </div>
      </motion.div>

      {/* 🏗️ Course Curriculum */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
      >
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Course Curriculum
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCourseData.courseData.modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative bg-white dark:bg-darkSecondary rounded-xl p-5 shadow-md border border-gray-200 dark:border-darkPrimary hover:shadow-lg hover:border-[#0D8267] transition-all duration-300"
            >
              <span className="absolute top-2 right-2 bg-[#0D8267] text-white text-xs font-medium px-2 py-1 rounded-full">
                {index + 1}
              </span>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {module.moduleName}
              </h4>
              <ul className="space-y-2">
                {module.contents?.map((content) => (
                  <li
                    key={content.id}
                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 bg-[#0D8267] rounded-full"></span>
                    {content.contentName}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
