import React, { useState } from "react";
import HomePageTop from '../components/HomePageTop';
import RegistrationForm from "../components/RegistrationForm";

const RegistrationPage = () => {
    return (
        <>
            <HomePageTop/> 
            <RegistrationForm/>
            <div className="relative inset-0 flex items-center justify-center z-20" > <p className="font-bold text-s">By signing up you agree with our Terms of Service and Privacy Policy.</p></div>
        </>
    )
}

export default RegistrationPage