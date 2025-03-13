// TemplateGrid.jsx
import React, { useState, useEffect } from "react";
import HeartButton from './HeartButton';

const TemplateGrid = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/designs/getDesigns")
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => console.error("Error fetching designs:", error));
  }, []);

  const formatName = (src) => {
    if (!src) return "Unnamed";
    const fileName = src.split("/").pop().split(".")[0]; // "classic" from "/classic.jpg"
    return fileName.charAt(0).toUpperCase() + fileName.slice(1); // Capitalize
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10 lg:px-20">
      {templates.length === 0 ? (
        <p>Loading templates...</p>
      ) : (
        templates.map((template) => (
          <div
            key={template._id}
            className="relative border p-4 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg"
          >
            {/* Preview content */}
            <div className="relative bg-gray-100 border w-[200px] h-[200px] overflow-hidden mb-4 flex items-center justify-center">
              {template.layout && template.layout.length > 0 ? (
                <span className="text-sm text-gray-700 font-medium text-center px-2">
                  {formatName(template.layout[0].src)}
                </span>
              ) : (
                <span className="text-sm text-gray-500 italic">No layout data</span>
              )}
            </div>

            <h3 className="text-lg font-semibold mb-2">{template.userName}'s Design</h3>
            <HeartButton designId={template._id} />
          </div>
        ))
      )}
    </div>
  );
};

export default TemplateGrid;