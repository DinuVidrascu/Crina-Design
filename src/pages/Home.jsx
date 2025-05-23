import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import HeroImg from '../img/hero-img.png';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, when: 'beforeChildren' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Home = () => {
  return (
    <div className="bg-[#1F1C1B] text-white min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center px-6 md:px-16 py-20">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          
          {/* TEXT */}
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300"
            >
              Vidrascu Crina
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base md:text-base mb-6 leading-relaxed"
            >
              I'm an interior designer with a passion for creating spaces that are not only beautiful, but also deeply functional and meaningful. My design approach combines creativity with a strong focus on my clients' unique needs and lifestyles. <br /> Take a look through my portfolio and discover how design can elevate everyday living.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/proiecte"
                className="inline-block px-8 py-3 bg-[#1f1f1f] rounded-full font-semibold text-white hover:opacity-60 transition border"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>

          {/* IMAGE - independent motion */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6}}
          >
            <motion.img
              src={HeroImg}
              alt="Crina Vidrascu"
              className="w-full max-w-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
