import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-between px-45 py-30">
      {/* Text Content on the Left */}
      <div className="text-left max-w-xl z-20">
        <h1 className="text-4xl md:text-5xl font-semibold text-black">
          Welcome to UCLA Design
        </h1>
        <p className="mt-4 text-lg md:text-l font-semibold text-black">
          Be confident about your first day of college.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 rounded-lg text-l font-light text-white hover:bg-blue-500"
          >
            Get Started
          </Link>
          <Link
            to="/templates"
            className="px-4 py-2 bg-gray-800 rounded-lg text-l font-light text-white hover:bg-gray-700"
          >
            Browse Designs
          </Link>
        </div>
      </div>

      {/* Image on the Right */}
      <div className="w-1/2 h-1/2 flex items-center justify-end z-10">
        <img
          src="/Olympic+Hall+room.jpg"
          alt="Olympic Hall Room"
          className="h-3/4 w-auto rounded-lg border border-black shadow-3xl"
        />
      </div>
    </div>
  );
};

export default HeroSection;