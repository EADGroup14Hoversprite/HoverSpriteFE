// src/app/landing/Header.tsx
"use client";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-3">
            <Image
              src="/hoversprite-logo.svg"
              alt="HoverSprite Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold text-gray-900">HoverSprite</span>
          </a>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition">
              Services
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </a>
            <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
              Get Started
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600">
              {isMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-4 py-4">
            <a href="#services" className="text-gray-700 px-4">Services</a>
            <a href="#testimonials" className="text-gray-700 px-4">Testimonials</a>
            <a href="#contact" className="text-gray-700 px-4">Contact</a>
            <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">Get Started</a>
          </div>
        </div>
      )}
    </header>
  );
}
