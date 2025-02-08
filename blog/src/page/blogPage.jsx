import React from 'react';
import MenuBar from "../components/MenuBar";
import FooterBar from "../components/FooterBar";
import BlogSection from "../components/BlogSection";

const blogPage = () => {
    return (
        <>
            {/* MenuBar */}
            <MenuBar />
            {/* MenuBar */}
            <BlogSection/>
            {/* FooterBar */}
            <FooterBar />
        </>
    );
};

export default blogPage;
