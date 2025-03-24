import Button from "@components/Button";
import { useState } from "react";
import {useStore} from '@context/useStore'
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import Input from "@components/Input";
import { sendEmailOtp } from "../services/auth-service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function VerifyUser() {

  const [otpMessage, setOtpMessage] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {email,setEmail} = useStore()

  const handleVerifyEmail = async () => {
    if (!email) {
      setOtpMessage("Please enter a valid email");
      return;
    }

    setLoading(true);

      const message = await sendEmailOtp(email);
      toast.success(message)
      if(message)
      {
        navigate('/otp')
      }


 
      setLoading(false);
    
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen dark:bg-darkPrimary px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-darkSecondary shadow-sm border-0 rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-primary dark:text-white">
          Verify Your Email
        </h2>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            name={loading ? "Sending..." : "Verify Email"}
            icon={<Mail />}
            
            onClick={handleVerifyEmail}
          />

          {otpMessage && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              {otpMessage}
            </p>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="#" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
