import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import projects from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const scrollToTop = () => {
  const scrollInterval = setInterval(() => {
    const currentPosition = window.scrollY;
    if (currentPosition <= 0) {
      clearInterval(scrollInterval);
    }
    window.scrollTo(0, currentPosition - 20);
  }, 10);
};

const ProjectList = () => (
  <div className="bg-[#1F1C1B] text-white min-h-screen flex flex-col">
    <Navbar />

    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-grow p-8 max-w-6xl mx-auto"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-200 text-center md:text-left"
      >
        My Projects
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={itemVariants} whileHover={{ scale: 1.03 }}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
     <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-[#2b2b2b] to-[#3a3a3a] backdrop-blur-md text-white shadow-xl hover:bg-gradient-to-r hover:from-[#444444] hover:to-[#555555] hover:scale-110 transition-all duration-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7-7-7 7" />
            </svg>
          </motion.button>

    <Footer />
  </div>
);

export default ProjectList;
