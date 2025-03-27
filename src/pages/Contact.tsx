import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ContactUs from "@assets/images/contact.png";
import { sendContactService } from "../services/contactServices";

// Define the type for form state
interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  category: StudentCategory ;
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

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
     async function submitContact() {
     const response = await sendContactService(formData);
     if(response)
     {
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: StudentCategory.EXISTING,
        message: "",
      })
     }
     } 
     submitContact()
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen px-4 dark:bg-darkPrimary">
      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img
          src={ContactUs}
          alt="Contact Illustration"
          className="max-w-xs md:max-w-md"
        />
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white dark:bg-darkSecondary shadow-lg rounded-2xl p-8 w-full max-w-md mt-8 md:mt-0"
      >
        <h2 className="text-3xl font-bold text-center text-primary dark:text-white">
          Contact Us
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-darkSecondary dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-darkSecondary dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-darkSecondary dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Category (Dropdown) */}
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
              <option value="">Select Category</option>
              <option value="EXISTING">Existing Student</option>
              <option value="NEWSTUDENT">New Student</option>
            </select>
          </div>

          {/* Message */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 px-4 py-3 cursor-pointer text-white font-medium rounded-lg bg-gradient-to-r from-[#0D8267] to-[#031C16] shadow-md hover:opacity-90 transition-all"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}
