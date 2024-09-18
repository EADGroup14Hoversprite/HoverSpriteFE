import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Contact Info */}
          <div className="flex flex-col space-y-4">
            <Image
              src="/logo/hoversprite-logo.png"  
              alt="HoverSprite Logo"
              width={120}
              height={120}
              className="object-contain"
            />
            <p className="text-gray-500">
              1234 Sprayer Ave,<br /> Farming City, FC 56789
            </p>
            <p className="text-gray-500">Phone: (123) 456-7890</p>
            <p className="text-gray-500">Email: contact@hoversprite.com</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <a href="#hero" className="text-gray-600 hover:underline">Home</a>
            <a href="#services" className="text-gray-600 hover:underline">Services</a>
            <a href="#about" className="text-gray-600 hover:underline">About Us</a>
            <a href="#contact" className="text-gray-600 hover:underline">Contact</a>
            <a href="#booking" className="text-gray-600 hover:underline">Manage Booking</a>
          </div>

          {/* Social Media and Message */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Connect with Us</h4>
            <p className="text-gray-600">Follow us on social media:</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook size={28} className="text-blue-600 hover:text-blue-800 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaXTwitter size={28} className="text-black hover:text-gray-600 transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram size={28} className="text-pink-500 hover:text-pink-700 transition" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={28} className="text-blue-700 hover:text-blue-900 transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-gray-500">© 2024 HoverSprite. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
