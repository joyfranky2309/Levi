import React, { createContext, useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      // Fetch user data using the token
      axios.get('http://localhost:5000/api/user/currentUser', {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        removeCookie('token');
      });
    }
  }, [cookies.token, removeCookie]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { email:email, password:password });
      setCookie('token', response.data.token, { path: '/' });
      setUser(response.data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  const register = async (name,email,password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {username:name,email:email,password:password});
      setCookie('token', response.data.token, { path: '/' });
      setUser(response.data.user);
    } catch (error) {
      console.error('Registering:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    removeCookie('token', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ user,register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
