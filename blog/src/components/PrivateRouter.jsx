import React from 'react';
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";


const PrivateRouter = ( {children} ) => {

    let isLogin = Cookies.get('token');
      return  !!isLogin===true ? children : <Navigate to='/Register' />;
};

export default PrivateRouter;

//ami kibay home page private kortay rakbo tar jonno aita dorkar
