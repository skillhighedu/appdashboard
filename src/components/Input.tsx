import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="w-full mb-3">
      {/* Label */}
      {label && <label className="block text-gray-700 dark:text-gray-300 mb-3">{label}</label>}

      {/* Input Field */}
      <input
        {...props}
        className={`w-full px-4 py-3 border rounded-lg bg-gray-100 dark:bg-darkPrimary dark:text-white focus:ring-2 focus:ring-primary outline-none transition 
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
