import React, { useState, useEffect, useRef } from "react";
import Checklist from "./Checklist";
import SearchBar from "./SearchBar";
import HandleNewFurniture from "./HandleNewFurniture";
import RoomDesigner from "./RoomDesigner";

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

  const PopupClose = () => {
    setShowChecklistPopup(false);
    setShowObjectsPopup(false);
    setShowRoomListPopup(false);
    setSearchQuery("");
    setSavedRoomListPopup(false);
  };

  const handleClickOutside = (event) => {
    if (
      !objectsButtonRef.current.contains(event.target) &&
      !checklistButtonRef.current.contains(event.target) &&
      !roomButtonRef.current.contains(event.target) &&
      !objectsPopupRef.current?.contains(event.target) &&
      !checklistPopupRef.current?.contains(event.target) &&
      !roomPopupRef.current?.contains(event.target) &&
      !savedPopupRef.current?.contains(event.target) &&
      !savedRoomref.current.contains(event.target)
    ) {
      PopupClose();
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
    if (savedRoomListPopup) {
      setSavedRoomListPopup(false);
      return;
    }
    const userName = window.sessionStorage.getItem("userName");
    try {
      const response = await fetch(`http://localhost:5001/api/designs/${userName}`);

      if (!response.ok) {
        throw new Error("Failed to fetch saved designs");
      }

      const data = await response.json();

      console.log("Saved designs response", data);
      setSavedDesigns(data);
      setSavedRoomListPopup((prev) => !prev);
    } catch (error) {
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
      className="w-64 h-220 bg-gray-300 shadow-lg border py-30 rounded-4xl border-black"
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
            setNewFurnitureListPopup(true);
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
      </div>

      {/* Room List Popup */}
      {showRoomListPopup && (
        <div
          ref={roomPopupRef}
          className="absolute top-20 left-64 bg-white border p-4 rounded-lg shadow-md z-10 w-64"
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
          className="absolute top-20 left-64 bg-white border p-4 rounded-lg shadow-md z-10 w-64"
        >
          <Checklist />
        </div>
      )}

      {/* New Furniture Popup */}
      {newFurnitureListPopup && (
        <HandleNewFurniture
          onClose={() => {
            setNewFurnitureListPopup(false);
            handleFurniture();
          }}
        />
      )}

      {/* Saved Designs Popup */}
      {savedRoomListPopup && (
        <div
          ref={savedPopupRef}
          className="absolute top-20 left-64 bg-white border p-4 rounded-lg shadow-md z-10 w-64 max-h-64 overflow-y-auto"
        >
          <h3 className="text-md font-bold mb-2">Saved Designs</h3>
          <ul className="space-y-2">
            {savedDesigns.length === 0 ? (
              <li className="text-sm text-gray-500">No saved designs found.</li>
            ) : (
              savedDesigns.map((design, idx) => (
                <li
                  key={design._id}
                  onClick={() => {
                    loadDesign(design.layout);
                    setSavedRoomListPopup(false);
                  }}
                  className="text-sm text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                  Design #{idx + 1}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;