import React, { useState, useEffect } from "react";

const HeartButton = ({ designId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const userName = window.sessionStorage.getItem("userName");

  // Check if design is already saved
  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/designs/${userName}`);
        const savedDesigns = await response.json();
        setIsSaved(savedDesigns.some(design => design._id === designId));
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };
    
    if (userName && designId) checkSavedStatus();
  }, [designId, userName]);

  const handleSave = async () => {
    if (!userName) {
      alert("Please login to save designs");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/designs/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName, 
          savedFrom: designId 
        })
      });

      if (response.ok) {
        setIsSaved(!isSaved);
        alert("Design saved successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error saving design: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save design. Please try again.");
    }
  };

  return (
    <button 
      onClick={handleSave}
      className="absolute top-2 right-2 p-2 hover:scale-110 transition-transform"
    >
      <img
        src={isSaved ? "/heart.png" : "/heart_empty.png"}
        alt="Save"
        className="w-6 h-6"
      />
    </button>
  );
};

export default HeartButton;
