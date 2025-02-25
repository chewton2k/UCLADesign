    import React from 'react';
    import { Link } from 'react-router-dom';

    const HeroSection = () => {
    return (
        <div className="relative h-screen">
        {/* Background Image with Opacity */}
        <div
            className="absolute inset-0 bg-cover bg-center z-0 bg-[url('/Olympic+Hall+room.jpg')]"
        ></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center bg-white opacity-90  px-6 py-12 max-w-xl mx-auto rounded-lg shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-black">
                Welcome to UCLA Design 
            </h1>
            <p className="mt-4 text-lg md:text-xl font-bold text-black">
                Be confident about your first day of college.
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-6 flex justify-center space-x-4">
                <Link
                to="/signup"
                className="px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold text-white hover:bg-blue-500"
                >
                Get Started
                </Link>
                <Link
                to="/templates"
                className="px-6 py-3 bg-gray-800 rounded-lg text-lg font-semibold text-white hover:bg-gray-700"
                >
                Browse Designs
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default HeroSection;