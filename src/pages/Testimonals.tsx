import { motion } from "framer-motion";

const reviews = [
  { id: 1, name: "John Doe", text: "Great service! Highly recommend it." },
  { id: 2, name: "Jane Smith", text: "Amazing experience, will come back again!" },
  { id: 3, name: "David Brown", text: "Loved the quality and support!" },
  { id: 4, name: "Emily Johnson", text: "The best experience I've had in a long time!" },
  { id: 5, name: "Michael Lee", text: "Super smooth and easy to use!" },
];

export default function Testimonials() {
  return (
    <div className="overflow-hidden w-full bg-gray-100 dark:bg-gray-900 py-10">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Clients Say</h2>
      </div>

      <div className="relative w-full flex overflow-hidden">
        <motion.div
          className="flex space-x-6"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-xs bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4"
            >
              <p className="text-gray-700 dark:text-gray-300">"{review.text}"</p>
              <h4 className="mt-2 text-primary font-semibold">{review.name}</h4>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
