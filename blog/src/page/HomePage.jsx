import React from 'react'
import MenuBar from '../components/MenuBar';
import HeroSlider from "../components/HeroSlider";
import FooterBar from "../components/FooterBar";


const HomePage = () => {
  return (
      <>
          {/* MenuBar */}
          <MenuBar />

          {/* HeroSlider */}
          <HeroSlider />

          {/* FooterBar */}
          <FooterBar />

      </>
        );
};

export default HomePage


