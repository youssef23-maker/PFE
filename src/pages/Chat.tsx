import React, { useEffect, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import { BrainCircuit, Trash2, Settings } from 'lucide-react';

const Chat: React.FC = () => {
  const { messages, sendMessage, isTyping, clearChat, userPreferences } = useChat();
  const { currentUser } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Personnaliser le titre en fonction de l'utilisateur
  const chatTitle = currentUser 
    ? `Chat avec OrientBot, ${currentUser.name}`
    : "Chat with OrientBot";

  return (
    <div className="flex flex-col h-[calc(100vh-150px)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="text-blue-500 w-6 h-6" />
          <h1 className="text-xl font-bold">{chatTitle}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
            aria-label="Clear chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => {/* Ouvrir modal de préférences */}}
            className="p-2 text-gray-500 hover:text-blue-500 transition-colors duration-200"
            aria-label="Préférences"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-4 transition-colors duration-200">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <BrainCircuit className="w-16 h-16 mb-4 text-blue-500 opacity-50" />
            <p className="text-lg font-medium mb-2">
              {currentUser 
                ? `Bonjour ${currentUser.name}, comment puis-je vous aider aujourd'hui ?` 
                : "No messages yet"}
            </p>
            <p className="text-sm">Start a conversation with OrientBot</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message} 
                userName={currentUser?.name}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <ChatInput 
        onSendMessage={sendMessage} 
        isTyping={isTyping} 
        language={userPreferences.language}
      />
    </div>
  );
};

export default Chat;


