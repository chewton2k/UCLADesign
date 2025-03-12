import React, { useState, useRef } from "react";

export default function RoomDesigner() {
    const [objects, setObjects] = useState([]);
    const [draggedObjectId, setDraggedObjectId] = useState(null);
    const containerRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const imagePath = e.dataTransfer.getData("text/plain"); // Get the image path
        const offsetX = e.clientX - containerRef.current.getBoundingClientRect().left;
        const offsetY = e.clientY - containerRef.current.getBoundingClientRect().top;

        // Check if we're moving an existing object
        if (draggedObjectId) {
            setObjects(prev => prev.map(obj =>
                obj.id === draggedObjectId
                    ? { ...obj, x: offsetX, y: offsetY }
                    : obj
            ));
            setDraggedObjectId(null);
        } else {
            // Add a new object
            const newObject = {
                id: Date.now(),
                src: imagePath, // Use the image path from dataTransfer
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

    const handleSave = async () => {
        if(objects.length === 0){
            alert("Nothing to save!");
            return;
        }

        const roomIdentifier = objects[0].identifier;
        try{
            const roomResponse = await fetch(`http://localhost:5001/api/rooms/by-identifier/${roomIdentifier}`);
            if(!roomResponse.ok){
                throw new Error("Room type not found in database.");
            }

            const roomInfo = await roomResponse.json();
            const roomData = {
                roomType: roomInfo.roomType,
                roomDimensions: roomInfo.roomDimensions,
                price: roomInfo.price,
                image: roomInfo.image,
                layout: objects,
            };

            const response = await fetch("http://localhost:5001/api/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(roomData),
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save room");
            }

            const data = await response.json();
            alert("Room successfully saved!");
            console.long("Saved room:", data);
        }catch(error){
            console.error("Save error:", error);
            alert("Error saving room: " + error.message);
        }
    };

    const handleClearAll = () => {
        setObjects([]);
    };

    const handleClearRoom = () =>{
        if(objects.length >= 1){
            let keep = objects[0];
            setObjects([keep]);
        }else{
            alert("No room to be preserved.");
        }
    };

    const gridSize = 20;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Room Designer</h1>
            
            <button
                onClick={handleSave}
                className="mb-4 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Save Room
            </button>
            <button
                onClick={handleClearAll}
                className="mb-4 px-4 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Clear All
            </button>
            <button
                onClick={handleClearRoom}
                className="mb-4 px-4 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Clear Room
            </button>
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
                        alt="room"
                        className="absolute w-32 h-32 cursor-pointer" // Adjust size as needed
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
    );
}