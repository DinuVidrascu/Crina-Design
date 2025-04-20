import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', name: 'Home' },
    { to: '/proiecte', name: 'Portfolio' },
    { to: '/contact', name: 'Contact' },
  ];

  return (
    <>
      <nav className="bg-[#1f1f1f] shadow-lg sticky top-0 z-50 transition-all duration-500">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-semibold text-white hover:text-gray-700 transition-colors duration-300">
            Interior Design
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map(({ to, name }) => (
              <Link
                key={to}
                to={to}
                className={`relative py-2 text-gray-300 transition-colors duration-200 hover:text-white ${
                  pathname === to ? 'text-white' : ''
                }`}
              >
                {name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gray-700 transition-all duration-300 ${
                    pathname === to ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden flex flex-col items-center justify-center space-y-1 focus:outline-none"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-300 transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-300 transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-300 transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map(({ to, name }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setIsOpen(false)}
            className={`text-2xl font-semibold text-gray-200 hover:text-white transition-colors ${
              pathname === to ? 'text-white' : ''
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
