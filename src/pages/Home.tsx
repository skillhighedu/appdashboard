import Courses from "@components/Courses";
import Greeting from "@components/Greetings";
import Header from "@components/Header";

function Home() {
  return (
    <div className="flex flex-col items-left  min-h-screen">
      <Greeting name="Sai kiran" />
      <Header title="Your Enrolled Courses" />
      <Courses />
    </div>
  );
}

export default Home;
