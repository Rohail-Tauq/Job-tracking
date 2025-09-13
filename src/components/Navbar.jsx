import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-gray-100 text-2xl font-bold tracking-tight">
          JobTracker
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-300 hover:text-gray-100 transition-colors duration-200 text-sm font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/add"
            className="text-gray-300 hover:text-gray-100 transition-colors duration-200 text-sm font-medium"
          >
            Add Job
          </Link>
        </nav>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-900">
          <nav className="flex flex-col space-y-2 px-4 py-3">
            <Link
              to="/"
              className="text-gray-300 hover:text-gray-100 transition-colors duration-200 text-sm font-medium"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/add"
              className="text-gray-300 hover:text-gray-100 transition-colors duration-200 text-sm font-medium"
              onClick={toggleMenu}
            >
              Add Job
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}