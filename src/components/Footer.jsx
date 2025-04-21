import React from 'react';
import { FaInstagram, FaBehance, } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">

        {/* Social media */}
        <div className="flex  space-x-6 text-2xl">
          <a
            href="https://www.instagram.com/crina_vidrascu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.behance.net/crinahirjau"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition transform hover:scale-110"
          >
            <FaBehance />
          </a>
        </div>

        {/* Contact info */}
        <div className="flex flex-col md:flex-row text-sm leading-relaxed md:space-x-6 text-center md:text-left">
          <p>
            Email: <a href="mailto:crinavidrascu1907@gmail.com" className="hover:text-white">crinavidrascu1907@gmail.com</a>
          </p>
          <p>
            Tel: <a href="tel:+37360176165" className="hover:text-white">+373 60 176 165</a>
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Vidrascu Crina. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
