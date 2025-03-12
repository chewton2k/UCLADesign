import React from 'react'; //import React, { useState, useEffect } from 'react';
import ReviewSys from './ReviewSys';
import HeartButton from './HeartButton';

const TemplateGrid = () => {
    //const [templates, setTemplates] = useState([]); //store backend template data?

    const gridItems = Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="relative border p-4 flex flex-col items-center justify-center px-40">
            <img src="/campus-seal.jpg" alt={`Template ${index + 1}`} className="mb-4"/>
            <ReviewSys />
            <HeartButton />
        </div>
    ));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10 lg:px-20">
            {gridItems}
            {/*
            {templates.map((template, index) => (
                //load image
            )
            */}
        </div>
    );
}

export default TemplateGrid;


/* 

import React, { useState, useEffect } from 'react';
import ReviewSys from './ReviewSys';
import HeartButton from './HeartButton';

const TemplateGrid = () => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        fetch('/') 
            .then(response => response.json())
            .then(data => setTemplates(data)) 
            .catch(error => console.error("Error occured fetching templats:", error));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10 lg:px-20">
            {templates.map((template, index) => (
                <div key={index} className="relative border p-4 flex flex-col items-center justify-center px-40">
                    <img 
                        src={template.imageUrl} 
                        alt={`Template ${index + 1}`} 
                        className="mb-4" 
                    />
                    <ReviewSys />
                    <HeartButton />
                </div>
            ))}
        </div>
    );
}

export default TemplateGrid;

*/