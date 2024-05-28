import React from "react";
const Home = () => {
    return ( 
<div className="p-3" id="section1">
    <div className="flex p-5  bg-black ">
    <img src="wings.png" alt="wings"  className="w-[400px] rounded"/>
    <div className="ml-4 mt-5">
    <p className="text-5xl text-white font-bold">Welcome to Levi, Your Virtual Legal Assistant</p>
    <p className="text-3xl mt-3 text-white">Empowering you with instant legal insights and assistance.</p>
    <button className="bg-blue-500 mt-6 p-3 rounded text-3xl">get started</button>
    </div>
    </div>
</div>
     );
}
 
export default Home;