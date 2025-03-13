import React, { useState } from "react";
import HomePageTop from '../components/HomePageTop';
import RegistrationForm from "../components/RegistrationForm";
import HomePageBottom from "../components/HomePageBottom";

const RegistrationPage = () => {
    return (
        <div>
            <HomePageTop/> 
            <main className = "flex-grow"> 
            <RegistrationForm/>
            <div className="py-10"></div>
            </main>
            <HomePageBottom/>
        </div>
    );
};

export default RegistrationPage