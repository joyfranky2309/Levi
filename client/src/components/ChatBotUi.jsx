import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './auth/AuthContext';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
  ]);
  const { user } = useAuth();
  const [input, setInput] = useState('');

  const formatText = (text) => {
    // Replace hashtags with headers
    text = text.replace(/## (.+)/g, '<h2>$1</h2>');
    text = text.replace(/# (.+)/g, '<h1>$1</h1>');
    // Replace asterisks with line breaks
    text = text.replace(/\*/g, '<br/>');
    return text;
  };

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

        // Format the response text
        const formattedText = formatText(response.data.Ai_reply);

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
