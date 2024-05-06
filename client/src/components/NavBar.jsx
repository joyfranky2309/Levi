import React, { useState } from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
function NavBar() {
  const [optionshow,setOptionshow]=useState(false)
  const handleNav=()=>{
    setOptionshow(!optionshow)
  }
  return (
    <div className=' text-black font-bold mx-auto p-4 max-w-[1240px]'>
      <div className='bg-white p-2 rounded-2xl flex justify-between items-center '>
        <h2 className='w-full font-bold text-3xl'>Levi</h2>
       <ul className='md:flex hidden'>
        <li className='p-3 hover:bg-[#000300] hover:rounded-2xl hover:text-white'>Home</li>
        <li className='p-3 hover:bg-[#000300] hover:rounded-2xl hover:text-white'>About Levi</li>
        <li className='p-3 hover:bg-[#000300] hover:rounded-2xl hover:text-white'>Get started</li>
       </ul>
       <div onClick={handleNav} className='md:hidden'>
        {!optionshow ?<AiOutlineMenu size={20}/>:<AiOutlineClose size={20}/>}
       </div>
       <div className={optionshow ?'fixed left-0 top-0 w-[60%] h-full bg-white ease-out duration-500':'fixed left-[-100%] ease-in duration-500'}>
       <h2 className='w-full font-bold text-3xl p-2'>Levi</h2>
       <ul className='p-4 uppercase'>
        <li className='p-3 hover:bg-[#000300] hover:rounded-2xl hover:text-white'>Home</li>
        <li className='p-3 hover:bg-[#000300] hover:rounded-2xl hover:text-white'>About Levi</li>
        <li className='p-3 hover:bg-[#000300] hover:rounded-2xl hover:text-white'>Get started</li>
       </ul>
       </div>
      </div>
    </div>
  )
}

export default NavBar