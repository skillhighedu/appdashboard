import { useState } from "react";
import Header from "@components/Header";
import Player from "@pages/Player";
import Sidebar from "@pages/Sidebar";

const PlayerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-darkPrimary">
      {/* Header with sidebar toggle button */}
      <Header 
        title="Course Dashboard" 
        onSidebarToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Player Section */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
          <div className="w-full max-w-6xl">
            <Player />
          </div>
        </main>

        {/* Sidebar - Mobile Drawer & Desktop Static */}
        <div
          className={`fixed inset-y-0 right-0 w-72 md:w-80 bg-white dark:bg-darkSecondary shadow-2xl
            transform transition-all duration-300 ease-in-out z-40
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
            lg:static lg:translate-x-0 lg:w-80 lg:shadow-none`}
        >
          {/* Sidebar Header for Mobile */}
          <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ✕
            </button>
          </div>
          
          {/* Sidebar Content */}
          <div className="h-[calc(100%-4rem)] lg:h-full overflow-y-auto">
            <Sidebar />
          </div>
        </div>

        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30
            transition-opacity duration-300 lg:hidden
            ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default PlayerLayout;