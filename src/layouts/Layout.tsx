import { ReactNode } from "react";
import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">


      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="p-4 overflow-auto h-full bg-gray-100 ">
          {children}
        </main>
          {/* Footer */}
          <Footer />
      </div>
    </div>
  );
};

export default Layout;
