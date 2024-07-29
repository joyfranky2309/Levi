import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './auth/AuthContext';
import { useCookies } from 'react-cookie';

const ChatBot = () => {
  const [cookies] = useCookies(['token']);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' },
  ]);
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const endOfChatRef = useRef(null);

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
        const chatHistory = response.data.flatMap(chat => ([
          { sender: 'user', text: chat.userMessage },
          { sender: 'Levi', text: formatText(chat.leviResponse) }
        ]));
        setMessages([{ sender: 'bot', text: 'Hello! How can I help you today?' }, ...chatHistory]);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [user]);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const downloadMessage = (message) => {
    const textContent = stripHtmlTags(message.text);
    const messageText = `${message.sender}: ${textContent}`;
    const blob = new Blob([messageText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'message.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const scrollToEnd = () => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
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
              <div className="flex items-center">
                <div
                  className={`max-w-xl p-3 rounded-lg shadow ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                  }`}
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
                {message.sender === 'Levi' && (
                  <button
                    className="ml-2 p-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring"
                    onClick={() => downloadMessage(message)}
                  >
                    Download
                    
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={endOfChatRef} />
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
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" fill="currentColor" className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16" onClick={scrollToEnd}>
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
        </svg>
      </div>
    </div>
  );
};

export default ChatBot;
