import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-20">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:opacity-80"
      >
        Designs ▼
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-300 shadow-lg rounded-lg">
          <Link 
            to="/templates" 
            className="block px-4 py-2 hover:opacity-80"
          >
            Templates
          </Link>
          <Link 
            to="/create-design" 
            className="block px-4 py-2 hover:opacity-80"
          >
            Create Your Own Design (coming soon)
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
