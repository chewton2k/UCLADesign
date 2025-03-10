import React from 'react';
import HomePageTop from '../components/HomePageTop';
import HomePageBottom from "../components/HomePageBottom";
import TemplateGrid from '../components/TemplateGrid';

const TemplatePage = () => {
    return (
        <div>
            <HomePageTop /> 
            <main className="flex-grow"> 
                <div className="relative inset-0 flex items-center justify-center z-20">
                    <p className="font-bold text-s">
                        Templates will go here.
                    </p>
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
