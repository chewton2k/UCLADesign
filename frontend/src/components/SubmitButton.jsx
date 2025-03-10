import React from 'react';

const SubmitButton = () => {
    const handleSubmit = () => {
        console.log("1"); 
    }

    return (
        <button 
            onClick={handleSubmit} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
            Submit Review
        </button>
    );
}

export default SubmitButton;
