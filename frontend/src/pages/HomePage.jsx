import React from 'react';
import HomePageTop from '../components/HomePageTop';
import HomePageMiddle from '../components/HomePageMiddle'; 

const HomePage = () => {
  return (
    <div>
      <HomePageTop />
      <HomePageMiddle />
      {/* Other homepage content can go here */}
    </div>
  );
};

export default HomePage;
