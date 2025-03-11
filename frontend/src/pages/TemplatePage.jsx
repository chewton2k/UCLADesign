import React from 'react';
import HomePageTop from '../components/HomePageTop';
import HomePageBottom from "../components/HomePageBottom";
import TemplateGrid from '../components/TemplateGrids';

const TemplatePage = () => {
    return (
        <div>
            <HomePageTop /> 
            <main className="flex-grow"> 
                <div className="relative inset-0 flex items-center justify-center">
                    <h1 className="font-bold text-4xl py-15">
                        Review or Choose a Template!
                    </h1>
                </div>
                {/* Template Grid will be displayed here */}
                <TemplateGrid />
                {/* Separator for the last section and footer */}
                <div className="py-80"></div>
            </main>
            <HomePageBottom /> 
        </div>
    );
}

export default TemplatePage;
