import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';

const Chat = () => {
  const { role, id } = useParams(); // role: 'owner' or 'customer'
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Connect to the WebSocket server
    ws.current = new WebSocket(`ws://localhost:5000/${role}`);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.current.close();
    };
  }, [role]);

  const handleSendMessage = () => {
    const newMessage = {
      id,
      text: message,
      timestamp: new Date().toISOString()
    };
    ws.current.send(JSON.stringify(newMessage));
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with {role === 'owner' ? 'Customer' : 'Owner'}</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.id === id ? 'you' : 'other'}`}>
            <strong>{msg.id === id ? 'You' : 'Other'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="chat-send-button">Send</button>
      </div>
    </div>
  );
};

export default Chat;
