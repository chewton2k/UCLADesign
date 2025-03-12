import React, {useState, useRef} from "react";

export default function RoomDesigner(){
    const [objects, setObjects] = useState([]); // {id, src, x y }
    const containerRef = useRef(null); //get position relative to view

    const handleDrop = (e) => {
        e.preventDefault();
        const identifier = e.dataTransfer.getData("text/plain");
        //get drop position relative to top left of the gird
        const offsetX = e.clientX - containerRef.current.getBoundingClientRect().left;
        const offsetY = e.clientY - containerRef.current.getBoundingClientRect().top; 

        const newObejct = { //new object with id, coordinates, and image path
            id: Date.now(),
            src: `/images/${identifier}.png`,
            identifier,
            x: offsetX,
            y: offsetY
        };

        setObjects((prev) => [...prev, newObject]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const gridSize = 20; //20 pixelspacing

    return(
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Room Designer</h1>
            
            <div
                ref={containerRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative w-full h-[600px] bg-white border grid-bg"
            >
                {objects.map((obj) => (
                    <img
                        key={obj.id}
                        src={obj.src}
                        alt={obj.identifier}
                        className="absolute w-16 h-16 cursor-pointer"
                        style={{ left: obj.x, top: obj.y }}
                    />
                ))}
            </div>
        

            <style jsx>{`
                .grid-bg{
                background-size: ${gridSize}px ${gridSize}px;
                background-image:
                    linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px);
            }`}</style>
        </div>
    )
}