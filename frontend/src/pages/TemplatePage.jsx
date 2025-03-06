import React, { useState } from "react";
import HomePageTop from '../components/HomePageTop';
import HomePageBottom from "../components/HomePageBottom";

const TemplatePage = () => {
    return (
        <div>
            <HomePageTop/> 
            <div className="relative inset-0 flex items-center justify-center z-20" > <p className="font-bold text-s">
                Templates will go here. 
                </p></div>
            {/* Separator for the last section and footer*/}
            <div className="py-40"></div>
            <HomePageBottom/> 
        </div>
    )
}

export default TemplatePage