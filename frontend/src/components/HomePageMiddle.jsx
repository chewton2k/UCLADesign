import React from 'react';
import HeroSection from './HeroSection';
import PlanExpSection from './PlanExpSection';

const HomePageMiddle = () => {
  return (
    <div>
      <HeroSection />
      <PlanExpSection/> 
      {/* Separator for the last section and footer*/}
      <div className="py-70"></div>
    </div>
  );
};

export default HomePageMiddle;
