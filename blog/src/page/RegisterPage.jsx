import React from 'react';
import RegisterForm from "../components/RegisterForm.jsx";

import FooterBar from "../components/FooterBar";

const RegisterPage = () => {
    return (
         <>
             {/*/!* MenuBar *!/*/}
             {/*<MenuBar />*/}

            {/* RegisterForm */}
            <RegisterForm />

            {/* FooterBar */}
            <FooterBar />
        </>
    );
};

export default RegisterPage;