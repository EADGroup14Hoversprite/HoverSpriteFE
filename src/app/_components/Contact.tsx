"use client";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="contact"
      className="py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form and Info */}
        <div className="flex flex-col justify-center items-center lg:items-start">
          <h2 className="text-3xl font-bold text-gray-900 mb-6" data-aos="fade-right">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 mb-6" data-aos="fade-right">
            Have questions? We’d love to hear from you! Reach out to us via email or follow us on social media.
          </p>
          <button
            onClick={handleModalOpen}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition mb-6"
            data-aos="zoom-in"
          >
            Contact Us Now
          </button>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Connect with us on Social Media
          </h3>
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
              aria-label="Facebook"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 transition"
              aria-label="Twitter"
            >
              <FaXTwitter size={30} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">Please fill out the form below to get in touch with us.</p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
            <button
              onClick={handleModalClose}
              className="mt-6 text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
