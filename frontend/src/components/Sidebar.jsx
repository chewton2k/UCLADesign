import React, { useState, useEffect, useRef } from "react";
import Checklist from "./Checklist";
import SearchBar from "./SearchBar";
import HandleNewFurniture from "./HandleNewFurniture";

const Sidebar = ({ onToolSelect }) => {
    const [showObjectsPopup, setShowObjectsPopup] = useState(false);
    const [showChecklistPopup, setShowChecklistPopup] = useState(false);
    const [showRoomListPopup, setShowRoomListPopup] = useState(false);
    const [roomOptions, setRoomOptions] = useState([]);
    const [furnitureOptions, setFurnitureOptions] = useState([]); 
    const [savedRoomListPopup, setSavedRoomListPopup] = useState(false); 
    const [newFurnitureListPopup, setNewFurnitureListPopup] = useState(false);

    const savedRoomref = useRef(null); 
    const sidebarRef = useRef(null);
    const objectsButtonRef = useRef(null);
    const checklistButtonRef = useRef(null);
    const roomButtonRef = useRef(null);
    const objectsPopupRef = useRef(null);
    const checklistPopupRef = useRef(null);
    const roomPopupRef = useRef(null);
    const newFurnitureref = useRef(null); 
  
    const PopupClose = () => {
      setShowChecklistPopup(false);
      setShowObjectsPopup(false);
      setShowRoomListPopup(false);
    };
  
    const handleClickOutside = (event) => {
      if (
        !objectsButtonRef.current.contains(event.target) &&
        !checklistButtonRef.current.contains(event.target) &&
        !roomButtonRef.current.contains(event.target) &&
        !objectsPopupRef.current?.contains(event.target) &&
        !checklistPopupRef.current?.contains(event.target) &&
        !roomPopupRef.current?.contains(event.target)
      ) {
        PopupClose();
      }
    };

  const handleRooms = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/dorms/");

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      const data = await response.json();

      const formattedRooms = data.map(room => ({
        type: room._id,
        label: room.roomType,
        price: `$${parseFloat(room.price).toLocaleString()}`,
        image: `${room.image}`, 
        dimensions: `${room.roomDimensions.length}ft x ${room.roomDimensions.width}ft`
      }));
      
      setRoomOptions(formattedRooms);
    } catch (error) {
      console.error("Error fetching rooms: ", error);
    }
  };

  const handleFurniture = async () => {
    let userName = window.sessionStorage.getItem("userName"); 

    try {
        const response = await fetch(`http://localhost:5001/api/furniture?username=${userName}`);
        if (!response.ok) {
            throw new Error('Failed to fetch furniture');
        }

        const data = await response.json();

        const formattedFurniture = data.map(furniture => ({
            type: furniture._id,
            label: furniture.name,
            image: `${furniture.image}`,
            dimensions: `${furniture.length} inches x ${furniture.width} inches x ${furniture.height} inches`
        }));

        setFurnitureOptions(formattedFurniture);
    } catch (error) {
        console.error("Error fetching furniture", error);
    }
};

    const handleSavedRooms = async () => { 
        try{
          const response = await fetch(`http://localhost:5001/api/designs/getDesigns/`);
        }catch(error){
          console.error("Error fetching saved room designs: ", error);
        }
    };

  useEffect(() => {
    handleRooms(); 
    handleFurniture();  
    handleSavedRooms(); 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div
      ref={sidebarRef}
      className="w-64 bg-gray-300 shadow-md p-4 border-b-amber-950 border-1"
    >
      <div className="flex flex-col items-center gap-1 mb-2 px-25 py-30 border-1 bg-blue-300 rounded-4xl">
  <button
    ref={objectsButtonRef}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30 font-light text-center"
    onClick={() => setShowObjectsPopup(!showObjectsPopup)}
  >
    Furniture
  </button>

  <div className="py-3"></div>

  <button
    ref={checklistButtonRef}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30 font-light text-center"
    onClick={() => setShowChecklistPopup(!showChecklistPopup)}
  >
    Checklist
  </button>

  <div className="py-3"></div>

  <button
    ref={roomButtonRef}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30 font-light text-center"
    onClick={() => setShowRoomListPopup(!showRoomListPopup)}
  >
    Dorms
  </button>

 <button
    ref={newFurnitureref}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30 font-light text-center"
    onClick={() => setNewFurnitureListPopup(true)}
    >
    Add Your Own Furniture
  </button>

  <button
    ref={savedRoomref}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30 font-light text-center"
    onClick={() => setSavedRoomListPopup(!savedRoomListPopup)}
  >
    Saved
  </button>
</div>

{showRoomListPopup && (
  <div ref={roomPopupRef} className="absolute top-20 left-64 bg-white border p-4 rounded shadow-md z-10">
    <div className="grid grid-cols-1 gap-4 max-h-200 overflow-y-auto">
      <li>
        {roomOptions.map((room) => (
          <div
            key={room.type}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-300"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", room.image);
              onToolSelect(room); 
            }}
          >
            <img 
              src={room.image} 
              alt={room.label}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <div className="font-semibold">{room.label}</div>
            <div className="text-sm text-gray-600">{room.dimensions}</div>
            <div className="text-sm font-medium text-green-600">{room.price}</div>
          </div>
        ))}
      </li>
    </div>
  </div>
)}


{showObjectsPopup && (
  <div ref={objectsPopupRef} className="absolute top-20 left-64 bg-white border p-4 rounded shadow-md z-10">
    <div className="grid grid-cols-1 gap-4 max-h-200 overflow-y-auto">
      <li>
        {furnitureOptions.map((furniture) => (
          <div
            key={furniture.type}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-300"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", furniture.image);
              onToolSelect(room); 
            }}
          >
            <img 
              src={furniture.image} 
              alt={furniture.label}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <div className="font-semibold">{furniture.label}</div>
            <div className="text-sm text-gray-600">{furniture.dimensions}</div>
          </div>
        ))}
      </li>
    </div>
  </div>
)}

{showChecklistPopup && (
        <div ref={checklistPopupRef} className="absolute top-20 left-64 bg-white border p-4 rounded shadow-md z-10">
          <Checklist />
        </div>
      )}


{newFurnitureListPopup && (
    <HandleNewFurniture 
        onClose={() => {
            setNewFurnitureListPopup(false); 
            handleFurniture(); 
        }} 
    />
)}
    </div>
  );
};

export default Sidebar;