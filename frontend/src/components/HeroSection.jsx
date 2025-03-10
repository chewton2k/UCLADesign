import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-between px-12 py-16 min-h-screen">
      {/* Text Content on the Top for Small Screens / Left for Large */}
      <div className="text-center lg:text-left z-20 px-45">
        <h1 className="text-4xl md:text-5xl font-semibold text-black">
          Welcome to UCLA Design
        </h1>
        <p className="mt-4 text-lg md:text-xl font-semibold text-black">
          Be confident about your first day of college.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 rounded-lg text-lg font-light text-white hover:bg-blue-500"
          >
            Get Started
          </Link>
          <Link
            to="/templates"
            className="px-4 py-2 bg-gray-800 rounded-lg text-lg font-light text-white hover:bg-gray-700"
          >
            Browse Designs
          </Link>
        </div>
      </div>

      {/* Image Section (Moves to Bottom when Screen Shrinks) */}
      <div className="w-full h-full flex justify-center lg:justify-center">
        <img
          src="/Olympic+Hall+room.jpg"
          alt="Olympic Hall Room"
          className="max-h-[300px] md:max-h-[400px] lg:h-3/4 w-auto rounded-lg border border-black shadow-xl"
        />
      </div>
    </div>
  );
};

export default HeroSection;
