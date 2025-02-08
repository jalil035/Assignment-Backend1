import React from 'react';
import {Link} from "react-router-dom";
import {FaFacebookSquare, FaInstagram, FaLinkedin, FaTwitterSquare} from "react-icons/fa";

const FooterBar = () => {
    return (
        <footer className="bg-gray-950 h-[5rem] flex justify-center items-center text-white">
               <div className="container mx-auto">
                   <div className="grid grid-cols-12 gap-[2rem]">
                       <div className="col-span-6">
                           <p className="text-white text-[1rem] text-center py-4">© 2025 My portfolio. All rights reserved.</p>
                       </div>
                       <div className="col-span-6">
                           <div className="flex gap-[.7rem] justify-end text-center py-4">
                               <Link to="https://facebook.com" target="_blank"  className="text-white text-[1.7rem]">
                                   <FaFacebookSquare />
                               </Link>
                               <Link to="https://yahoo.com" target="_blank" className="text-white text-[1.7rem]">
                                   <FaTwitterSquare />
                               </Link>
                               <Link to="https://instagram.com" target="_blank"  className="text-white text-[1.7rem]">
                                   <FaInstagram />
                               </Link>
                               <Link to="https://linkedin.com" target="_blank"  className="text-white text-[1.7rem]">
                                   <FaLinkedin />
                               </Link>
                           </div>
                       </div>
                   </div>
               </div>
        </footer>
    );
};

export default FooterBar;