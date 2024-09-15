"use client";
import { useState } from "react";
import Image from "next/image";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; // Import for the profile and menu icons

export default function Header({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu toggle

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50 h-20">
      <div className="bg-white py-3 px-4 sm:px-6 lg:px-8 shadow-md h-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          {/* Left side: Logo and Dashboard title */}
          <a href="/" className="flex items-center space-x-3">
            {/* Logo */}
            <Image
              src="/logo/hoversprite-logo.png"
              alt="HoverSprite Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            {/* Dashboard Title and Description */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Manage your assigned and completed orders</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => setActiveTab("assigned")} className="text-gray-700 hover:underline">
              Assigned Orders
            </button>
            <button onClick={() => setActiveTab("history")} className="text-gray-700 hover:underline">
              Order History
            </button>
            <button onClick={() => setActiveTab("route")} className="text-gray-700 hover:underline">
              Route
            </button>

            {/* Profile Button */}
            <a
              href="/login"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              <FaUserCircle size={18} />
              <span>Your Profile</span>
            </a>
          </div>

          {/* Hamburger Menu Icon for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg py-4">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => { setIsMenuOpen(false); setActiveTab("assigned"); }} className="text-gray-700 px-4 hover:underline">
                Assigned Orders
              </button>
              <button onClick={() => { setIsMenuOpen(false); setActiveTab("history"); }} className="text-gray-700 px-4 hover:underline">
                Order History
              </button>
              <button onClick={() => { setIsMenuOpen(false); setActiveTab("route"); }} className="text-gray-700 px-4 hover:underline">
                Route
              </button>

              {/* Mobile Profile Button */}
              <a
                href="/login"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition mx-4"
              >
                <FaUserCircle size={18} />
                <span>Your Profile</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
