import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropDownMenu.jsx';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white py-4 px-6 shadow-md">
      {/* Home Button */}
      
      <div className="flex items-center space-x-4">
      <img 
        src="/campus-seal.jpg" 
        alt="Campus Seal" 
        className="w-16 h-auto rounded-lg shadow-lg"
      />
      <Link to="/" className="text-xl font-bold hover:text-gray-300">
        Home
      </Link>
      <DropdownMenu />
      </div> 

      {/* Right-side buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/login" className="px-4 py-2 bg-amber-300 rounded-lg hover:bg-amber-400">
          Log In
        </Link>
        <Link to="/signup" className="px-4 py-2 bg-amber-300 rounded-lg hover:bg-amber-400">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
