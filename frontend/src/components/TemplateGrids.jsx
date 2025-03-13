import React, { useState, useEffect, useRef } from "react";
import HeartButton from './HeartButton';


const TemplateGrid = () => {
    const [templates, setTemplates] = useState([]); //store backend template data?

    useEffect(() => {
        fetch("http://localhost:5001/api/designs/getDesigns")
            .then(response => response.json())
            .then(data => setTemplates(data))
            .catch(error => console.error("Error fetching designs:", error));
    }, []);

    const gridItems = Array.from({ length: 10 }, (_, index) => (
        <div key={index} className="relative border p-4 flex flex-col items-center justify-center px-40">
            {/* <img src="/campus-seal.jpg" alt={`Template ${index + 1}`} className="mb-4"/> */}
            <HeartButton />
        </div>
    ));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10 lg:px-20">
            {templates.length === 0 ? (<p>Loading templates...</p>) : (
                templates.map((template, index) => (
                    <div key={index} className="relative border p-4 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
                        <div className="objects-container relative flex-1 w-1/2 h-1/2 z-20">
                            {template.layout.map((obj) => (
                                    <img 
                                        key={obj.id}
                                        src={obj.src}
                                        alt="room-object"
                                        className="relative"
                                        style={{
                                            left: obj.x,
                                            top: obj.y
                                        }}
                                    />
                            ))}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">{template.userName}'s Design</h3>
                        <HeartButton />
                    </div>
                ))
            )}
        </div>
    );
}

export default TemplateGrid;
