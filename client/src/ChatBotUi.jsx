import React, { useState } from 'react';
import NewChat from './components/NewChat';

function ChatBotUi(props) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  function generateAiResponse(userInput) {
    const greetings = [
      "Hi there! How can I be of service today?",
      "Glad you're here! What legal information are you interested in?",
      "At your service! Ask me anything about Indian law.",
    ];

    const lawTopics = {
      "Latest polices implemented":
        "Sure, here are some resources on recent policy changes: [link to relevant website]",
      "Laws about women empowerment":
        "Women's rights are a crucial topic! Did you have a specific law in mind? I can share information about domestic violence protection acts, inheritance rights, etc.",
      "Civil laws of india":
        "Civil law covers a broad range. Perhaps you're interested in contracts, property rights, or family law? Let me know if you'd like to narrow it down.",
      "Difference between criminal & civil law":
        "Great question! Criminal law deals with offenses against the state, while civil law focuses on disputes between individuals or organizations. Think crimes vs. lawsuits.",
    };

    const confusedResponses = [
      "Hmm, that's an interesting one. Can you rephrase or give me some more details?",
      "I'm still under development, and learning new things every day!  Can you try asking in a different way?",
      "BRUH? Let's get back to legal matters.  How about those civil laws?",
    ];

    let response;

    // Handle greetings and initial interaction
    if (!userInput) {
      response = greetings[Math.floor(Math.random() * greetings.length)];
    } else {
      // Check if the user selected a legal topic
      if (lawTopics.hasOwnProperty(userInput)) {
        response = lawTopics[userInput];
      } else {
        // Handle confused responses for unrecognized input
        response = confusedResponses[Math.floor(Math.random() * confusedResponses.length)];
      }
    }

    return response;
  }

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (userInput.trim() === "") return;

    const aiResponse = generateAiResponse(userInput);
    setMessages(prevMessages => [
      ...prevMessages,
      { text: userInput, sender: 'user' },
      { text: aiResponse, sender: 'ai' }
    ]);

    setUserInput(""); 
  };

  return (
    <div className='p-4 h-full w-full aspect-w-1 rounded-xl bg-white col-span-2'>
      <div className={`${!props.showText ? 'ml-12' : 'ml-0'} p-1 border shadow rounded ease-in-out duration-500`}>
        <h1 className='text-black text-3xl font-bold p-1 font-sans'>Levi</h1>
        <br />
        {props.newChatz ?
          <div className='p-5 h-fit bg-white rounded-xl overflow-hidden md:max-w-2xl '>
            {messages.map((message, index) => (
              <div key={index} className={`${message.sender === 'user' ? 'bg-indigo-400' : 'bg-gray-200'} p-2 rounded-xl mb-2`}>
                {message.text}
              </div>
            ))}
          </div>
          :
          <NewChat />
        }
        <div className='mt-2 flex shadow rounded-2xl'>
          <input
            type='text'
            placeholder='enter your message'
            className='w-full rounded-xl'
            name='message'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className='bg-blue-400 p-2 rounded-xl' onClick={handleSendMessage}>send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBotUi;
