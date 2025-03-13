import React, { useState, useEffect, useRef } from "react";

export default function RoomDesigner({ objects, setObjects }) {
    const [draggedObjectId, setDraggedObjectId] = useState(null);
    const containerRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const imagePath = e.dataTransfer.getData("text/plain");
        const containerRect = containerRef.current.getBoundingClientRect();
    
        // Calculate relative position within container
        let offsetX = e.clientX - containerRect.left;
        let offsetY = e.clientY - containerRect.top;
    
        const isRoom = ["/plaza_v1.jpg", "/plaza_v2.jpg", "/deluxe.jpg", "/classic.jpg"].includes(imagePath);
        const roomExists = objects.some(obj => 
            ["/plaza_v1.jpg", "/plaza_v2.jpg", "/deluxe.jpg", "/classic.jpg"].includes(obj.src)
        );
    
        if (draggedObjectId) {
            setObjects(prev => prev.map(obj =>
                obj.id === draggedObjectId
                    ? { ...obj, x: offsetX, y: offsetY }
                    : obj
            ));
            setDraggedObjectId(null);
        } else {
            if (isRoom || roomExists) {
                const newObject = {
                    id: Date.now(),
                    src: imagePath,
                    x: offsetX,
                    y: offsetY,
                    rotation: 0
                };
                setObjects(prev => [...prev, newObject]);
            } else {
                alert("Please place a room first before adding objects.");
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleObjectDragStart = (e, id) => {
        setDraggedObjectId(id);
        e.dataTransfer.setData("text/plain", "move");
    };

    const handleSave = async () => {
        if(objects.length === 0){
            alert("Nothing to save!");
            return;
        }

        const roomIdentifier = objects[0].src.slice(1);
        const userName = window.sessionStorage.getItem("userName");



        if(!userName){
            alert("User not logged in. No account to associate design with.");
            return;
        }
        try{

            const roomResponse = await fetch(`http://localhost:5001/api/dorms/image/${roomIdentifier}`);
            if (!roomResponse.ok) {
            throw new Error("Room type not found in database.");
            }

            const roomInfo = await roomResponse.json();
            
            const roomData = {
                userName,
                layout: objects,
            };

            const response = await fetch("http://localhost:5001/api/designs/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(roomData),
            });

            console.log("Sending design daata", roomData);

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save room");
            }

            const data = await response.json();
            alert("Room successfully saved!");
            console.log("Saved room:", data);
            window.location.reload();
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

    //Popup handler state
    const [selectedObjectId, setSelectedObjectId] = useState(null);
    const popupRef = useRef(null);

    //click outside popup = close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(popupRef.current && !popupRef.current.contains(e.target)){
                setSelectedObjectId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return() => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRotate = (id) => {
        setObjects((prevObjects) =>
          prevObjects.map((obj) =>
            obj.id === id
              ? { ...obj, rotation: ((obj.rotation || 0) + 90) % 360 }
              : obj
          )
        );
      };

    const handleDelete = (id) => {
        setObjects((prev) => prev.filter((obj) => obj.id !== id));
        setSelectedObjectId(null);
    };

    
    const gridSize = 10;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-1">Room Designer</h1>
            
            <button
                onClick={handleSave}
                className="mb-4 px-4 mx-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Save Room
            </button>
            <button
                onClick={handleClearAll}
                className="mb-4 px-4 mx-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Clear All
            </button>
            <button
                onClick={handleClearRoom}
                className="mb-4 px-4 mx-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Clear Room
            </button>
            <div
                ref={containerRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative w-full h-[850px] bg-white border grid-bg"
            >     
                {/* Drag And Drop */}
                {objects.map((obj) => {
                    const style = {
                        left: obj.x,
                        top: obj.y,
                        transform: `translate(-50%, -50%) rotate(${obj.rotation || 0}deg)`,
                        ...(obj.src === "/bean-bag.png" && {
                            maxWidth: '10%',
                            maxHeight: '10%'
                        })
                    };

                    return (
                        <img
                            key={obj.id}
                            src={obj.src}
                            alt="room-object"
                            className="absolute cursor-pointer"
                            style={style}
                            draggable
                            onClick={() => setSelectedObjectId(obj.id)}
                            onDragStart={(e) => handleObjectDragStart(e, obj.id)}
                        />
                    );
                })}


            {/* Popup */}
            {selectedObjectId !== null && (
                <div
                ref={popupRef}
                className="absolute bg-white p-2 border rounded shadow-md z-50"
                style={{
                    left: objects.find((obj) => obj.id === selectedObjectId)?.x + 60,
                    top: objects.find((obj) => obj.id === selectedObjectId)?.y,
                }}
                >
                <button
                    className="px-2 py-1 bg-blue-500 text-white rounded mb-2 w-full"
                    onClick={() => handleRotate(selectedObjectId)}
                >
                    Rotate 90°
                </button>
                <button
                    className="px-2 py-1 bg-red-500 text-white rounded w-full"
                    onClick={() => handleDelete(selectedObjectId)}
                >
                    <img src="/trash.png" className="w-6 h-6 mx-auto"/>
                </button>
                </div>
            )}
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