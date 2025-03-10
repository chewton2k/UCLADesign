import React, { useState } from 'react';

const HeartButton = () => {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    }

    return (
        <button onClick={toggleLike} className="mt-2 text-red-500">
            {liked ? '❤️' : '🤍'}
        </button>
    );
}

export default HeartButton;
