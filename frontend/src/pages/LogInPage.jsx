import React, { useState } from "react";
import HomePageTop from '../components/HomePageTop';
import LogInForm from '../components/LogInForm'
import HomePageBottom from "../components/HomePageBottom";

const LogInPage = () => {
    return (
        <div>
            <HomePageTop/> 
            <LogInForm/>
            {/* Separator for the last section and footer*/}
            <div className="py-40"></div>
            <HomePageBottom/>
        </div>
    );
};

export default LogInPage