import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ContactUs from "@assets/images/contact.png";
import { sendContactService } from "../services/contactServices";
import { Button } from "@components/ui/button";
import { SendHorizonalIcon } from "lucide-react";
interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  category: StudentCategory;
  message: string;
}

export enum StudentCategory {
  EXISTING = "EXISTING",
  NEWSTUDENT = "NEWSTUDENT",
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    category: StudentCategory.EXISTING,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await sendContactService(formData);
      if (response) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: StudentCategory.EXISTING,
          message: "",
        });
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen px-4 dark:bg-darkPrimary">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }} // Float up and down by 10px
        transition={{
          duration: 3, // Slower floating effect (3 seconds per cycle)
          repeat: Infinity, // Infinite loop
          ease: "easeInOut", // Smooth easing
        }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img
          src={ContactUs}
          alt="Contact Illustration"
          className="max-w-xs md:max-w-md"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-darkSecondary shadow-sm border border-gray-50 dark:border-darkPrimary rounded-2xl p-8 w-full max-w-lg mt-8 md:mt-0"
      >
        <h2 className="text-3xl font-bold text-center text-primary dark:text-white">
          Contact Us
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof ContactFormState]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-darkSecondary dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-darkSecondary dark:border-gray-600 dark:text-white"
              required
            >
              {Object.values(StudentCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {cat === StudentCategory.EXISTING
                    ? "Existing Student"
                    : "New Student"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows={4}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-darkSecondary dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <Button
            variant="default"
            size="lg"
            className="w-full text-white cursor-pointer"
          >
            Send Message{" "}
            <motion.div
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <SendHorizonalIcon />
            </motion.div>
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
