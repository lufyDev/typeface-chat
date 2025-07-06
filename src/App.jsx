import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

function App() {
  return (
    <Provider store={store}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <ChatArea />
      </div>
    </Provider>
  );
}

export default App;
