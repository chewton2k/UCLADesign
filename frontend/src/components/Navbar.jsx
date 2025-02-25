import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropDownMenu.jsx';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white py-4 px-6 shadow-md">
      {/* Home Button */}
      
      <div className="flex items-center space-x-4">
      <img 
        src="/ucla-logo.jpg" 
        alt="UCLA Logo" 
        className="w-16 h-auto rounded-lg shadow-lg"
      />
      <Link to="/" className="text-xl font-bold hover:opacity-80">
        Home
      </Link>
      <DropdownMenu />
      </div> 

      {/* Right-side buttons */}
      <div className="flex items-center space-x-4">
        <Link to="/login" className="px-4 py-2 bg-blue-600 rounded-lg hover:opacity-80">
          Log In
        </Link>
        <Link to="/signup" className="px-4 py-2 bg-blue-600 rounded-lg hover:opacity-80">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
