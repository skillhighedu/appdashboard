import Courses from "@components/Courses";
import Greeting from "@components/Greetings";

function Home() {
  return (
    <div className="flex flex-col items-left  min-h-screen">
      <Greeting  />

      <Courses />
    </div>
  );
}

export default Home;
