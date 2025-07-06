import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, setActiveChat, deleteChat } from '../store/slices/chatSlice';
import { BsTrash, BsPlus } from 'react-icons/bs';

const Sidebar = () => {
  const [newChatName, setNewChatName] = useState('');
  const dispatch = useDispatch();
  const { chats, activeChat } = useSelector((state) => state.chat);

  const handleCreateChat = (e) => {
    e.preventDefault();
    if (newChatName.trim()) {
      dispatch(createChat(newChatName.trim()));
      setNewChatName('');
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <form onSubmit={handleCreateChat} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            placeholder="New chat name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <BsPlus size={24} />
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
              activeChat === chat.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
            onClick={() => dispatch(setActiveChat(chat.id))}
          >
            <span className="truncate">{chat.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteChat(chat.id));
              }}
              className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-200"
            >
              <BsTrash size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 