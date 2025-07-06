import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/slices/chatSlice';
import { BsSend, BsChatSquareText } from 'react-icons/bs';
import ChatHeader from './ChatHeader';
import Message from './Message';

const EmptyState = () => (
  <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-center p-8">
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
      <BsChatSquareText className="w-8 h-8 text-blue-500" />
    </div>
    <h3 className="text-xl font-semibold mb-2">No Chat Selected</h3>
    <p className="text-gray-500 max-w-sm">
      Select an existing chat from the sidebar or create a new one to start messaging
    </p>
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
    return <EmptyState />;
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4">
        {activeMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          activeMessages.map((msg) => <Message key={msg.id} message={msg} />)
        )}
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