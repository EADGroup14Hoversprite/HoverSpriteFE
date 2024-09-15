"use client";
import { useState } from "react";
import Image from "next/image";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; // Import for icons

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      {/* Bottom section: Logo and Navigation */}
      <div className="bg-white py-3 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <Image
              src="/logo/hoversprite-logo.png"
              alt="HoverSprite Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="text-xl font-bold text-gray-900">HoverSprite</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#hero" className="text-gray-700 hover:underline">Home</a>
            <a href="#manage" className="text-gray-700 hover:underline">Manage Booking</a>
            <a href="#contact" className="text-gray-700 hover:underline">Contact</a>
            <a href="#services" className="text-gray-700 hover:underline">About Us</a>

            {/* Sign In / Sign Up button */}
            <a
              href="/login"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              <FaUserCircle size={18} />
              <span>Get Started</span>
            </a>
          </div>

          {/* Hamburger Menu (For mobile view) */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg py-4">
            <div className="flex flex-col space-y-4">
              <a href="#hero" className="text-gray-700 px-4">Home</a>
              <a href="#manage" className="text-gray-700 px-4">Manage Booking</a>
              <a href="#contact" className="text-gray-700 px-4">Contact</a>
              <a href="#services" className="text-gray-700 px-4">About Us</a>

              {/* Mobile version of Sign In / Sign Up */}
              <a
                href="/login"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition mx-4"
              >
                <FaUserCircle size={18} />
                <span>Get Started</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
