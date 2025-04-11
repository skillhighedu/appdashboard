import { useState, useEffect } from "react";

const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning! ";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon! ";
  } else if (hour >= 17 && hour < 21) {
    return "Good Evening! ";
  } else {
    return "Good Night!";
  }
};

export default function Greeting({ name }: { name: string }) {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGreeting(getGreeting()); // Update greeting every hour
      },
      1000 * 60 * 60,
    );

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="text-lg md:text-3xl lg:text-4xl font-semibold text-darkPrimary dark:text-white p-4 text-left mt-3">
      {greeting} <span className="text-primary font-bold">{name}</span>
    </div>
  );
}
