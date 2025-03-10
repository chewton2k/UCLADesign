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
            <div className="relative inset-0 flex items-center justify-center z-20" > <p className="font-light text-s">
                By signing up you agree with our Terms of Service and Privacy Policy.
                </p></div>
            {/* Separator for the last section and footer*/}
            <div className="py-40"></div>
            </main>
            <HomePageBottom/>
        </div>
    );
};

export default RegistrationPage