 import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const calculateAge = (dob) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Date of Birth:', dob.toISOString().split('T')[0]);
    console.log('Password:', password);
    console.log('Confirmed Password:', confirmPassword);

    // Implement your registration logic here (e.g., sending data to server)
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Levi</h1> 
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md bg-white p-3 rounded">
      <h1 className="text-2xl font-bold mb-8 text-center">Register </h1> 
        <label htmlFor="username" className="text-gray-700 font-medium">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="email" className="text-gray-700 font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="dob" className="text-gray-700 font-medium">
          Date of Birth:
        </label>
        <input
          type="date"
          id="dob"
          value={dob.toISOString().split('T')[0]}
          onChange={(e) => setDob(new Date(e.target.value))}
          required
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="password" className="text-gray-700 font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label htmlFor="confirmPassword" className="text-gray-700 font-medium">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </form>
        </div>
  );
};

export default Register;
