import React from 'react'
import { useNavigate } from 'react-router-dom';

function CustomButton(props) {
    const path=props.path;
    const text=props.text;
    const navigate=useNavigate();
    function handleNav(){
        navigate(path);
    }
  return (
    <div>
        <button onClick={handleNav} className='mt-2 ml-3 bg-white text-3xl p-3 rounded-3xl'>{props.text}</button>
    </div>
  )
}

export default CustomButton