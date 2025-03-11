import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropDownMenu.jsx';
import LogInButton from './LogInButton.jsx'; 
import SignUpButton from './SignUpButton.jsx'; 

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is stored in localStorage (Persists login state)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    setUser(null); // Reset state
  };

  return (
    <nav className="flex flex-wrap justify-between items-center bg-gray-900 text-white py-3 px-45 shadow-md">
      {/* Home Button */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-medium hover:opacity-70">
          <img 
            src="/ucla-logo.jpg" 
            alt="UCLA Logo" 
            className="w-16 h-auto rounded-lg shadow-lg"
          />
        </Link>
        <DropdownMenu />
      </div> 

      {/* Right-side buttons */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <LogInButton/> 
            <SignUpButton/> 
          </>
        ) : (
          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {user.username[0].toUpperCase()} {/* Profile initial */}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
