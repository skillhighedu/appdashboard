import { motion } from "framer-motion";
import { Link } from "react-router-dom";
interface CircleProgressProps {
  value: number;
  label: string;
  navigate: string;
}

export default function CircleProgress({
  value,
  label,
  navigate,
}: CircleProgressProps) {
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <Link to={navigate}>
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#c3ded8"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated Progress Circle */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#0d8267"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
          {/* Percentage Text */}
          <span className="absolute inset-0 flex items-center justify-center text-md sm:text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(value)}%
          </span>
        </div>
      </Link>
      {/* Label */}
      <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
        {label}
      </h3>
    </div>
  );
}
