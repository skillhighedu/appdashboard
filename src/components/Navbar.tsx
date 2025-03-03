import { useTheme } from "@hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Logo from "@assets/images/logo.png";
import { useState } from "react";


export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white text-gray-900 dark:bg-darkPrimary dark:text-white ">
      <div className="container mx-auto flex justify-between items-center py-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-auto w-[180px]" alt="Logo" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg">
          {["Home", "Services", "Portfolio", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-green-500 dark:hover:text-green-300 transition-all"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Section (Dark Mode & Mobile Menu) */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button

            className="px-6 py-3 text-md rounded-lg transition-all duration-300 
                 hover:scale-105 active:scale-95 cursor-pointer bg-secondary text-primary hidden md:flex"
          >
            Login
          </button>

          <button

            className="px-6 py-3 text-md rounded-lg transition-all duration-300 
                 hover:scale-105 active:scale-95 cursor-pointer bg-gradient-to-r from-[#0D8267] to-[#031C16] text-white hidden md:flex"
          >
            Join Now
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(true)} className="md:hidden p-2">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sliding Menu from Top */}
            <motion.div
              className="fixed top-0 left-0 w-full bg-white dark:bg-darkPrimary dark:text-white shadow-lg z-50 flex flex-col p-6 space-y-6"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end p-2 text-gray-700 dark:text-gray-300"
              >
                <X size={28} />
              </button>

              {/* Menu Links */}
              {["Home", "Services", "Portfolio", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-lg font-medium hover:text-green-500 dark:hover:text-green-300 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}

              {/* Mobile Button */}
              <div className="flex flex-row space-x-4">
                <button

                  className="px-6 py-3 text-md rounded-lg transition-all duration-300 
hover:scale-105 active:scale-95 cursor-pointer bg-secondary text-primary "
                >
                  Login
                </button>

                <button

                  className="px-6 py-3 text-md rounded-lg transition-all duration-300 
hover:scale-105 active:scale-95 cursor-pointer bg-gradient-to-r from-[#0D8267] to-[#031C16] text-white "
                >
                  Join Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </nav>
  );
}
