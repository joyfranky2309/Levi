import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

function App() {
  const [auth,setAuth]=useState(false)
  return (
     
<div>
  {auth?<SideBar/>:<NavBar/>}
</div>

    
  );
}

export default App;
