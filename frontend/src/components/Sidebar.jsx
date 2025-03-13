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
    const [searchQuery, setSearchQuery] = useState("");

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
      setSearchQuery(""); 
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

  const handleToolSelect = (selectedTool) => {
    console.log("Selected Tool:", selectedTool);
  };

  const filteredRoomOptions = roomOptions.filter((room) =>
    room.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFurnitureOptions = furnitureOptions.filter((furniture) =>
    furniture.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      ref={sidebarRef}
      className="w-64 bg-gray-300 shadow-md p-4 border-b-amber-950 border-1"
    >
      <div className="flex flex-col items-center gap-1 mb-2 px-25 py-30 border-1 bg-blue-300 rounded-4xl">
  <button
    ref={objectsButtonRef}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30 font-light text-center"
    onClick={() => {PopupClose(); 
        setShowObjectsPopup(!showObjectsPopup);}}
  >
    Furniture
  </button>

  <div className="py-3"></div>

  <button
    ref={checklistButtonRef}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30 font-light text-center"
    onClick={() => {
         PopupClose(); 
         setShowChecklistPopup(!showChecklistPopup);}}
  >
    Checklist
  </button>

  <div className="py-3"></div>

  <button
    ref={roomButtonRef}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30 font-light text-center"
    onClick={() => {
        PopupClose(); 
        setShowRoomListPopup(!showRoomListPopup);}}
  >
    Dorms
  </button>
  <div className="py-3"></div>
 <button
    ref={newFurnitureref}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30 font-light text-center"
    onClick={() => {
        PopupClose(); 
        setNewFurnitureListPopup(true);}}
    >
    Add Your Own Furniture
  </button>
  <div className="py-3"></div>

  <button
    ref={savedRoomref}
    className="block px-3 py-7 z-10 border-black border-2 rounded-4xl hover:opacity-30"
    onClick={() => {
        PopupClose(); 
        setSavedRoomListPopup(!savedRoomListPopup);}}
  >
    <img 
            src="/bookmark.png" 
            alt="Save" 
            className="w-16 h-auto rounded-lg shadow-lg z-10"
          />
  </button>
</div>

{/* Room List Popup */}
{showRoomListPopup && (
        <div
          ref={roomPopupRef}
          className="absolute top-20 left-64 bg-white border p-4 rounded shadow-md z-10"
        >
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rooms..."
            className="w-full p-2 border rounded-md mb-2"
          />
          <div className="grid grid-cols-1 gap-4 max-h-200 overflow-y-auto">
            {filteredRoomOptions.map((room) => (
              <div
                key={room.type}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-300"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", room.image);
                  handleToolSelect(room);
                }}
              >
                <img
                  src={room.image}
                  alt={room.label}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <div className="font-semibold">{room.label}</div>
                <div className="text-sm text-gray-600">{room.dimensions}</div>
                <div className="text-sm font-medium text-green-600">
                  {room.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


{showObjectsPopup && (
        <div
          ref={objectsPopupRef}
          className="absolute top-20 left-64 bg-white border p-4 rounded shadow-md z-10"
        >
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search furniture..."
            className="w-full p-2 border rounded-md mb-2"
          />
          <div className="grid grid-cols-1 gap-4 max-h-200 overflow-y-auto">
            {filteredFurnitureOptions.map((furniture) => (
              <div
                key={furniture.type}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-300"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", furniture.image);
                  handleToolSelect(furniture);
                }}
              >
                <img
                  src={furniture.image}
                  alt={furniture.label}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <div className="font-semibold">{furniture.label}</div>
                <div className="text-sm text-gray-600">
                  {furniture.dimensions}
                </div>
              </div>
            ))}
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