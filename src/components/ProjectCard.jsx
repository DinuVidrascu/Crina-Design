import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <Link
    to={`/project/${project.slug}`}
    className="block shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 transform"
  >
    {/* Imaginea cu overlay */}
    <div className="relative">
      <img
        src={project.cover}
        alt={project.title}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-all duration-300" />
    </div>

    {/* Titlu și detalii */}
    <div className="p-4 bg-[#1f1f1f] rounded-b-xl">
      <h2 className="text-xl font-semibold text-white hover:text-gray-300">{project.title}</h2>
    </div>
  </Link>
);

export default ProjectCard;
