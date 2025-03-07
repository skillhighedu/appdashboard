import { ReactNode, useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  text,
  children,
  position = "top",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Target Element */}
      {children}

      {/* Tooltip */}
      {visible && (
        <div
          className={`absolute  z-10 px-3 py-1 text-xs text-white bg-gray-900 dark:bg-white dark:text-black rounded-lg shadow-lg transition-opacity duration-300
          ${position === "top" ? "bottom-full mb-2" : ""}
          ${position === "bottom" ? "top-full mt-2" : ""}
          ${position === "left" ? "right-full mr-2" : ""}
          ${position === "right" ? "left-full ml-2" : ""}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
