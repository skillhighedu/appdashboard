import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Dot_Pattern from "@assets/images/dot-pattern.png";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";
import Logo from "@assets/images/logo.png";
import { Link } from "react-router-dom";
export default function Hero() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <div
      className={`font-lexend rounded-3xl h-screen flex flex-col items-center justify-center text-center px-6 lg:px-12 
      dark:bg-darkPrimary dark:text-white`}
      style={
        !isDarkMode
          ? {
              backgroundImage: `url(${Dot_Pattern})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {/* Animated Title */}
      <motion.h1
        className="text-4xl  md:text-5xl font-bold text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-auto w-[350px]" alt="Logo" />
        </a>
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.h2
        className="text-lg text-darkSecondary dark:text-gray-200 md:text-4xl font-medium mt-7 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        Gain Skills. Get Certified. Reach Higher.
      </motion.h2>

      {/* Animated Button */}
      <motion.div
        className="mt-6 mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
      >
        <Link to="/login">
          <Button size="lg" className="text-white cursor-pointer">
            Get Started <ArrowRight />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
