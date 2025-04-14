import React, { useState, useRef, useEffect } from 'react';

const TeamChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', text: 'Good morning team!', timestamp: '09:00 AM', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, sender: 'Jane Smith', text: 'Morning! How is everyone doing?', timestamp: '09:05 AM', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, sender: 'Mike Johnson', text: 'All good here! Working on the project proposal.', timestamp: '09:10 AM', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [currentUser] = useState({ name: 'You', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const message = {
      id: Date.now(),
      sender: currentUser.name,
      text: newMessage,
      timestamp: timeString,
      avatar: currentUser.avatar
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="bg-white shadow rounded-lg h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Team Chat</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[70%] ${message.sender === currentUser.name ? 'flex-row-reverse' : 'flex-row'}`}>
              <img 
                src={message.avatar} 
                alt={message.sender} 
                className="w-8 h-8 rounded-full"
              />
              <div className={`mx-2 ${message.sender === currentUser.name ? 'bg-indigo-100' : 'bg-gray-100'} rounded-lg p-3`}>
                <div className="font-medium text-sm">{message.sender}</div>
                <div>{message.text}</div>
                <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamChat; 