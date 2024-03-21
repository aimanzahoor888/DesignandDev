import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LiveChatBot = () => {
  const defaultBotMessage = "Hello! How may I assist you today?";
  
  const [messages, setMessages] = useState([{ text: defaultBotMessage, isBot: true }]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Clear local storage on component mount
    localStorage.removeItem('chatMessages');
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
  
    // Add user message to the chat
    const newUserMessage = { text: inputValue, isBot: false };
    setMessages([...messages, newUserMessage]);
  
    // Simulate bot response
    setTimeout(() => {
      let botResponse;
      if (inputValue.toLowerCase().includes('hello')) {
        botResponse = "Hello! How can I assist you today?";
      } else if (inputValue.toLowerCase().includes('help')) {
        botResponse = "Sure, I'm here to help. What do you need assistance with?";
      } else {
        botResponse = "I am just a simple chat bot. I cannot respond to your messages.";
      }
      const newBotMessage = { text: botResponse, isBot: true };
      setMessages([...messages, newBotMessage]);
    }, 500);
  
    setInputValue('');
  };
  const chatbotContainerStyle = {
    width: '99%',
    margin: '0 auto',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: '#FCF6F5',
    fontFamily: 'kalnia',
    borderRadius: '8px',
  };

  const chatContainerStyle = {
    border: '1px solid #ccc',
    marginTop: '30px',
    padding: '20px',
    height: '70vh',
    overflowY: 'scroll',
    width: '80%',
    marginBottom: '20px',
    borderRadius: '20px',
    backgroundColor: 'white',
  };

  const messageStyle = {
    marginBottom: '10px',
    textAlign: 'left',
    backgroundColor: '#e0e0e0',
    padding: '5px 8px',
    borderRadius: '10px',
    width: 'fit-content',
    alignSelf: 'flex-end', // Align messages sent by the user to the right
  };

  const inputContainerStyle = {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    flex: '1',
    padding: '8px',
    marginRight: '10px',
    border: '1px solid #C68763',
    borderRadius: '8px',
    fontFamily: 'kalnia',
  };

  const buttonStyle = {
    padding: '8px 10px',
    backgroundColor: '#C68763',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1em',
    fontFamily: 'kalnia',
  };

  const headerStyle = {
    background: 'transparent',
    color: 'black',
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  };

  const headerButtonStyle = {
    fontFamily: 'kalnia',
    background: 'white',
    color: 'black',
    textDecoration: 'none',
    fontSize: '1em',
    padding: '8px 10px',
    border: '2.5px solid #C68763',
    borderRadius: '8px',
    marginLeft: '10px',
    cursor: 'pointer',
  };

  return (
    <div style={chatbotContainerStyle}>
      <header style={headerStyle}>
        <div>
          <h1 style={{ margin: '0', fontFamily: 'kalnia', fontWeight: 'bold', fontSize: '2.7em' }}>
            THr!ftN
          </h1>
        </div>
        <div>
          <Link to="/choose-category" style={headerButtonStyle}>Sell Now</Link>
          <Link to="/donate" style={headerButtonStyle}>Donate</Link>
          <Link to="/wishlist" style={headerButtonStyle}>Wishlist</Link>
          <Link to="/about-us" style={headerButtonStyle}>About Us</Link>
        </div>
      </header>
      <h2 style={{ color: '#C68763', marginBottom: '20px', fontSize: '5em' }}></h2>
      <div style={chatContainerStyle}>
        {messages.map((message, index) => (
          <div key={index} style={{ ...messageStyle, alignSelf: message.isBot ? 'flex-start' : 'flex-end' }}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={inputContainerStyle}>
        <input type="text" value={inputValue} onChange={handleInputChange} style={inputStyle} placeholder="Type your message here" />
        <button type="submit" style={buttonStyle}>Send</button>
      </form>
    </div>
  );
};

export default LiveChatBot;
