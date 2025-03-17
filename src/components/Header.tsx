import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import Tooltip from "./ToolTip";

export default function Header({ title }: { title: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Routes where back button should NOT be shown
  const hiddenRoutes = ["/", "/home"];

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl mb-3 dark:bg-gray-900">
      {/* Back Button (Hidden for specific routes) */}
      {!hiddenRoutes.includes(location.pathname) && (
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Tooltip text="Back">
            <ArrowLeftIcon className="w-4 h-4 md:w-6 md:h-6 text-primary dark:text-white" />
          </Tooltip>
        </button>
      )}

      {/* Page Title */}
      <h1 className="text-lg md:text-xl font-semibold text-primary dark:text-white">
        {title}
      </h1>
    </div>
  );
}
