import React, { useState, useEffect } from "react";
import HeartButton from './HeartButton';

const TemplateGrid = () => {
  const [templates, setTemplates] = useState([]);
  const [furnitureDimensions, setFurnitureDimensions] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    //fetch templates
    fetch("http://localhost:5001/api/designs/getDesigns")
      .then(response => response.json())
      .then(data => setTemplates(data))
      .catch(error => console.error("Error fetching designs:", error));
    
    loadFurnitureDimensions();
  }, []);

  const loadFurnitureDimensions = () => {
    const dimensions = {
      "/classic.jpg": { width: 200, height: 200 },
      "/desk_chair.png": { width: 60, height: 60 },
      "/drawer.png": { width: 80, height: 40 },
      "/minifridge.png": { width: 50, height: 60 },
      "/microwave.png": { width: 50, height: 30 },
      "/bunk_bed.png": { width: 150, height: 100 },
      "/top-bed.png": { width: 150, height: 100 },
      "/closet.png": { width: 100, height: 50 },
      "/bean-bag.png": { width: 70, height: 70 },
    };
    
    setFurnitureDimensions(dimensions);
    setImagesLoaded(true);
  };

  const formatName = (src) => {
    if (!src) return "Unnamed";
    const fileName = src.split("/").pop().split(".")[0]; 
    return fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-/g, " ");
  };

  const renderPreview = (layout, containerWidth, containerHeight) => {
    if (!layout || layout.length === 0 || !imagesLoaded) return null;
    
    //find center point of the layout
    let sumX = 0, sumY = 0;
    layout.forEach(item => {
      sumX += item.x;
      sumY += item.y;
    });
    const centerX = sumX / layout.length;
    const centerY = sumY / layout.length;
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    layout.forEach(item => {
      const dimensions = furnitureDimensions[item.src] || { width: 50, height: 50 };
      
      const compressionFactor = 0.3;
      
      const compressedX = centerX + (item.x - centerX) * compressionFactor;
      const compressedY = centerY + (item.y - centerY) * compressionFactor;
      
      const halfWidth = dimensions.width / 2;
      const halfHeight = dimensions.height / 2;
      
      minX = Math.min(minX, compressedX - halfWidth);
      minY = Math.min(minY, compressedY - halfHeight);
      maxX = Math.max(maxX, compressedX + halfWidth);
      maxY = Math.max(maxY, compressedY + halfHeight);
      
      
      item.compressedX = compressedX;
      item.compressedY = compressedY;
    });
    
    const padding = 10;
    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;
    
    const areaWidth = maxX - minX;
    const areaHeight = maxY - minY;
    
    const scaleX = containerWidth / areaWidth;
    const scaleY = containerHeight / areaHeight;
    const scale = Math.min(scaleX, scaleY) * 0.9; 
    
    return (
      <div className="relative w-full h-full bg-gray-50">
        {layout.map((item) => {
          const dimensions = furnitureDimensions[item.src] || { width: 50, height: 50 };
          
          const relativeX = item.compressedX - minX;
          const relativeY = item.compressedY - minY;
          
          const scaledX = relativeX * scale;
          const scaledY = relativeY * scale;
          
          const furnitureScaleFactor = 1.1;
          const scaledWidth = dimensions.width * scale * furnitureScaleFactor;
          const scaledHeight = dimensions.height * scale * furnitureScaleFactor;
          
          return (
            <div
              key={item.id}
              className="absolute flex items-center justify-center"
              style={{
                left: `${scaledX}px`,
                top: `${scaledY}px`,
                width: `${scaledWidth}px`,
                height: `${scaledHeight}px`,
                transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
                transformOrigin: 'center center',
                zIndex: item.src === "/classic.jpg" ? 0 : 1,
              }}
            >
              <img 
                src={item.src} 
                alt={formatName(item.src)}
                className="w-full h-full object-contain"
                style={{ pointerEvents: 'none' }}
              />
            </div>
          );
        })}
      </div>
    );
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
            {/* Template preview */}
            <div className="relative bg-gray-100 border w-[200px] h-[200px] overflow-hidden mb-4">
              {template.layout && template.layout.length > 0 ? (
                renderPreview(template.layout, 200, 200)
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-sm text-gray-500 italic">No layout data</span>
                </div>
              )}
            </div>

            {/* Template info */}
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-2">{template.userName}'s Design</h3>
              <p className="text-sm text-gray-500 mb-2">
                {template.layout.length} items • Created {new Date(template.createdAt).toLocaleDateString()}
              </p>
              <HeartButton designId={template._id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TemplateGrid;