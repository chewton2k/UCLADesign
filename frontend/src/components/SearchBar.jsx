import React, { useState } from "react";

const SearchBar = ({ objectOptions, onToolSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = objectOptions.filter((obj) =>
    obj.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search objects..."
        className="w-full p-2 border rounded-md mb-2"
      />
      <div className="grid grid-cols-2 gap-2">
        {filteredOptions.map((obj) => (
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

export default SearchBar;
