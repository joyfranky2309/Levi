import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './auth/AuthContext';
const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
  ]);
  const { user } = useAuth();
  const [input, setInput] = useState('');
let check =user
  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to the chat
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');

      try {
        // Send user's message to the backend
        const response = await axios.post('http://localhost:5000/api/chat/prompt', {
          prompt: input,
        });
        const formattedText = response.data.Ai_reply
        .replace(/\*/g, '\n')  
        .replace(/\n/g, '\t');
        // Add AI's response to the chat
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
    <div className="flex flex-col h-screen w-screen bg-gray-100 p-4">
      <div className="flex-grow overflow-y-auto p-4 bg-white rounded shadow">
      <h1 className='text-white text-3xl bg-black p-2 rounded-md '>Levi</h1>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xl p-3 m-2 rounded-lg ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
