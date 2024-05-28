import React from 'react'

function Settings() {
  return (
    <div className=' p-5 w-full aspect-w-1 rounded-xl bg-white col-span-2'>
        <div className='bg-indigo-400 p-3 rounded-xl h-[100%]'>
            <div className='bg-white rounded p-4 mx-auto'>
            <h1 className='text-3xl '>Settings</h1>
            <br />
            <div className='mt-5 p-4'>
                    <h1 className='text-2xl'>Change theme</h1>
                    <br />
                    <select >
                        <option value="dark">Dark theme</option>
                        <option value="Light">Light theme</option>
                    </select>
                    <br />
                    <button className='text-2xl mt-[100px] bg-red-600 rounded p-2 hover:bg-blue-400 hover:duration-300'>Delete the account</button>

            </div>
            </div>
        </div>

    </div>
  )
}

export default Settings