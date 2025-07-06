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
        });
      }
    },
  },
});

export const { createChat, setActiveChat, deleteChat, sendMessage } = chatSlice.actions;
export default chatSlice.reducer; 