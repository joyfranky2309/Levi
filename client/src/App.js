import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ChatBotUi from './components/ChatBotUi';
import UserProfile from './components/UserProfile';
import { Routes, Route } from 'react-router-dom';
import Settings from './components/Settings';
import Home from './components/home';
import About from './components/About';
import Features from './components/Features';
import { Link } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import { useAuth } from './components/auth/AuthContext';
function App() {
  const {user} = useAuth();
  const [Xshow, setXshow] = useState(false)
  const [Xnewchat, setXnewchat] = useState(true);
  const auth=user
  return (

    <div>
      { auth ?
        <div className='flex fixed top-0 left-0 right-0 p-1 h-full'>
          <SideBar handleCallback={setXshow} newChatz={setXnewchat} />
          <Routes>
            <Route path='/chatreg' element={<ChatBotUi showText={Xshow} newChatz={!Xnewchat} />} />
            <Route path='/chat' element={<ChatBotUi showText={Xshow} newChatz={Xnewchat} />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/Settings' element={<Settings />} />
          </Routes>
        </div>
        :
        <div className='w-full'>
            <NavBar />
            <Routes>
              <Route path='/' element={<div><Home />
                <About />
                <Features /></div>} />
                <Route path='/getstarted' element={<Login/>} />
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </div>
        

      }
    </div>


  );
}

export default App;
