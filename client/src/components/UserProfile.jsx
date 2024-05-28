import React, { useState } from 'react';

function UserProfile(props) {
    const userData={
        name:"Joyfrank Sebastian",
        email:"joyfranksebastian23@gmail.com",
        DOB:"23-09-2004",
        occupation:"Terrorist",
        password:"nik_endhuku"
    }
  return (
    <div className=' p-5 w-full aspect-w-1 rounded-xl bg-white col-span-2'>
      <div className={`${!props.showText ? ' ml-12' : 'ml-0'} p-1 border shadow rounded ease-in-out duration-500 `}>
        <h1 className='text-black text-3xl font-bold p-1 font-sans'>Profile</h1>
        <br />
       <div className=' ml-2 flex p-3 text-xl'>
        <img src="logo192.png" alt="profilepic" className='shadow rounded-full w-[500px]' />
       <ul className=' ml-2 p-2 shadow h-[400px] w-full rounded bg-white'>
            <li className='mx-auto p-4'>Username: <span className='ml-4 text-xl'>{userData.name}</span></li>
            <li className='mx-auto p-4'>Email address: <span className='ml-4 text-xl'>{userData.email}</span></li>
            <li className='mx-auto p-4'>Date of birth: <span className='ml-4 text-xl'>{userData.DOB}</span></li>
            <li className='mx-auto p-4'>Occupation: <span className='ml-4 text-xl'>{userData.occupation}</span></li>
           
        </ul>
       
       </div>
      </div>
    </div>
  );
}

export default UserProfile;
