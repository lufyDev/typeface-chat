import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, setActiveChat, deleteChat } from '../store/slices/chatSlice';
import { BsTrash, BsPlus, BsKeyboard, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const ShortcutHint = ({ shortcut, action }) => (
  <div className="flex items-center justify-between text-xs text-gray-500 px-3 py-1">
    <span>{action}</span>
    <kbd className="px-2 py-0.5 bg-gray-100 rounded">{shortcut}</kbd>
  </div>
);

const Sidebar = () => {
  const [newChatName, setNewChatName] = useState('');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <div
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-[70px]' : 'w-72'
      }`}
    >
      <div className="relative">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:shadow-md z-10"
        >
          {isCollapsed ? <BsChevronRight size={12} /> : <BsChevronLeft size={12} />}
        </button>
      </div>

      <div className={`p-4 border-b ${isCollapsed ? 'items-center ' : ''}`}>
        {!isCollapsed && (
          <>
            <form onSubmit={handleCreateChat} className="mb-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                  placeholder="New chat name"
                  data-new-chat-input
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
            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700"
            >
              <BsKeyboard />
              {showShortcuts ? 'Hide shortcuts' : 'Show shortcuts'}
            </button>
          </>
        )}
        {isCollapsed && (
          <button
            onClick={() => dispatch(createChat(`Chat ${chats.length + 1}`))}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <BsPlus size={24} />
          </button>
        )}
      </div>

      {showShortcuts && !isCollapsed && (
        <div className="p-2 bg-gray-50 space-y-1 text-xs">
          <ShortcutHint shortcut="Alt + N" action="New chat" />
          <ShortcutHint shortcut="Alt + 1-9" action="Switch chat" />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className={`space-y-2 p-4 ${isCollapsed ? 'px-2' : ''}`}>
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between rounded-lg cursor-pointer ${
                activeChat === chat.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              } ${isCollapsed ? 'p-2' : 'p-3'}`}
              onClick={() => dispatch(setActiveChat(chat.id))}
            >
              {!isCollapsed && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{index + 1}</span>
                  <span className="truncate">{chat.name}</span>
                </div>
              )}
              {isCollapsed ? (
                <div className="w-full h-8 flex items-center justify-center text-gray-500">
                  {index + 1}
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteChat(chat.id));
                  }}
                  className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-200"
                >
                  <BsTrash size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 