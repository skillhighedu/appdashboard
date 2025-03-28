import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import axios from "../config/axiosConfig";
import Input from "../components/Input";
import { useAuthStore } from "@context/authStore";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "@utils/errorHandler";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/button";
import { Eye, EyeClosed } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }

    setLoading(true);
    try {
      const response = await axios.post("/dashboardUsers/user/login", {
        email,
        password,
      });

      if (response.data) {
        toast.success(response.data.message);
        login(response.data.additional);
        navigate("/home");
      } else {
        toast.error("Invalid credentials! Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(handleApiError(error));
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
        {/* Login Header */}
        <h2 className="text-3xl font-bold text-center text-primary dark:text-white">
          Login
        </h2>

        {/* Login Form */}
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          {/* Email Input */}
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </span>
            }
            iconPosition="right"
          />

          {/* Forgot Password Link */}
          <div className="flex items-end justify-end text-sm">
            <Link
              to="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="text-white w-full cursor-pointer"
            size="lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Redirect to Email Verification */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/verification" className="text-primary hover:underline">
            Verify Email
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
