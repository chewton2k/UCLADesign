import React, { useState, useEffect, useRef } from "react";
import Checklist from "./Checklist";
import SearchBar from "./SearchBar";
import HandleNewFurniture from "./HandleNewFurniture";
import RoomDesigner from "./RoomDesigner";
import TodoListForm from "./TodoListForm";

const Sidebar = ({ onToolSelect, loadDesign }) => {
  const [showObjectsPopup, setShowObjectsPopup] = useState(false);
  const [showChecklistPopup, setShowChecklistPopup] = useState(false);
  const [showRoomListPopup, setShowRoomListPopup] = useState(false);
  const [roomOptions, setRoomOptions] = useState([]);
  const [furnitureOptions, setFurnitureOptions] = useState([]);
  const [savedRoomListPopup, setSavedRoomListPopup] = useState(false);
  const [newFurnitureListPopup, setNewFurnitureListPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [showlistToDO, setlistToDo] = useState(false); 

  const savedRoomref = useRef(null);
  const sidebarRef = useRef(null);
  const objectsButtonRef = useRef(null);
  const checklistButtonRef = useRef(null);
  const roomButtonRef = useRef(null);
  const objectsPopupRef = useRef(null);
  const checklistPopupRef = useRef(null);
  const roomPopupRef = useRef(null);
  const newFurnitureref = useRef(null);
  const savedPopupRef = useRef(null);
  const listPopupRef = useRef(null); 

  const PopupClose = () => {
    setShowChecklistPopup(false);
    setShowObjectsPopup(false);
    setShowRoomListPopup(false);
    setSearchQuery("");
    setSavedRoomListPopup(false);
    setlistToDo(false); 
    setNewFurnitureListPopup(false); 
  };

  const handleClickOutside = (event) => {
    if (
      !objectsButtonRef.current.contains(event.target) &&
      !checklistButtonRef.current.contains(event.target) &&
      !roomButtonRef.current.contains(event.target) &&
      !listPopupRef.current.contains(event.target) &&
      !objectsPopupRef.current?.contains(event.target) &&
      !checklistPopupRef.current?.contains(event.target) &&
      !roomPopupRef.current?.contains(event.target) &&
      !savedPopupRef.current?.contains(event.target) &&
      !savedRoomref.current.contains(event.target) && 
      !newFurnitureListPopup.current.contains(event.target)
    ) {
      PopupClose();
    }
  };

  const handleDeleteDesign = async (designId) => {
    
    try {
      const response = await fetch(`http://localhost:5001/api/designs/delete/${designId}`, { 
        method: "DELETE"
    });
    if (!response.ok) {
      throw new Error("Failed to delete design");
    }
      const newDesigns = savedDesigns.filter(design => design._id !== designId);
      setSavedDesigns(newDesigns);

    } catch (error) {
      console.error("Error deleting design: ", error);
    }
  };

  const handleRooms = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/dorms/");

      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }
      const data = await response.json();

      const formattedRooms = data.map((room) => ({
        type: room._id,
        label: room.roomType,
        price: `$${parseFloat(room.price).toLocaleString()}`,
        image: `${room.image}`,
        dimensions: `${room.roomDimensions.length}ft x ${room.roomDimensions.width}ft`,
      }));

      setRoomOptions(formattedRooms);
    } catch (error) {
      console.error("Error fetching rooms: ", error);
    }
  };

  const handleFurniture = async () => {
    let userName = window.sessionStorage.getItem("userName");

    try {
      const response = await fetch(
        `http://localhost:5001/api/furniture?username=${userName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch furniture");
      }

      const data = await response.json();

      const formattedFurniture = data.map((furniture) => ({
        type: furniture._id,
        label: furniture.name,
        image: `${furniture.image}`,
        dimensions: `${furniture.length} inches x ${furniture.width} inches x ${furniture.height} inches`,
      }));

      setFurnitureOptions(formattedFurniture);
    } catch (error) {
      console.error("Error fetching furniture", error);
    }
  };

  const handleSavedRooms = async () => { 
    {/* if the popup is open already close it */}
    if(savedRoomListPopup){
      setSavedRoomListPopup(false);
      return;
    }
    const userName = window.sessionStorage.getItem("userName");
    try{
      const response = await fetch(`http://localhost:5001/api/designs/${userName}`);

      if(!response.ok){
        throw new Error("Failed to fetch saved designs");
      }

      const data = await response.json();

      console.log("Svaed designs response", data);
      setSavedDesigns(data);
      setSavedRoomListPopup(prev => !prev);
    } catch(error){
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

  const IconButton = ({ ref, onClick, imgSrc, altText, buttonText }) => (
    <button
      ref={ref}
      className="flex flex-col items-center justify-center p-4 border-2 border-gray-700 rounded-xl hover:bg-gray-200 transition-colors w-24 h-24"
      onClick={onClick}
    >
      <img src={imgSrc} alt={altText} className="w-12 h-12" />
      <span className="mt-2 text-sm font-medium text-gray-700">{buttonText}</span>
    </button>
  );

  return (
    <div
      ref={sidebarRef}
      className="w-64 h-200 bg-gray-300 shadow-lg border py-15 rounded-4xl border-black mt-25"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Furniture Button */}
        <IconButton
          ref={objectsButtonRef}
          onClick={() => {
            PopupClose();
            setShowObjectsPopup(!showObjectsPopup);
          }}
          imgSrc="/armchair.png"
          altText="Furniture"
          buttonText="Furniture"
        />

        {/* Checklist Button */}
        <IconButton
          ref={checklistButtonRef}
          onClick={() => {
            PopupClose();
            setShowChecklistPopup(!showChecklistPopup);
          }}
          imgSrc="/to-do-list.png"
          altText="Checklist"
          buttonText="Checklist"
        />

        {/* Dorms Button */}
        <IconButton
          ref={roomButtonRef}
          onClick={() => {
            PopupClose();
            setShowRoomListPopup(!showRoomListPopup);
          }}
          imgSrc="/floor.png"
          altText="Dorms"
          buttonText="Dorms"
        />

        {/* Add Button */}
        <IconButton
          ref={newFurnitureref}
          onClick={() => {
            PopupClose();
            setNewFurnitureListPopup(!newFurnitureListPopup);
          }}
          imgSrc="/more.png"
          altText="Add"
          buttonText="Add"
        />

        {/* Saved Button */}
        <IconButton
          ref={savedRoomref}
          onClick={() => {
            PopupClose();
            setSavedRoomListPopup(!savedRoomListPopup);
          }}
          imgSrc="/bookmark.png"
          altText="Saved"
          buttonText="Saved"
        />

        {/* List Button */}
        <IconButton
          ref={listPopupRef}
          onClick={() => {
            PopupClose();
            setlistToDo(!showlistToDO);
          }}
          imgSrc="/list.png"
          altText="Saved"
          buttonText="Saved"
        />
      </div>

      {/* Room List Popup */}
      {showRoomListPopup && (
        <div
          ref={roomPopupRef}
          className="absolute top-50 left-64 bg-white border p-4 rounded-lg shadow-md z-10 w-64"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rooms..."
            className="w-full p-2 border rounded-md mb-2"
          />
          <div className="grid grid-cols-1 gap-4 max-h-150 overflow-y-auto">
            {filteredRoomOptions.map((room) => (
              <div
                key={room.type}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
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

      {/* Furniture Popup */}
      {showObjectsPopup && (
        <div
          ref={objectsPopupRef}
          className="absolute top-20 left-64 bg-white border p-4 rounded-lg shadow-md z-10 w-64"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search furniture..."
            className="w-full p-2 border rounded-md mb-2"
          />
          <div className="grid grid-cols-1 gap-4 max-h-150 overflow-y-auto">
            {filteredFurnitureOptions.map((furniture) => (
              <div
                key={furniture.type}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
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

      {/* Checklist Popup */}
      {showChecklistPopup && (
        <div
          ref={checklistPopupRef}
          className="absolute top-20 left-64 bg-white border p-4 rounded-lg shadow-md z-10 w-120"
        >
          <Checklist />
        </div>
      )}

      {/* New Furniture Popup */}
      {newFurnitureListPopup && (
                <div
                ref={newFurnitureref}
                className="absolute top-115 left-64 bg-white border p-4 rounded-lg shadow-md z-10 w-120"
              >
        <HandleNewFurniture/>
        </div>
      )}

      {/* Saved Designs Popup */}
      {savedRoomListPopup && (
    <div ref={savedPopupRef} className="absolute top-140 left-64 bg-white border p-4 rounded shadow-md z-10 max-h-[300px] max-w-[300px] overflow-y-auto">
       <h3 className="text-md font-bold mb-2">Saved Designs</h3>
       <ul className="space-y-2">
         {savedDesigns.length === 0 ? (
           <li className="text-sm text-gray-500"> No saved designs found. </li>
         ) : (
           savedDesigns.map((design, idx) => (
            <li key={design._id} className="text-sm text-gray-700 flex justify-between items-center">
            <span 
              onClick={() => {
                loadDesign(design.layout);
                setSavedRoomListPopup(false);
              }} 
              className="cursor-pointer hover:underline"
            >
              Design #{idx + 1} 
            </span>
            <button 
              onClick={async() => await handleDeleteDesign(design._id)} 
              className="text-red-500 text-xs ml-4 px-2 py-1 border border-red-500 rounded hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </li>
           ))
         )}
         </ul>
         </div>
         )}

    {showlistToDO&& (
        <div
          ref={listPopupRef}
          className="absolute top-20 left-64 bg-white border p-4 rounded-lg shadow-md z-10"
        >
          <TodoListForm/>
        </div>
      )}
    </div>
  );
};

export default Sidebar;