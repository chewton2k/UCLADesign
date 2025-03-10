import React from 'react';
import { Link } from 'react-router-dom';


const SignUpButton = () => {
    return ( 
        <Link to="/signup" className="px-3 py-2 bg-blue-600 rounded-4xl hover:opacity-80 font-light text-center">
            Sign Up
         </Link>
    )
}

export default SignUpButton