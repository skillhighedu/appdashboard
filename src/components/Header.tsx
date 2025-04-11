import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Tooltip from "./ToolTip";
import { Button } from "./ui/button";

interface HeaderProps {
  title: string;
  onSidebarToggle?: () => void; // Callback for toggling sidebar on mobile
  isSidebarOpen?: boolean; // Current sidebar state
}

export default function Header({
  title,
  onSidebarToggle,
  isSidebarOpen,
}: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Routes where the back button should be hidden
  const hiddenBackButtonRoutes = ["/", "/home"];
  const showBackButton = !hiddenBackButtonRoutes.includes(pathname);

  return (
    <header className="flex max-[90rem] items-center justify-between p-4 bg-white dark:bg-darkPrimary rounded-2xl mb-4 shadow-sm transition-colors duration-200">
      {/* Left Section: Back Button and Title */}
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Tooltip text="Go back">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-primary hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Navigate back"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>
          </Tooltip>
        )}

        <h1 className="text-lg md:text-xl font-semibold text-primary dark:text-white truncate max-w-[70vw] md:max-w-[50vw]">
          {title}
        </h1>
      </div>

      {/* Right Section: Sidebar Toggle (Mobile Only) */}
      {onSidebarToggle && (
        <div className="lg:hidden">
          <Tooltip text={isSidebarOpen ? "Close sidebar" : "Open sidebar"}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="text-primary hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label={`Toggle sidebar ${isSidebarOpen ? "closed" : "open"}`}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                {isSidebarOpen ? (
                  <span className="text-lg">✕</span>
                ) : (
                  <span className="text-lg">☰</span>
                )}
              </span>
            </Button>
          </Tooltip>
        </div>
      )}
    </header>
  );
}