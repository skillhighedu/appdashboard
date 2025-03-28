import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function Input({
  label,
  error,
  icon,
  iconPosition = "left",
  ...props
}: InputProps) {
  return (
    <div className="w-full mb-3">
      {/* Label */}
      {label && (
        <label className="block text-gray-700 dark:text-gray-300 mb-3 text-sm">
          {label}
        </label>
      )}

      {/* Input Wrapper (for Icon + Input) */}
      <div
        className={`relative flex items-center rounded-lg border transition ${
          error
            ? "border-red-500 focus-within:ring-red-500"
            : "border-gray-200 dark:border-gray-600 focus-within:ring-primary"
        }`}
      >
        {/* Left Icon */}
        {icon && iconPosition === "left" && (
          <span className="absolute left-3 text-gray-500">{icon}</span>
        )}

        {/* Input Field */}
        <input
          {...props}
          className={`w-full px-4 py-3 dark:bg-darkPrimary dark:text-white rounded-md outline-none focus:ring-2 focus:ring-primary ${
            icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""
          }`}
        />

        {/* Right Icon */}
        {icon && iconPosition === "right" && (
          <span className="absolute right-3 text-gray-500">{icon}</span>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
