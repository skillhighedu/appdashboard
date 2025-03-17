import { ReactNode } from "react";

interface ButtonProps {
  name: string;
  icon?: ReactNode;
  onClick?: () => void;  // Added onClick handler
  type?: "button" | "submit" | "reset";  // Allows different button types
}

export default function Button({ name, icon, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-xl 
                 bg-gradient-to-r from-[#0D8267] to-[#031C16] shadow-lg transition-all duration-300 
                 hover:scale-105 active:scale-95 cursor-pointer"
    >
      {name}
      {icon && <span>{icon}</span>}
    </button>
  );
}
