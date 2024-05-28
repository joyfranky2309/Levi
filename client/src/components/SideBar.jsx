import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SideBar(props) {
  const [show, setShow] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    props.handleCallback(show);
  }, [show, props.handleCallback]);

  useEffect(() => {
    props.newChatz(false);
  }, [props.newChatz]);
  
  const changeVis = () => {
    setShow(!show);
  };
  
  const setnewChat = () => {
    props.newChatz(true);
  };

  function navChat(){
    navigate('/chat')
  }
  function navProfile(){
    navigate('/profile')
  }
  function navSettings(){
    navigate('/Settings')
  }
  function LogOut(){
    //todo
  }

  return (
    <div className={!show ? 'h-auto w-0 rounded-2xl mt-1 z-20 bg-indigo-400 ease-out duration-500 border border-indigo-400/75' : 'h-auto w-[20%] mt-1 rounded-2xl z-20 bg-indigo-400 ease-in duration-500 border border-indigo-400/75'}>
      <div className='bg-indigo-400 rounded-2xl mx-auto'>
        {!show ? <button onClick={changeVis} className='font-bold hover:bg-black hover:text-white hover:duration-500 rounded-xl w-auto bg-blue-500 p-2'>Menu</button> : <button onClick={changeVis} className='font-bold hover:bg-black hover:text-white hover:duration-500 rounded-xl w-auto bg-blue-500 p-2'>Close</button>}
        <div className={!show ? 'hidden' : 'block mt-4 p-2'}>
          <br />
          <ul className='font-bold'>
            <li className='font-bold rounded p-4 hover:bg-black hover:text-white hover:scale-125 hover:duration-500' onClick={navChat}><label onClick={navChat}>CHAT</label></li>
            <li className='font-bold rounded p-4 hover:bg-black hover:text-white hover:scale-125 hover:duration-500'onClick={navProfile}><label onClick={navProfile}>PROFILE</label></li>
            <li className='font-bold rounded p-4 hover:bg-black hover:text-white hover:scale-125 hover:duration-500'onClick={navSettings}><label onClick={navSettings}>SETTINGS</label></li>
            <li className='font-bold rounded p-4 hover:bg-black hover:text-white hover:scale-125 hover:duration-500'>lOGOUT</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
