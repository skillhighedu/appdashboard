import { motion } from "framer-motion";

interface CircleProgressProps {
  value: number;
  label: string;
}

export default function CircleProgress({ value, label }: CircleProgressProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            className="text-primary dark:text-primary"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
        {/* Percentage Text */}
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-900 dark:text-white">
          {value}%
        </span>
      </div>
      {/* Label */}
      <h3 className="mt-2 text-lg font-semibold">{label}</h3>
    </div>
  );
}
