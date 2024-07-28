import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './auth/AuthContext';
import { useCookies } from 'react-cookie';

const ChatBot = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
  ]);
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const formatText = (text) => {
    text = text.replace(/## (.+)/g, '<h2>$1</h2>');
    text = text.replace(/# (.+)/g, '<h1>$1</h1>');
    text = text.replace(/\*/g, '<br/>');
    return text;
  };
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chat/history', {
          params: { user: user._id },
          headers: {
            Authorization: `Bearer ${cookies.token}` 
          }
        });
        const chatHistory = response.data.map(chat => ({
          sender: 'user',
          text: chat.userMessage
        })).concat(response.data.map(chat => ({
          sender: 'Levi',
          text: formatText(chat.leviResponse)
        })));
        setMessages([{ sender: 'bot', text: 'Hello! How can I help you today?' }, ...chatHistory]);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [user]);


  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');

      try {
        const response = await axios.post('http://localhost:5000/api/chat/prompt', {
          prompt: input,
          user: user._id
        }, {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        });

        const formattedText = formatText(response.data.Ai_reply);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'Levi', text: formattedText },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Sorry, there was an error processing your request.' },
        ]);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 p-4 rounded-sm">
        <h1 className='text-black text-3xl bg-indigo-500 p-4 rounded-t-md text-center font-serif'>Levi</h1>
      <div className="flex flex-col flex-grow overflow-y-auto p-3 bg-white rounded shadow relative">
        <div className="flex-grow overflow-y-auto p-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`max-w-xl p-3 rounded-lg shadow ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                }`}
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between bg-white p-2 rounded-md shadow-md">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="p-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
