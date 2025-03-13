import React, { useState } from 'react';

const HeartButton = () => {
    const [liked, setLiked] = useState(false);

    const isLoggedIn = window.sessionStorage.getItem("UserLoggedIn") === "true";

    const toggleLike = () => {
        if (!isLoggedIn) {
            alert("You must be logged in to like this.");
            return;
        }

        setLiked(!liked);
        !liked && alert("Saved!"); 
    };

    return (
        <button onClick={toggleLike} className="mt-2 text-red-500">
            {liked ? '❤️' : '🤍'}
        </button>
    );
};

export default HeartButton;
