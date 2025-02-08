import React from 'react';
import MenuBar from "../components/MenuBar";
import FooterBar from "../components/FooterBar";
import About from "../components/AboutPage";

const AboutPage = () => {
    return (
        <>
            {/* MenuBar */}
            <MenuBar />
            {/* About */}
            <About/>
            {/* FooterBar */}
            <FooterBar />
        </>
    );
};

export default AboutPage;
