import { ReactNode } from "react";

interface ButtonProps {
  name: string;
  icon?: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline"; // Added variants
  disabled?: boolean; // Added disabled state
  size?: "sm" | "md" | "lg"; // Added size options
}

export default function Button({
  name,
  icon,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  size = "md",
}: ButtonProps) {
  // Base styles
  const baseStyles = "flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D8267]";

  // Variant styles
  const variantStyles = {
    primary: "text-white bg-gradient-to-r from-[#0D8267] to-[#031C16] shadow-lg hover:scale-105 active:scale-95",
    secondary: "text-[#0D8267] bg-gray-100 border border-[#0D8267] hover:bg-gray-200 active:bg-gray-300",
    outline: "text-[#0D8267] border border-[#0D8267] hover:bg-[#0D8267]/10 active:bg-[#0D8267]/20",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Disabled styles
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed scale-100" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{name}</span>
    </button>
  );
}