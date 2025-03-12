import React, { useState, useRef } from "react";

export default function RoomDesigner() {
    const [objects, setObjects] = useState([]);
    const [draggedObjectId, setDraggedObjectId] = useState(null);
    const containerRef = useRef(null);

    const defaultDorms = ["classic", "deluxe", "plaze_v1", "plaza_v2"];

    const handleDrop = (e) => {
        e.preventDefault();
        const identifier = e.dataTransfer.getData("text/plain");
        const offsetX = e.clientX - containerRef.current.getBoundingClientRect().left;
        const offsetY = e.clientY - containerRef.current.getBoundingClientRect().top;

        //check that the first image is a room type image
        if(objects.length === 0 && !defaultDorms.includes(identifier)){
            alert("You must first add a room schematic (e.g. classic, deluxe, or plaza dorm.");
            return;
        }
        //make sure that you can't add more than one room
        if(objects.length > 0 && defaultDorms.includes(identifier) && defaultDorms.includes(objects[0].identifier)){
            alert("Only one room floor plan can be placed.");
            return;
        }
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