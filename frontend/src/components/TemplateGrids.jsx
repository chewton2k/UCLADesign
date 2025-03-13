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
            {templates.length === 0 ? (
                <p>Loading templates...</p>
            ) : (
                templates.map((template, index) => {
                    // Determine layout bounds for scaling and centering
                    const minX = Math.min(...template.layout.map(obj => obj.x));
                    const minY = Math.min(...template.layout.map(obj => obj.y));
                    const maxX = Math.max(...template.layout.map(obj => obj.x));
                    const maxY = Math.max(...template.layout.map(obj => obj.y));

                    const layoutWidth = maxX - minX;
                    const layoutHeight = maxY - minY;

                    const scaleFactor = 0.3; // Adjust scale factor as needed
                    const previewSize = 200;
                    const offsetX = (previewSize - layoutWidth * scaleFactor) / 2;
                    const offsetY = (previewSize - layoutHeight * scaleFactor) / 2;

                    return (
                        <div key={index} className="relative border p-4 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
                            {/* Container for layout preview */}
                            <div className="relative bg-gray-100 border w-[200px] h-[200px] overflow-hidden mb-4">
                                {template.layout.map((obj, idx) => {
                                    const left = (obj.x - minX) * scaleFactor + offsetX;
                                    const top = (obj.y - minY) * scaleFactor + offsetY;
                                    const rotation = obj.rotation || 0; // Optional rotation field

                                    return (
                                        <div> Design </div> 
                                    );
                                })}
                            </div>

                            <h3 className="text-lg font-semibold mb-2">{template.userName}'s Design</h3>
                            <HeartButton />
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default TemplateGrid;
