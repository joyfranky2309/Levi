import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const nav= useNavigate()
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  useEffect(() => {
    if (cookies.token) {
      axios.get('http://localhost:5000/api/user/currentUser', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(response => {
        console.log(response)
        setUser(response.data);
        nav("/chat")
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        removeCookie('token');
        nav("/")
      });
    }
  }, [cookies.token, removeCookie]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { email:email, password:password });
      setCookie('token', response.data.token, { path: '/' });
      setUser(response.data);
      nav('/chat')
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  const register = async (name,email,password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {username:name,email:email,password:password});
      setCookie('token', response.data.token, { path: '/' });
      setUser(response.data);
      nav('/chat')
    } catch (error) {
      console.error('Registering:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    removeCookie('token', { path: '/' });
    nav("/")
  };

  return (
    <AuthContext.Provider value={{ user,register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
