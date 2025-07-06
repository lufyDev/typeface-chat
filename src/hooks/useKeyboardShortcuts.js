import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat } from '../store/slices/chatSlice';

const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();
  const { chats, activeChat } = useSelector((state) => state.chat);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Alt + number to switch between chats (1-9)
      if (e.altKey && !isNaN(e.key) && e.key !== '0') {
        const index = parseInt(e.key) - 1;
        if (index < chats.length) {
          dispatch(setActiveChat(chats[index].id));
        }
      }

      // Alt + N to focus new chat input
      if (e.altKey && e.key.toLowerCase() === 'n') {
        const newChatInput = document.querySelector('[data-new-chat-input]');
        if (newChatInput) {
          e.preventDefault();
          newChatInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, chats]);
};

export default useKeyboardShortcuts; 