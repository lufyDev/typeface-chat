import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  activeChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChat: (state, action) => {
      const newChat = {
        id: Date.now().toString(),
        name: action.payload,
        messages: [],
        createdAt: new Date().toISOString(),
      };
      state.chats.push(newChat);
      state.activeChat = newChat.id;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    deleteChat: (state, action) => {
      state.chats = state.chats.filter(chat => chat.id !== action.payload);
      if (state.activeChat === action.payload) {
        state.activeChat = state.chats[0]?.id || null;
      }
    },
    sendMessage: (state, action) => {
      const chat = state.chats.find(c => c.id === state.activeChat);
      if (chat) {
        chat.messages.push({
          id: Date.now().toString(),
          content: action.payload,
          timestamp: new Date().toISOString(),
          sender: 'user',
          status: 'sent',
        });
        
        // Simulate message delivery after 1 second
        setTimeout(() => {
          const messageIndex = chat.messages.findIndex(m => m.content === action.payload);
          if (messageIndex !== -1) {
            chat.messages[messageIndex].status = 'delivered';
          }
        }, 1000);
      }
    },
    updateMessageStatus: (state, action) => {
      const { chatId, messageId, status } = action.payload;
      const chat = state.chats.find(c => c.id === chatId);
      if (chat) {
        const message = chat.messages.find(m => m.id === messageId);
        if (message) {
          message.status = status;
        }
      }
    },
  },
});

export const { createChat, setActiveChat, deleteChat, sendMessage, updateMessageStatus } = chatSlice.actions;
export default chatSlice.reducer; 