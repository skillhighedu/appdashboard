import Header from "@components/Header";
import Player from "@pages/Player";
import Sidebar from "@pages/Sidebar";

const PlayerLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Course Name"></Header>
      <div className="flex flex-row gap-4 w-full">
        <div className="w-3/4">
          <Player />
        </div>
        <div className="w-1/4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default PlayerLayout;
