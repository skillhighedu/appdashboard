import { motion } from "framer-motion";
import Logo from "@assets/images/logo.png";


const Loading = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <motion.img
          src={Logo}
          alt="Loading Logo"
          className="w-24 h-24"
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  };


export default Loading;
