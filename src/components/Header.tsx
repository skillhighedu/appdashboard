import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Tooltip from "./ToolTip";

interface HeaderProps {
  title: string;
  onSidebarToggle?: () => void; // Optional sidebar toggle for mobile
  isSidebarOpen?: boolean; // Optional sidebar state
}

export default function Header({
  title,
  onSidebarToggle,
  isSidebarOpen,
}: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Routes where back button should NOT be shown
  const hiddenRoutes = ["/", "/home"];

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl mb-3 dark:bg-darkSecondary shadow-sm">
      {/* Left Section - Back Button and Title */}
      <div className="flex items-center gap-4">
        {/* Back Button (Hidden for specific routes) */}
        {!hiddenRoutes.includes(location.pathname) && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Tooltip text="Back">
              <ArrowLeftIcon className="w-4 h-4 md:w-6 md:h-6 text-primary dark:text-white cursor-pointer" />
            </Tooltip>
          </button>
        )}

        {/* Page Title */}
        <h1 className="text-lg md:text-xl font-semibold text-primary dark:text-white truncate">
          {title}
        </h1>
      </div>

      {/* Right Section - Sidebar Toggle (Mobile Only) */}
      {onSidebarToggle && (
        <button
          onClick={onSidebarToggle}
          className="lg:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Tooltip text={isSidebarOpen ? "Close sidebar" : "Open sidebar"}>
            <span className="w-6 h-6 flex items-center justify-center text-primary dark:text-white">
              {isSidebarOpen ? "✕" : "☰"}
            </span>
          </Tooltip>
        </button>
      )}
    </div>
  );
}
