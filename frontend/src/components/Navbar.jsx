import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import DropdownMenu from './DropDownMenu.jsx';
import LogInButton from './LogInButton.jsx'; 
import SignUpButton from './SignUpButton.jsx'; 

const Navbar = () => {
  const navigate = useNavigate();
  const username = window.sessionStorage.getItem("userName"); 
  const [isOpen, setIsOpen] = useState(false);

  const [loggedout, setLoggedout] = useState(
    window.sessionStorage.getItem("UserLoggedIn") === "true"
  );
  
  const handleLogout = () => { 
    window.sessionStorage.setItem("UserLoggedIn", "false");
    setLoggedout(false); 
    navigate("/"); 
  };
  
  return (
    <nav className="flex flex-wrap justify-between items-center bg-gray-900 text-white py-3 px-45 shadow-md">
      {/* Home Button */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-medium hover:opacity-70">
          <img 
            src="/logo-cutout.png" 
            alt="UCLA Logo" 
            className="w-16 h-auto rounded-lg shadow-lg"
          />
        </Link>
        <DropdownMenu />
      </div> 

      {/* Right-side buttons */}
      <div className="flex items-center space-x-4">
        {!loggedout ? (
          <>
            <LogInButton/> 
            <SignUpButton/> 
          </>
        ) : (
          <div className="relative">
           <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {username[0].toUpperCase()} {/* Profile initial */}
            </button>
           {isOpen && (
        <div className="absolute right-0 py-2 mt-2 w-48 bg-white text-black shadow-md rounded-md">
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
              </div>
              )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
