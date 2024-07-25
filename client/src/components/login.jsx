import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const userData={
      email:email,
      password:password
    }
   try {
     const response = await axios.post("http://localhost:5000/api/user/login",userData);
     console.log(response.data)
   } catch (error) {
    console.log(error)
   }

  };

  return (
    <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-4 rounded'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <input type="hidden" name="remember" value="true" />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor="email-address" className='sr-only'>Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password" className='sr-only'>Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input id="remember-me" name="remember-me" type="checkbox" className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded' />
              <label htmlFor="remember-me" className='ml-2 block text-sm text-gray-900'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a href="#" className='font-medium text-indigo-600 hover:text-indigo-500'>
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" onClick={handleSubmit} className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              Sign in
            </button>
          </div>
        </form>
        <div className='text-sm'>
              <a className='font-medium text-indigo-600 hover:text-indigo-500' onClick={()=>navigate("/register")}>
                Don't have an account , Register Now!
              </a>
            </div>
      </div>
    </div>
  );
}

export default Login;
