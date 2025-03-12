import React from "react";

const Objects = ({ objectOptions, onToolSelect }) => {
  return (
    <div className="p-4">
      <h3 className="text-md font-bold mb-2">Select an Object</h3>
      <div className="grid grid-cols-2 gap-2">
        {objectOptions.map((obj) => (
          <div
            key={obj.type}
            className={`p-3 rounded cursor-pointer ${obj.color}`}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", obj.type);
            }}
            onClick={() => onToolSelect(obj.type)}
          >
            {obj.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Objects;
