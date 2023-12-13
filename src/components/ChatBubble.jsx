import React, { useState } from 'react';
import { ChatCircleDots } from "phosphor-react";
import Koksuś from '../assets/products/Koksuś.png';
import { useTranslation } from "react-i18next";
import data from '../translations/en/global.json';
import './ChatBubble.css';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const {t} = useTranslation("global");
  const [messages, setMessages] = useState([
    { text: `${t("bot.welcome")} `, sender: "bot" }
  ]);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const getBotResponse = (userMessage) => {
    const botResponses = data.bot; // Używa sekcji 'bot' z Twojego JSON-a.
    for (let keyword in botResponses) {
      if (userMessage.includes(keyword)) {
        return botResponses[keyword];
      }
    }
  
    return "Przepraszam, nie rozumiem."; // Domyślna odpowiedź
  };
  const handleSendMessage = () => {
    if (message) {
      const botResponse = getBotResponse(message.toLowerCase());
      setMessages([...messages, { text: message, sender: "user" }, { text: botResponse, sender: "bot" }]);
      setMessage('');
    }
  };

  return (
    <div className="chat-bubble-container">
      <div className={`chat-bubble-icon ${isOpen ? 'open' : ''}`} onClick={toggleChatWindow}>
        <ChatCircleDots className="chat-icon" color="white" size={32} />
      </div>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">Czat z Botem Koksuś</div>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="message-content">
                    <img src={Koksuś} alt="Koksuś" className="bot-icon" />
                    <p>{msg.text}</p>
                  </div>
                )}
                {msg.sender === "user" && <p>{msg.text}</p>}
              </div>
            ))}
          </div>
          <div className="message-input">
            <input 
              type="text" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Wpisz wiadomość..." 
            />
            <button onClick={handleSendMessage}>Wyślij</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
