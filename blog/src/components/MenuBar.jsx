import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import  Cookies from 'js-cookie';
import {logout} from "../apirequest/api";

const MenuBar = () => {
let isLogin = Cookies.get('token');

let logOutFunction = async ()=>{
   let result = await logout();
   if (result){
       window.location.reload();
   }
}
  return (
    <div>
      <section className="bg-amber-50 shadow-xl h-[5rem] flex items-center">
        <div className='container mx-auto'>
            <div className='grid grid-cols-12 gap-[1.875rem]'>
                <div className='col-span-2'>
                    <div className="logo px-[2rem] flex justify-center items-center gap-[1rem] font-bold text-sky-600">
                        <Link to="/"><img className='w-[4.0rem] rounded-md' src="/img/Logo.png" alt=""/></Link>
                    </div>
                </div>
                <div className='col-span-7'>
                    <nav className="flex justify-center">
                        <ul className="flex gap-[1.125rem]">
                            <li className="px-[0.8rem] py-[0.35rem] bg-amber-700 rounded-md">
                                <NavLink to="/" className='text-white'>Home</NavLink>
                            </li>
                            <li className="px-[0.8rem] py-[0.35rem] bg-amber-300 rounded-md">
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li className="px-[0.8rem] py-[0.35rem] bg-amber-300 rounded-md">
                                <NavLink to="/blog">Blog</NavLink>
                            </li>
                            <li className="px-[0.8rem] py-[0.35rem] bg-amber-300 rounded-md">
                                <NavLink to="/service">Service</NavLink>
                            </li>
                            <li className="px-[0.8rem] py-[0.35rem] bg-amber-300 rounded-md">
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='col-span-3'>
                    {
                        !!isLogin === true ? (<div className="flex gap-[.5rem] text-white">
                            <Link to='dashboard'
                                  className="px-[0.8rem] py-[0.35rem] bg-blue-700 rounded-md">Go Dashboard</Link>

                            <button
                                onClick={logOutFunction}
                                  className="px-[0.8rem] py-[0.35rem] bg-blue-700 rounded-md">
                                logOut</button>
                        </div>) : (
                            <div className="flex gap-[.5rem] text-white">
                            <Link to='login'
                                  className="px-[0.8rem] py-[0.35rem] bg-blue-700 rounded-md">login</Link>

                            <Link to='register'
                                  className="px-[0.8rem] py-[0.35rem] bg-blue-500 rounded-md">Register</Link>
                        </div>)
                    }

                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

export default MenuBar

