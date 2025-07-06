import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';

const AppContent = () => {
  useKeyboardShortcuts();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
