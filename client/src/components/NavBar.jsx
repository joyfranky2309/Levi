import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link, animateScroll as scroll } from 'react-scroll';
import CustomButton from './ministuff/CustomButton';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [optionShow, setOptionShow] = useState(false);
  const handleNav = () => {
    setOptionShow(!optionShow);
  };

  const invisible = () => {
    return location.pathname === "/getstarted" || location.pathname === "/register";
  };

  
  return (
    <>
      {invisible()? (
        <CustomButton path="/" text="Back to home" />

      ) : (
        <div className='sticky w-full top-0 left-0 text-black font-bold p-1 z-30'>
          <div className='bg-white p-2 rounded-2xl flex justify-between items-center'>
            <h2 className='w-full font-bold text-3xl'>Levi</h2>
            <ul className='md:flex justify-end hidden'>
              <li className='p-3 hover:bg-[#000300] rounded-2xl hover:text-white hover:scale-110 transition ease-in-out delay-200'>
                <Link activeClass="active" to="section1" spy={true} smooth={true} duration={500}>
                  Home
                </Link>
              </li>
              <li className='p-3 hover:bg-[#000300] rounded-2xl hover:text-white hover:scale-110 transition ease-in-out delay-200'>
                <Link to="section2" spy={true} smooth={true} duration={500}>
                  About
                </Link>
              </li>
              <li className='p-3 hover:bg-[#000300] rounded-2xl hover:text-white hover:scale-110 transition ease-in-out delay-200'>
                <Link to="section3" spy={true} smooth={true} duration={500}>
                  Features
                </Link>
              </li>
              <li className='p-3 hover:bg-[#000300] rounded-2xl hover:text-white hover:scale-110 transition ease-in-out delay-200' onClick={()=>navigate("/getstarted")}>
                Get started
              </li>
            </ul>
            <div onClick={handleNav} className='md:hidden'>
              {!optionShow? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
            </div>
            <div className={optionShow? 'fixed left-0 top-0 w-[60%] h-full bg-white ease-out duration-500' : 'fixed left-[-100%] ease-in duration-500'}>
              <h2 className='w-full font-bold text-3xl p-2'>Levi</h2>
              <ul className='p-4 uppercase'>
                <li className='p-3 hover:bg-[#000300] rounded-2xl hover:scale-110 transition ease-in-out delay-200 hover:text-white'>Home</li>
                <li className='p-3 hover:bg-[#000300] rounded-2xl hover:scale-110 transition ease-in-out delay-200 hover:text-white'>About Levi</li>
                <li className='p-3 hover:bg-[#000300] rounded-2xl hover:scale-110 transition ease-in-out delay-200 hover:text-white'>Feature</li>
                <li className='p-3 hover:bg-[#000300] rounded-2xl hover:scale-110 transition ease-in-out delay-200 hover:text-white'>Get started</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
