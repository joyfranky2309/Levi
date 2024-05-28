import React from 'react'

function NewChat() {
  return (
    <div className=' p-4 mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl'>
    <h1 className=' text-4xl font-bold text-center'>
    How can I help you today?
  </h1>
  <ul className=' mt-16 grid grid-rows-2 grid-cols-2 gap-2'>
    <li className='shadow rounded-xl text-xl p-4 hover:duration-500 hover:bg-black hover:text-white  '>Latest polices implemented</li>
    <li className='shadow rounded-xl text-xl p-4 hover:duration-500 hover:bg-black hover:text-white  '>Laws about women empowerment</li>
    <li className='shadow rounded-xl text-xl p-4 hover:duration-500 hover:bg-black hover:text-white  '>Civil laws of india</li>
    <li className='shadow rounded-xl text-xl p-4 hover:duration-500 hover:bg-black hover:text-white  '>Difference between criminal & civil law</li>
  </ul>
  </div>
  )
}

export default NewChat