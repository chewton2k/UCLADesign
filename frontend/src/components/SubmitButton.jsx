import React from 'react';

const SubmitButton = () => {
    const handleSubmit = () => {
        alert("Review Submitted!");
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
