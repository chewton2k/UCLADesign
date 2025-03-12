import React from 'react';
import HomePageTop from '../components/HomePageTop';
import HomePageBottom from "../components/HomePageBottom";
import Sidebar from '../components/Sidebar';
import RoomDesigner from '../components/RoomDesigner';

const CreateDesignPage = () => {
    return (
            <div>
                <HomePageTop />
                <main className="flex-grow">
                    <div className="min-h-screen bg-gray-100 flex">
                        <Sidebar />
                        <div className="flex-grow">
                            <RoomDesigner />
                        </div>
                    </div>
                </main>
                <HomePageBottom />
            </div>
    );
}

export default CreateDesignPage;
