import { useTheme } from "@hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  HomeIcon,
  // MessageCircle,
  PenBox,
} from "lucide-react";
import Logo from "@assets/images/logo.png";
import LogoWhite from "@assets/images/logpo-white.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@context/authStore";
import { useLocation } from "react-router-dom";
import Tooltip from "./ToolTip";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const currentRouteName = useLocation();
  const { isAuthenticated } = useAuthStore();

  // Define menu items with icons (filtering Home & Messages if not authenticated)
  const menuItems = [
    { name: "Home", href: "/home", icon: <HomeIcon size={20} /> },
    ...(isAuthenticated
      ? [
          // {
          //   name: "Messages",
          //   href: "/services",
          //   icon: <MessageCircle size={20} />,
          // },
        ]
      : []),

    { name: "Blogs", href: "/blogs", icon: <PenBox size={20} /> },
  ];

  return (
    <nav className="w-full bg-white text-gray-900 dark:bg-darkPrimary dark:text-white ">
      <div className="container mx-auto flex justify-between items-center py-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={theme === "dark" ? LogoWhite : Logo} className="h-auto w-[180px]" alt="Logo" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex text-sm items-center gap-2 ${
                currentRouteName.pathname === item.href ? "text-primary" : ""
              } hover:text-primary dark:hover:text-primary text-gray-500 dark:text-gray-100 transition-all`}
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Section (Dark Mode & Mobile Menu) */}
        <div className="flex items-center gap-1 md:gap-4">
          {/* Dark Mode Toggle */}
          <Tooltip
            text={theme === "dark" ? "Turn off DarkMode" : "Turn on DarkMode"}
            position="bottom"
          >
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition"
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </Tooltip>

          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <button className="px-6 py-3 text-md rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer bg-secondary text-primary hidden md:flex">
                  Login
                </button>
              </Link>
              <button className="px-6 py-3 text-md rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer bg-gradient-to-r from-[#0D8267] to-[#031C16] text-white hidden md:flex">
                Join Now
              </button>
            </>
          ) : (
            <Link to="/profile">
              <button className="p-3 text-md cursor-pointer rounded-full bg-secondary text-primary hidden md:flex">
                <User />
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 cursor-pointer"
          >
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
              className="fixed inset-0  bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sliding Menu from Top */}
            <motion.div
              className="fixed top-0 left-0 w-full bg-white dark:bg-darkSecondary dark:text-white shadow-lg z-50 flex flex-col p-6  space-y-6"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end p-2 text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <X size={28} />
              </button>

              {/* Menu Links */}
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-lg font-medium hover:text-green-500 dark:hover:text-green-300 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}

              {/* Mobile Buttons */}
              <div className="flex flex-row space-x-4">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <button className="p-3 text-md cursor-pointer rounded-full bg-secondary text-primary flex md:hidden">
                      <User />
                    </button>
                  </Link>
                ) : (
                  <div className="flex space-x-4">
                    <Link to="/login">
                      <button className="px-6 py-3 text-md rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer bg-secondary text-primary">
                        Login
                      </button>
                    </Link>
                    <button className="px-6 py-3 text-md rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer bg-gradient-to-r from-[#0D8267] to-[#031C16] text-white">
                      Join Now
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
