
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return typeof window !== "undefined" && localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="w-full shadow-md bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo */}
        <a href="#" className="text-2xl font-bold">Loynix</a>

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
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
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
