import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import Footer from '../components/Footer';
import Modal from 'react-modal';
import Masonry from 'react-masonry-css';

Modal.setAppElement('#root');

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') {
        setPhotoIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      } else if (e.key === 'ArrowRight') {
        setPhotoIndex((prev) => (prev + 1) % project.images.length);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project?.images.length]);

  useEffect(() => {
    if (!project) return;
    project.images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [project]);

  if (!project) return <div>Proiectul nu a fost găsit.</div>;

  const scrollToTop = () => {
    const scrollInterval = setInterval(() => {
      const currentPosition = window.scrollY;
      if (currentPosition <= 0) {
        clearInterval(scrollInterval);
      }
      window.scrollTo(0, currentPosition - 20);
    }, 10);
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
    },
    content: {
      inset: '0',
      background: 'transparent',
      border: 'none',
      padding: 0,
      overflow: 'hidden',
    },
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="bg-[#1f1f1f] text-white min-h-screen">
      <div className="p-8 max-w-6xl mx-auto">
        <Link
          to="/proiecte"
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#2b2b2b] border border-gray-300 hover:bg-[#444444] rounded-xl px-6 py-3 shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </Link>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-4xl font-bold mb-6 text-center text-gray-100"
        >
          {project.title}
        </motion.h1>

        {project.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-400 mb-8"
          >
            {project.description}
          </motion.p>
        )}

        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
          className="flex w-full"
          columnClassName="masonry-column"
          style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
        >
          {project.images.map((src, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
            >
              <div className="w-full h-auto mb-6 rounded-xl overflow-hidden bg-gray-700 flex items-center justify-center">
                {!loadedImages[src] && (
                  <div className="w-full h-64 flex items-center justify-center animate-pulse bg-gray-800 rounded-xl">
                    <span className="text-gray-400">Se încarcă...</span>
                  </div>
                )}
                <img
                  src={src}
                  alt={`Project ${idx + 1}`}
                  loading="lazy"
                  onLoad={() => setLoadedImages((prev) => ({ ...prev, [src]: true }))}
                  onClick={() => { setPhotoIndex(idx); setIsOpen(true); }}
                  className={`w-full h-auto rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${loadedImages[src] ? 'block' : 'hidden'}`}
                />
              </div>
              <p className="text-sm text-center mt-2 text-gray-300">{project.imageTitles?.[idx]}</p>
            </motion.div>
          ))}
        </Masonry>

        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={true}
        >
          <div
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
            className="relative w-full h-screen flex items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-8 text-4xl text-white opacity-80 hover:opacity-100 focus:outline-none z-30"
            >
              &times;
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setPhotoIndex((photoIndex - 1 + project.images.length) % project.images.length); }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-30 bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
            >
              &#8592;
            </button>

            <img
              src={project.images[photoIndex]}
              loading="lazy"
              alt={`Project ${photoIndex + 1}`}
              className={`max-h-full w-auto max-w-none mx-auto rounded-xl transform transition-transform duration-300 ${zoomed ? 'scale-150' : ''}`}
              onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
            />

            <button
              onClick={(e) => { e.stopPropagation(); setPhotoIndex((photoIndex + 1) % project.images.length); }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-30 bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
            >
              &#8594;
            </button>

            {project.imageTitles?.[photoIndex] && (
              <p className="text-center text-white mt-4 text-sm absolute bottom-8 w-full">
                {project.imageTitles[photoIndex]}
              </p>
            )}
          </div>
        </Modal>
      </div>

      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-[#2b2b2b] to-[#3a3a3a] backdrop-blur-md text-white shadow-xl hover:bg-gradient-to-r hover:from-[#444444] hover:to-[#555555] hover:scale-110 transition-all duration-300 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7-7-7 7" />
        </svg>
      </motion.button>

      <Footer />
    </div>
  );
};

export default ProjectPage;
