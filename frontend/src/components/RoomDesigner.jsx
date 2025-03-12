import React, { useState, useRef } from "react";

export default function RoomDesigner() {
    const [objects, setObjects] = useState([]);
    const [draggedObjectId, setDraggedObjectId] = useState(null);
    const containerRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const identifier = e.dataTransfer.getData("text/plain");
        const offsetX = e.clientX - containerRef.current.getBoundingClientRect().left;
        const offsetY = e.clientY - containerRef.current.getBoundingClientRect().top;

        //check if we're moving an existing object
        if (draggedObjectId) {
            setObjects(prev => prev.map(obj => 
                obj.id === draggedObjectId 
                    ? { ...obj, x: offsetX, y: offsetY } 
                    : obj
            ));
            setDraggedObjectId(null);
        } else {
            //else add a new object
            const newObject = {
                id: Date.now(),
                src: `/images/${identifier}.png`,
                identifier,
                x: offsetX,
                y: offsetY
            };
            setObjects(prev => [...prev, newObject]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleObjectDragStart = (e, id) => {
        setDraggedObjectId(id);
        e.dataTransfer.setData("text/plain", "move"); //set as random data 
    };

    const gridSize = 20;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Room Designer</h1>
            
            <div
                ref={containerRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative w-full h-[800px] bg-white border grid-bg"
            >
                {objects.map((obj) => (
                    <img
                        key={obj.id}
                        src={obj.src}
                        alt={obj.identifier}
                        className="absolute w-16 h-16 cursor-pointer"
                        style={{ left: obj.x, top: obj.y }}
                        draggable
                        onDragStart={(e) => handleObjectDragStart(e, obj.id)}
                    />
                ))}
            </div>

            <style jsx>{`
                .grid-bg {
                    background-size: ${gridSize}px ${gridSize}px;
                    background-image:
                        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
                }
            `}</style>
        </div>
    )
}