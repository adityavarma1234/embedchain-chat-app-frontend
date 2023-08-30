// components/Chat.js
import React, { useState } from 'react';
import axios from '../utils/axiosConfig';

const Chat = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!userInput) return;

    // Send user input to the backend
    try {
      const response = await axios.post('/api/chat', { user_input: userInput });
      const botResponse = response.data.bot_response;
      
      // Add the user's message and bot's response to the chat history
      setChatHistory([...chatHistory, { user: userInput, bot: botResponse }]);
      
      // Clear the user input field
      setUserInput('');
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  return (
    <div>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index}>
            <div>User: {message.user}</div>
            <div>Bot: {message.bot}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
