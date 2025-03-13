import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import axios from "../config/axiosConfig";
import Input from "../components/Input";
import { useAuthStore } from "@context/authStore";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "@utils/errorHandler";
import { Link } from "react-router-dom";
//FIX PAGE REFRESH AFTER INCORRECT PASSWORD AND TYPES
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Stop form from refreshing
    console.log("Form submitted - Preventing refresh!"); // Debug Log

    setLoading(true);

    try {
      const response = await axios.post("/dashboardUsers/login", {
        email,
        password,
      });

      console.log("Response received:", response); // Debug Log

      if (response.data.success) {
        toast.success(response.data.message);
        login(response.data.token);
        navigate("/home");
      } else {
        toast.error("Invalid credentials! Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setTimeout(() => {
        toast.error(handleApiError(error));
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen dark:bg-darkPrimary px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-darkSecondary shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-primary dark:text-white">
          Login
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" /> Remember me
            </label>
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 px-4 py-3 text-white font-medium rounded-lg bg-gradient-to-r from-[#0D8267] to-[#031C16] shadow-md hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
         <Link to="/verification">
         <a className="text-primary hover:underline">
            Verify Email
          </a>
         </Link>
        </p>
      </motion.div>
    </div>
  );
}
