import Courses from "@components/Courses";
import Greeting from "@components/Greetings";
import { useStore } from "@context/useStore";
import { useEffect } from "react";
import { fetchUserProfile } from "../services/userServices";

function Home() {
  const { studentName, setStudentName } = useStore(); // Ensure you destructure the setter function

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        if (profile?.name) {
          setStudentName(profile.name);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    loadUserProfile();
  }, [setStudentName]);

  return (
    <div className="flex flex-col items-left min-h-screen">
      <Greeting name={studentName || "Guest"} />
      <Courses />
    </div>
  );
}

export default Home;
