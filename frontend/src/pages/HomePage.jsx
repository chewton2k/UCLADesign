import React from 'react';
import HomePageTop from '../components/HomePageTop';
import HomePageMiddle from '../components/HomePageMiddle'; 
import HomePageBottom from '../components/HomePageBottom';

const HomePage = () => {
  return (
    <div>
      <HomePageTop />
      <HomePageMiddle />
      <HomePageBottom/> 
    </div>
  );
};

export default HomePage;
