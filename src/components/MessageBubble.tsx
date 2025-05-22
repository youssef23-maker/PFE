import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      
      <div className={`
        max-w-[75%] p-3 rounded-lg 
        ${isBot ? 
          'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow' : 
          'bg-blue-500 text-white rounded-tr-none'
        }
      `}>
        <p className="whitespace-pre-line">{message.content}</p>
        <span className={`text-xs mt-1 block ${isBot ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'}`}>
          {formattedTime}
        </span>
      </div>
      
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;

