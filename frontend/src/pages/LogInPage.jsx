import React, { useState } from "react";
import HomePageTop from '../components/HomePageTop';
import LogInForm from '../components/LogInForm'
import HomePageBottom from "../components/HomePageBottom";

const LogInPage = () => {
    return (
        <div>
            <HomePageTop/> 
            <main className = "flex-grow"> 
            <LogInForm/>
            <div className="py-25"></div>
            </main>
            <HomePageBottom/>
        </div>
    );
};

export default LogInPage