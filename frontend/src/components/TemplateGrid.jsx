import React from 'react';
import ReviewSys from './ReviewSys';
import SubmitButton from './SubmitButton';
import HeartButton from './HeartButton';

const TemplateGrid = () => {
    const gridItems = Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="relative border p-4 flex flex-col items-center justify-center px-40">
            <img src="/campus-seal.jpg" alt={`Template ${index + 1}`} className="mb-4"/>
            <ReviewSys />
            <textarea placeholder="Leave a review..." className="mt-2 p-2 border rounded w-full"></textarea>
            <SubmitButton />
            <HeartButton />
        </div>
    ));

    return (
        <div className="grid grid-cols-2 gap-4 px-40">
            {gridItems}
        </div>
    );
}

export default TemplateGrid;
