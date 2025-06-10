import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isTyping }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [message]);

  // Handle Enter to submit, Shift+Enter for new line
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid new line
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-colors duration-200">
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="w-full pr-12 pl-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none transition-colors duration-200"
          rows={1}
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!message.trim() || isTyping}
          className={`absolute right-2 bottom-2 p-2 rounded-full ${
            message.trim() && !isTyping 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          } transition-colors duration-200`}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
      
      {isTyping && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="ml-2">OrientBot réfléchit...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;


