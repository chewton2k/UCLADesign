import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
      >
        Designs ▼
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-300 shadow-lg rounded-lg">
          <Link 
            to="/templates" 
            className="block px-4 py-2 hover:bg-blue-200"
          >
            Templates
          </Link>
          <Link 
            to="/create-design" 
            className="block px-4 py-2 hover:bg-blue-200"
          >
            Create Your Own Design
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
