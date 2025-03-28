import Logo_letter from '@assets/images/skillhigh-letter.png';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function Trigger() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' }); // Adjusted trigger margin

  // Animation variants for cleaner code
  const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8" ref={ref}>
      <div className="bg-gradient-to-br from-primary to-primary-dark w-full h-auto min-h-[400px] rounded-3xl relative overflow-hidden shadow-2xl flex flex-col-reverse sm:flex-row items-center sm:items-start">
        {/* Left Text Section */}
        <motion.div
          variants={fadeInLeft}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="p-6 sm:p-8 lg:p-10 max-w-xl w-full sm:w-2/3 z-10"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Your Ultimate Learning Platform
          </h2>
          <p className="text-white text-base sm:text-lg lg:text-xl leading-relaxed mb-6 opacity-90">
            Skillhigh empowers learners with cutting-edge resources to master new skills, boost confidence, and accelerate career growth.
          </p>
          <motion.a
            href="/login"
            variants={fadeInUp}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-full hover:bg-opacity-95 transition-all duration-300 shadow-md"
          >
            Explore Now
          </motion.a>
        </motion.div>

        {/* Right Image Section */}
        <motion.img
          src={Logo_letter}
          alt="Skillhigh Letter"
          className="relative sm:absolute rounded-2xl right-6 bottom-6 sm:bottom-12 sm:right-16 w-36 sm:w-52 lg:w-72 rotate-[12deg] drop-shadow-lg"
          initial={{ y: 250, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 250, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      </div>

     
    </div>
  );
}