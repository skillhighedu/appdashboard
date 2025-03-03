import { useTheme } from "@hooks/useTheme";
import { Menu, X, Sun, Moon } from "lucide-react";
import Logo from "@assets/images/logo.png";
import { useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme(); 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white text-gray-900 dark:bg-darkPrimary dark:text-white">
      <div className="container mx-auto flex justify-between items-center p-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-auto w-[180px]" alt="Logo" />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li><a href="#" className="hover:text-green-500 dark:hover:text-green-300">Home</a></li>
          <li><a href="#" className="hover:text-green-500 dark:hover:text-green-300">Services</a></li>
          <li><a href="#" className="hover:text-green-500 dark:hover:text-green-300">Portfolio</a></li>
          <li><a href="#" className="hover:text-green-500 dark:hover:text-green-300">Contact</a></li>
        </ul>

        {/* Right Section (Dark Mode & Mobile Menu) */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button  onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-4 space-y-4 bg-white dark:bg-gray-900 dark:text-white transition-all">
          <a href="#" className="block hover:text-green-500 dark:hover:text-green-300">Home</a>
          <a href="#" className="block hover:text-green-500 dark:hover:text-green-300">Services</a>
          <a href="#" className="block hover:text-green-500 dark:hover:text-green-300">Portfolio</a>
          <a href="#" className="block hover:text-green-500 dark:hover:text-green-300">Contact</a>
        </div>
      )}
    </nav>
  );
}
