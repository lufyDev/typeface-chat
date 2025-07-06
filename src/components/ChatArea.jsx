import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/slices/chatSlice';
import moment from 'moment';
import { BsSend } from 'react-icons/bs';

const Message = ({ message }) => (
  <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} mb-4`}>
    <div
      className={`max-w-[70%] p-3 rounded-lg ${
        message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
    >
      {message.content}
    </div>
    <span className="text-xs text-gray-500 mt-1">
      {moment(message.timestamp).format('LT')}
    </span>
  </div>
);

const ChatArea = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { chats, activeChat } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);

  const activeMessages = chats.find((chat) => chat.id === activeChat)?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && activeChat) {
      dispatch(sendMessage(message.trim()));
      setMessage('');
    }
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select or create a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        {activeMessages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BsSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatArea; 