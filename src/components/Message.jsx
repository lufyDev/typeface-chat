import React from 'react';
import moment from 'moment';
import { BsCheck, BsCheckAll } from 'react-icons/bs';

const MessageStatus = ({ status }) => {
  switch (status) {
    case 'sent':
      return <BsCheck className="text-gray-400" />;
    case 'delivered':
      return <BsCheckAll className="text-blue-500" />;
    default:
      return null;
  }
};

const Message = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
      <div className="flex items-end gap-1">
        <div
          className={`max-w-[70%] p-3 rounded-lg ${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {message.content}
        </div>
        {isUser && <MessageStatus status={message.status} />}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-gray-500">
          {moment(message.timestamp).format('LT')}
        </span>
      </div>
    </div>
  );
};

export default Message; 