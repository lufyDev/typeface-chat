import React from 'react';
import { useSelector } from 'react-redux';
import { BsChatDots } from 'react-icons/bs';

const ChatHeader = () => {
  const { chats, activeChat } = useSelector((state) => state.chat);
  const currentChat = chats.find((chat) => chat.id === activeChat);

  return (
    <div className="h-16 border-b flex items-center px-4 bg-white">
      {currentChat ? (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <BsChatDots className="text-blue-500" />
          </div>
          <div>
            <h2 className="font-semibold">{currentChat.name}</h2>
            <p className="text-xs text-gray-500">
              {currentChat.messages.length} messages
            </p>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">No chat selected</div>
      )}
    </div>
  );
};

export default ChatHeader; 