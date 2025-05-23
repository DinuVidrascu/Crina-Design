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

    <Footer />
  </div>
);

export default ProjectList;
