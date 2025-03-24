import Input from "@components/Input";
import { useState } from "react";
import { motion } from "framer-motion";
import { setDetails } from "../services/userServices";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  password: string;
}

export default function DetailsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormDetails = async () => {
    if (!formData.name || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    const response = await setDetails(formData.name, formData.password);
    if (response) {
      navigate("/home");
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
            Let’s Get You Set Up
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Pick a name and a strong password—something memorable but secure!
          </p>

          {/* Form Fields */}
          <div className="space-y-6">
            <Input
              label="Your Name"
              type="text"
              name="name"
              placeholder="Type your name here"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            />

            {/* Submit Button */}
            <button
              onClick={handleFormDetails}
              disabled={isSubmitting}
              className={`w-full rounded-lg px-4 py-2.5 font-medium text-white transition-colors duration-200 ${
                isSubmitting
                  ? "cursor-not-allowed bg-primary/50"
                  : "bg-primary hover:bg-primary/90"
              }`}
            >
              {isSubmitting ? "Saving..." : "Let’s Go"}
            </button>
          </div>

          {/* Optional Hint */}
          <p className="mt-4 text-center text-xs text-gray-400">
            Tip: Use at least 8 characters for your password.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
