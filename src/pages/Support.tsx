import { useState } from "react";
import Header from "@components/Header";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@components/ui/button";

export default function Support() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "dashboard_navigation",
  );

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const Categories = [
    { key: "dashboard_navigation", label: "Dashboard & Navigation" },
    { key: "courses_content", label: "Courses & Content" },
    { key: "payment_billing", label: "Payment & Billing" },
    { key: "certificates_completion", label: "Certificates & Completion" },
    { key: "technical_support", label: "Technical Support" },
    { key: "platform_features", label: "Platform Features" },
    { key: "feedback_suggestions", label: "Feedback & Suggestions" },
  ];

  const faqs = [
    {
      category: "dashboard_navigation",
      question: "How to Verify Your Email?",
      answer: (
        <>
          If you are a new student, click on the{" "}
          <Link to="/verification" className="text-primary underline">
            Verify Your Email
          </Link>{" "}
          button, enter your email, and an OTP will be sent to your registered
          email address. Enter the OTP to complete the verification process.
        </>
      ),
    },
    {
      category: "dashboard_navigation",
      question: "Didn't Receive OTP?",
      answer: (
        <>
          If you haven't received the OTP, please check your spam or junk
          folder. If it's not there, click on{" "}
          <Link to="/verification" className="text-primary underline">
            Resend OTP
          </Link>{" "}
          to request a new one.
        </>
      ),
    },
    {
      category: "courses_content",
      question: "Do I Need to Verify My Email Every Time?",
      answer:
        "No, you only need to verify your email once. After verification, simply log in.",
    },
    {
      category: "courses_content",
      question: "When Will New Lessons Be Added?",
      answer: "New lessons are added every week.",
    },
    {
      category: "certificates_completion",
      question: "What are the Prerequisites for Project Submission?",
      answer: "You need to have a basic understanding of GitHub.",
    },
    {
      category: "certificates_completion",
      question: "When Will Mentors Verify Projects?",
      answer: "Project verification typically takes at least one week.",
    },
    {
      category: "technical_support",
      question: "What should I do if I can't log in to my account?",
      answer: "Project verification typically takes at least one week.",
    },
    {
      category: "technical_support",
      question: "How do I contact technical support?",
      answer: "Project verification typically takes at least one week.",
    },
    {
      category: "technical_support",
      question:
        "How do I fix issues with video buffering or poor video quality?",
      answer: "Project verification typically takes at least one week.",
    },
    {
      category: "technical_support",
      question: "What if my question isn’t listed here?",
      answer: (
        <>
          No worries! Reach out to our support team via the 'Contact Us' page or
          email us at support@example.com.
        </>
      ),
    },
  ];

  const filteredFaqs = selectedCategory
    ? faqs.filter((faq) => faq.category === selectedCategory)
    : faqs;

  return (
    <div className="min-h-screen dark:bg-darkPrimary p-4 md:p-6 space-y-6">
      <Header title="Support Center" />

      <div className="flex flex-col items-center justify-center">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-3xl text-center"
        >
          <h2 className="text-3xl text-primary font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Find quick answers to common questions below. Can’t find what you’re
            looking for? Contact us!
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {Categories.map((category) => (
              <Button
                key={category.key}
                variant={
                  selectedCategory === category.key ? "default" : "secondary"
                }
                className={`${selectedCategory === category.key ? "text-white" : " dark:text-primary"} cursor-pointer`}
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="mt-10 w-full max-w-3xl space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-4 py-3 bg-white dark:bg-darkSecondary rounded-xl shadow-sm border-0 hover:shadow-lg transition-all duration-300  cursor-pointer"
              >
                <button
                  className="text-sm sm:text-md text-darkPrimary dark:text-gray-50 w-full text-left flex justify-between items-center"
                  onClick={() => toggleAnswer(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  <span className="text-gray-400">
                    {openIndex === index ? <Minus /> : <Plus />}
                  </span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-2"
                    >
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-md leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">
              No questions found for this category.
            </p>
          )}
        </div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400">
            Still need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-primary hover:underline"
            >
              Contact Support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
