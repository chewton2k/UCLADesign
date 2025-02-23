import React, { useState } from 'react';
import './App.css';

function App() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDesignsClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          {/* Logo for UCLA*/}
          <img
            src="/campus-seal.jpg" 
            alt="UCLA Logo"
            className="navbar-logo"
          />
          <a href="/" className="nav-link">Home</a>
          <div className="dropdown">
            <button className="nav-link" onClick={handleDesignsClick}>
              Designs
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <a href="/templates">Templates</a>
                <a href="/create-your-own">Create Your Own</a>
              </div>
            )}
          </div>
        </div>
        <div className="navbar-right">
          <button className="nav-button" onClick={() => alert("Login clicked!")}>
            Login
          </button>
          <button className="nav-button" onClick={() => alert("Sign Up clicked!")}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* content for the center page */}
      <div className="get-started-container">
        <h1>Welcome to UCLA Room Design</h1>
        <p>Create and design your dream room today!</p>
      </div>
    </div>
  );
}

export default App;