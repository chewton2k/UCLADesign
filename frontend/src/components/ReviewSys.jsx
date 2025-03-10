import React, { useState } from 'react';
import SubmitButton from './SubmitButton';

const ReviewSys = () => {
    const [rating, setRating] = useState(0);

    const handleRatingClick = (index) => {
        setRating(index + 1);
    }
    
    return (
        <div>
            <div className="flex space-x-2">
                {[...Array(5)].map((_, index) => (
                    <span 
                        key={index} 
                        onClick={() => handleRatingClick(index)} 
                        className={`cursor-pointer text-2xl ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                        ★
                    </span>
                ))}
            </div>
            <SubmitButton/>
        </div>
    );
}

export default ReviewSys;
