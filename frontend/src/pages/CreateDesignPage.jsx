import React, { useState } from 'react';
import HomePageTop from '../components/HomePageTop';
import HomePageBottom from "../components/HomePageBottom";
import Sidebar from '../components/Sidebar';
import RoomDesigner from '../components/RoomDesigner';

const CreateDesignPage = () => {
    const [objects, setObjects] = useState([]);

    const loadDesign = (layout) => {
        setObjects(layout);
    };

    const handleToolSelect = (item) => {
    // Convert item into an object for the grid
        const newItem = {
            id: Date.now(),
            src: item.image,
            x: 100,
            y: 100,
            rotation: 0,
        };
        setObjects((prev) => [...prev, newItem]);
    };

    return (
            <div>
                <HomePageTop />
                <main className="flex-grow">
                    <div className="min-h-screen bg-gray-100 flex">
                        <Sidebar onToolSelect={handleToolSelect} loadDesign={loadDesign} />
                        <div className="flex-grow">
                            <RoomDesigner objects={objects} setObjects={setObjects} />
                        </div>
                    </div>
                </main>
                <HomePageBottom />
            </div>
    );
}

export default CreateDesignPage;
