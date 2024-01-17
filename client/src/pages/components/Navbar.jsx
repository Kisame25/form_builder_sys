// src/components/Navbar.js

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className="text-white font-bold text-lg">Your Logo</Link>
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-4">
                <Link to='/' className='text-white'>Home</Link>
                <Link to='/about' className='text-white'>About</Link>
                <Link to='/contact' className='text-white'>Contact</Link>
            </div>
        </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4">
            <div className="lg:flex space-x-4">
                <Link to='/' className="block text-white py-2">Home</Link>
            </div>
            <div className="lg:flex space-x-4">
                <Link to='/about' className="block text-white py-2">About</Link>
            </div>
            <div className="lg:flex space-x-4"> 
                <Link to='/contact' className="block text-white py-2">Contact</Link>
            </div>
        </div>
        )}
    </nav>
  );
};

export default Navbar;
