import React, { useState } from "react";
import HomePageTop from '../components/HomePageTop';
import LogInForm from '../components/LogInForm'
import HomePageBottom from "../components/HomePageBottom";

const LogInPage = () => {
    return (
        <>
            <HomePageTop/> 
            <LogInForm/>
            <HomePageBottom/>
        </>
    )
}

export default LogInPage