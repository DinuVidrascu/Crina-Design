import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import Footer from '../components/Footer';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!project) return <div>Proiectul nu a fost găsit.</div>;

  // Scroll lent
  const scrollToTop = () => {
    const scrollInterval = setInterval(() => {
      const currentPosition = window.scrollY;
      if (currentPosition <= 0) {
        clearInterval(scrollInterval); // Stop scrolling when we reach top
      }
      window.scrollTo(0, currentPosition - 20); // Scroll slowly upwards
    }, 16); // Approximately 60 frames per second
  };

  return (
    <div className="bg-[#1f1f1f] text-white min-h-screen">
      {/* Back button */}
      <div className="p-8 max-w-6xl mx-auto">
        <Link
          to="/proiecte"
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#2b2b2b] border border-gray-300 hover:bg-[#444444] rounded-xl px-6 py-3 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {/* arrow icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </Link>
      </div>

      {/* Title */}
      <div className="p-8 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -100 }} // Elemente vin din sus
          animate={{ opacity: 1, y: 0 }}     // Elemente ajung în poziția lor finală
          transition={{ duration: 0.3, ease: 'easeOut' }} // Am redus durata pentru rapiditate
          className="text-4xl font-bold mb-8 text-center text-gray-100"
        >
          {project.title}
        </motion.h1>
        {project.description && (
          <motion.p
            initial={{ opacity: 0, y: -100 }} // Elemente vin din sus
            animate={{ opacity: 1, y: 0 }}     // Elemente ajung în poziția lor finală
            transition={{ delay: 0.2, duration: 0.3 }} // Am redus durata pentru rapiditate
            className="text-lg text-gray-400 mb-8"
          >
            {project.description}
          </motion.p>
        )}

        {/* Masonry gallery */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
          {project.images.map((src, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, y: -100 }} // Elemente vin din sus
              animate={{ opacity: 1, y: 0 }}     // Elemente ajung în poziția lor finală
              transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }} // Am redus durata pentru rapiditate
            >
              <img
                src={src}
                alt={`Project image ${idx + 1}`}
                loading="lazy"
                onClick={() => { setPhotoIndex(idx); setIsOpen(true); }}
                className="w-full mb-6 rounded-2xl cursor-pointer break-inside-avoid object-cover transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              />
              <p className="text-sm text-center mt-2 text-gray-300">{project.imageTitles?.[idx]}</p>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            mainSrc={project.images[photoIndex]}
            nextSrc={project.images[(photoIndex + 1) % project.images.length]}
            prevSrc={project.images[(photoIndex + project.images.length - 1) % project.images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() => setPhotoIndex((photoIndex + project.images.length - 1) % project.images.length)}
            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % project.images.length)}
            imageTitle={project.imageTitles?.[photoIndex]}  // Show image title if available
            reactModalStyle={{ overlay: { backgroundColor: 'rgba(0,0,0,0.9)' } }} // Darker background overlay
          />
        )}
      </div>

      {/* Scroll-to-top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 1, y: 100 }} // Elementul vine din jos
        animate={{ opacity: 1, y: 0 }}    // Finalizează în poziția dorită
        transition={{ duration: 0.5, ease: 'easeInOut' }} // Am redus durata pentru rapiditate
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
};

export default ProjectPage;
