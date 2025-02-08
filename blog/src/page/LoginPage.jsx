import React from 'react';

import LoginForm from "../components/LoginForm";
import FooterBar from "../components/FooterBar";

const LoginPage = () => {
    return (
        <>
            {/*/!* MenuBar *!/*/}
            {/*<MenuBar />*/}

            {/* LoginForm */}
            <LoginForm />

            {/* FooterBar */}
            <FooterBar />
        </>
    );
};

export default LoginPage;
