import React from 'react';
import { Link } from 'react-router-dom';

const HomePageBottom = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold">About</h2>
          <p className="mt-2 text-sm text-gray-400">
            UCLA Room Design helps students visualize and plan their dorm setup with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link to="/templates" className="text-gray-400 hover:text-white">Browse Designs</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="mt-2 text-sm text-gray-400">Email: support@uclaroomdesign.com</p>
          <p className="text-sm text-gray-400">Phone: (123) 456-7890</p>
          <div className="mt-4 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Instagram</a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} UCLA Room Design. All rights reserved.
      </div>
    </footer>
  );
};

export default HomePageBottom;
