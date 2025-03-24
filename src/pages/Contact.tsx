import { motion } from "framer-motion";
import ContactUs from '@assets/images/contact.png'
export default function Contact() {
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

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              placeholder="Write your message..."
              rows={4}
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-3 text-white font-medium rounded-lg bg-gradient-to-r from-[#0D8267] to-[#031C16] shadow-md hover:opacity-90 transition-all"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}
