import React from 'react';
import { Link } from 'react-router-dom';

const LogIn = () => { 
    return (<div className="flex items-center space-x-4">
        <Link to="/login" className="px-4 py-2 hover:opacity-80 font-light">
          Log In
        </Link>
        </div> 
    )
}

export default LogIn