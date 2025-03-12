import React, { useState, useEffect, useRef } from "react";
import CheckList from "./Checklist";

const Sidebar = ({ onToolSelect }) => {
  const [showObjectsPopup, setShowObjectsPopup] = useState(false);
  const [showChecklistPopup, setShowChecklistPopup] = useState(false);

  const sidebarRef = useRef(null); 
  const objectsButtonRef = useRef(null); 
  const checklistButtonRef = useRef(null); 

  const ObjectsPopup = () => {
    setShowObjectsPopup(true);
    setShowChecklistPopup(false);
  };

  const ChecklistPopup = () => {
    setShowChecklistPopup(true);
    setShowObjectsPopup(false);
  };

  const PopupClose = () => {
    setShowChecklistPopup(false);
    setShowObjectsPopup(false);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current && !sidebarRef.current.contains(event.target) &&
      !objectsButtonRef.current.contains(event.target) &&
      !checklistButtonRef.current.contains(event.target)
    ) {
      PopupClose(); // Close popups if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const objectOptions = [
    { type: "rectangle", label: "Rectangle", color: "bg-blue-500" },
    { type: "circle", label: "Circle", color: "bg-green-500" }
  ];

  return (
    <div
      ref={sidebarRef}
      className="w-64 bg-gray-300 shadow-md p-4 border-b-amber-950 border-1"
    >
      <h2 className="text-lg font-bold mb-4"></h2>
      <div> 
        {/* Objects Button */}
        <button
          ref={objectsButtonRef}
          className="px-3 py-2 z-10 border-black border-2 rounded-4xl hover:opacity-80 font-light text-center"
          onClick={ObjectsPopup}
        >
          Objects
        </button>

        {/* Checklist Button */}
        <button
          ref={checklistButtonRef}
          className="px-3 py-2 z-10 border-black border-2 rounded-4xl hover:opacity-80 font-light text-center"
          onClick={ChecklistPopup}
        >
          Checklist
        </button>
      </div>

      {/* Objects Popup */}
      {showObjectsPopup && (
        <div className="absolute top-20 left-64 bg-white border p-4 rounded shadow-md z-10">
          <h3 className="text-md font-bold mb-2">Select an Object</h3>
          <div className="grid grid-cols-2 gap-2">
            {objectOptions.map((obj) => (
              <div
                key={obj.type}
                className={`p-3 rounded cursor-pointer ${obj.color}`}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", obj.type) //sends string identifier to RoomDesigner
;                }}
                onClick={() => {
                  onToolSelect(obj.type);
                  setShowObjectsPopup(false);
                }}
              >
                {obj.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checklist Popup */}
      {showChecklistPopup && (
        <div className="absolute top-20 left-64 bg-white border p-4 rounded shadow-md z-10">
          <h3 className="text-md font-bold mb-2">Checklist</h3>
          <CheckList />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
