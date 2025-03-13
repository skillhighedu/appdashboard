import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useStore } from "@context/useStore";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { courseLessons, setSelectedLesson } = useStore();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-12 left-4 bg-primary text-white rounded-full p-3 z-50 shadow-md transition-all hover:bg-opacity-80"
      >
        {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 lg:relative bg-white dark:bg-darkBg text-gray-900 dark:text-white transition-all transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 h-full w-72 lg:w-full shadow-sm border-0 rounded-xl overflow-hidden z-40`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between text-primary items-center p-4 border-b border-secondary dark:border-gray-700 bg-secondary/15 dark:bg-gray-800">
          <h2 className="text-lg font-semibold">Course Lessons</h2>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-600 dark:text-gray-300">
            <X size={22} />
          </button>
        </div>

        {/* Lessons List */}
        <div className="overflow-y-auto max-h-[580px] px-4 py-2 space-y-3 relative">
          {courseLessons && courseLessons.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedLesson(topic)}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm hover:bg-primary hover:text-secondary dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {topic.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for Sidebar on Mobile */}
      {isSidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 lg:hidden z-30 transition-opacity"></div>
      )}
    </>
  );
}
