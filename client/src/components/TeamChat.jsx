import React, { useState, useEffect, useRef } from 'react';

const TeamChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('User' + Math.floor(Math.random() * 1000));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        user: userName,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Team Chat</h2>
        <div className="flex items-center">
          <span className="mr-2">Your name:</span>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border rounded p-1"
          />
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.user === userName ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.user === userName
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <div className="text-sm font-semibold">{message.user}</div>
                <div>{message.text}</div>
                <div className="text-xs mt-1 opacity-75">{message.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded p-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamChat; 