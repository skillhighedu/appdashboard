import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning! Have a great start to your day!";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon! Keep pushing forward!";
  } else if (hour >= 17 && hour < 21) {
    return "Good Evening! Hope you had a productive day!";
  } else {
    return "Good Night! Rest well and recharge!";
  }
};

export default function Greeting({ name }: { name: string }) {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting()); // Update greeting if time changes
    }, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <motion.div
      key={greeting} // Animate when greeting changes
      initial={{ opacity: 0, y: -10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="text-lg md:text-3xl lg:text-4xl font-semibold text-darkPrimary dark:text-white p-4 text-left mt-3"
    >
      {greeting} <span className="text-primary font-bold">{name}</span>!
    </motion.div>
  );
}
