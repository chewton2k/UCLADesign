import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:opacity-80 font-light text-center"
      >
        Designs ▼
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-3top-full w-60 bg-gray-800 border border-gray-300 shadow-lg rounded-lg">
          <Link to="/templates" className="block px-4 py-2 hover:opacity-60 font-light">
            Templates
          </Link>
          <Link
            to="/create-design"
            className="block px-4 py-2 hover:opacity-60 font-light"
          >
            Create Your Own Design
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;