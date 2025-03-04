import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/70 text-white flex justify-between items-center p-6 z-50">
      {/* Logo */}
      <h1 className="text-lg font-bold">Eventify</h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <a href="/" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Events</a>
        <a href="#" className="hover:underline">Trending</a>
        <a href="#" className="hover:underline">About Us</a>
      </nav>

      {/* Buttons for Login/Signup */}
      <div className="hidden md:flex space-x-4">
      <button className="px-4 py-1 bg-white text-black rounded-full"><a href="/login">Login</a></button>
        <button className="px-4 py-1 bg-white text-black rounded-full"><a href="/">Signup</a></button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center space-y-4 py-6 md:hidden">
          <a href="/" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Events</a>
          <a href="#" className="hover:underline">Trending</a>
          <a href="#" className="hover:underline">About Us</a>
          <button className="px-4 py-1 bg-white text-black rounded-full"><a href="/login">Login</a></button>
          <button className="px-4 py-1 bg-white text-black rounded-full"><a href="/">Signup</a></button>
        </div>
      )}
    </header>
  );
};

export default Header;
