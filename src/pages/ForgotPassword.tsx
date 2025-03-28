import Input from "@components/Input";
import { useState } from "react";
import { motion } from "framer-motion";
import { forgotOtpService, resetPassword } from "../services/accountServices";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useStore } from "@context/useStore";

interface FormData {
  email: string;
  newPassword: string;
}

export default function ForgotPassword() {
  const { setEmail, setIsForgotPassword, isVerified, setIsVerified } =
    useStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    newPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormDetails = async () => {
    if (!formData.email) {
      toast.error("Whoops! Don’t leave me hanging—give me your email!");
      return;
    }

    if (isVerified && !formData.newPassword) {
      toast.error("No password? Don’t leave me guessing!");
      return;
    }

    if (isVerified && formData.newPassword.length < 8) {
      toast.error(
        "C’mon, your password’s shorter than a T-Rex’s arms! 8+ characters, please!",
      );
      return;
    }

    setIsSubmitting(true);

    const response = await forgotOtpService(formData.email);

    if (response.success) {
      setEmail(formData.email); // Store email in global state
      setIsForgotPassword(true);
      setIsVerified(true);
      toast.success(response.message);
      navigate("/otp");
    }

    setIsSubmitting(false);
  };

  const handleResetPassword = async () => {
    if (!formData.email) {
      toast.error("Whoops! Don’t leave me hanging—give me your email!");
      return;
    }

    if (isVerified && !formData.newPassword) {
      toast.error("No password? Don’t leave me guessing!");
      return;
    }

    if (isVerified && formData.newPassword.length < 8) {
      toast.error(
        "C’mon, your password’s shorter than a T-Rex’s arms! 8+ characters, please!",
      );
      return;
    }

    setIsSubmitting(true);

    const response = await resetPassword(formData.email, formData.newPassword);

    if (response) {
      setEmail(formData.email); // Store email in global state
      setIsForgotPassword(false);
      setIsVerified(false);
      toast.success(response.message);
      navigate("/login");
    }
    setIsSubmitting(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-darkSecondary">
          {/* Header */}
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-primary">
            Password Reset
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Forgot your password? No worries, we’ll ninja-kick it back to life
            with your email and a shiny new one!
          </p>

          {/* Form Fields */}
          <div className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="yourname@email.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            {isVerified && (
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                placeholder="Something cooler than 'password123'"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            )}

            {/* Submit Button */}
            <button
              onClick={isVerified ? handleResetPassword : handleFormDetails}
              disabled={isSubmitting}
              className={`w-full rounded-lg px-4 py-2.5 font-medium text-white transition-colors duration-200 ${
                isSubmitting
                  ? "cursor-not-allowed bg-primary/50"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              {isSubmitting
                ? "Doing the magic..."
                : isVerified
                  ? "Unleash the New Password!"
                  : "Verify Email"}
            </button>
          </div>

          {/* Optional Hint */}
          {isVerified && (
            <p className="mt-4 text-center text-xs text-gray-400">
              Pro tip: Make it 8+ characters or the password police will come
              for you!
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
