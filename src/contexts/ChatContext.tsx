import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { Message, ChatSession } from '../types';

// Constantes pour l'API Stack AI
const STACK_API_URL = import.meta.env.VITE_STACK_API_URL;
const STACK_API_KEY = import.meta.env.VITE_STACK_API_KEY;

// Fonction pour appeler l'API Stack AI
const getStackAIResponse = async (userInput: string): Promise<string> => {
  const payload = { "in-0": userInput };
  
  const response = await fetch(STACK_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STACK_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  // Vérifier si la réponse est un JSON string et l'analyser
  try {
    if (typeof data.outputs?.["out-1"] === 'string' || typeof data["out-1"] === 'string') {
      const responseText = data.outputs?.["out-1"] || data["out-1"];
      // Essayer de parser comme JSON
      try {
        const jsonResponse = JSON.parse(responseText);
        // Extraire le message de différents formats possibles
        if (jsonResponse && jsonResponse.message) {
          return jsonResponse.message;
        } else if (jsonResponse && jsonResponse.response) {
          return jsonResponse.response;
        } else if (typeof jsonResponse === 'string') {
          return jsonResponse;
        } else {
          // Si c'est un autre format JSON, retourner le texte complet
          return responseText;
        }
      } catch (e) {
        // Si ce n'est pas un JSON valide, retourner le texte tel quel
        return responseText;
      }
    }
    
    // Fallbacks
    return data.outputs?.["out-0"] || data["out-0"] || JSON.stringify(data);
  } catch (error) {
    console.error("Error parsing Stack AI response:", error);
    return "Désolé, je n'ai pas pu traiter la réponse correctement.";
  }
};

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => void;
  isTyping: boolean;
  clearChat: () => void;
  chatHistory: ChatSession[];
  loadChatSession: (sessionId: string) => void;
  currentSession: ChatSession | null;
  startNewSession: () => void;
  deleteSession: (sessionId: string) => void;
  userPreferences: { language: string };
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  isTyping: false,
  clearChat: () => {},
  chatHistory: [],
  loadChatSession: () => {},
  currentSession: null,
  startNewSession: () => {},
  deleteSession: () => {},
  userPreferences: { language: 'en' }
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [userPreferences, setUserPreferences] = useState({ language: 'fr' });

  useEffect(() => {
    if (currentUser) {
      // Start a new session instead of loading from localStorage
      startNewSession();
    } else {
      // For guest users, start a new session
      startNewSession();
    }
  }, [currentUser]);

  // Remove or comment out the localStorage effects
  // useEffect(() => {
  //   if (currentUser && chatHistory.length > 0) {
  //     localStorage.setItem(`chatHistory_${currentUser.id}`, JSON.stringify(chatHistory));
  //   }
  // }, [chatHistory, currentUser]);

  // useEffect(() => {
  //   if (!currentUser && currentSession) {
  //     localStorage.setItem('guestChatSession', JSON.stringify(currentSession));
  //   }
  // }, [currentSession, messages, currentUser]);

  const deleteSession = (sessionId: string) => {
    if (currentUser) {
      const updatedHistory = chatHistory.filter(session => session.id !== sessionId);
      setChatHistory(updatedHistory);
      
      if (currentSession?.id === sessionId) {
        if (updatedHistory.length > 0) {
          setCurrentSession(updatedHistory[0]);
          setMessages(updatedHistory[0].messages);
        } else {
          startNewSession();
        }
      }
    } else {
      if (currentSession?.id === sessionId) {
        startNewSession();
      }
    }
  };

  const startNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: []
    };
    
    setCurrentSession(newSession);
    setMessages([]);
    
    if (currentUser) {
      setChatHistory(prev => [newSession, ...prev]);
    }
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: Date.now()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        messages: updatedMessages
      };
      setCurrentSession(updatedSession);
      
      if (currentUser) {
        setChatHistory(prev => 
          prev.map(session => 
            session.id === updatedSession.id ? updatedSession : session
          )
        );
      }
    }
    
    try {
      // Utiliser l'API Stack AI au lieu de generateBotResponse
      console.log("Sending message to Stack AI:", content);
      const botResponse = await getStackAIResponse(content);
      console.log("Received response from Stack AI:", botResponse);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        content: botResponse,
        timestamp: Date.now()
      };

      const messagesWithResponse = [...updatedMessages, botMessage];
      setMessages(messagesWithResponse);

      if (currentSession) {
        const sessionWithResponse = {
          ...currentSession,
          messages: messagesWithResponse
        };
        setCurrentSession(sessionWithResponse);
        
        if (currentUser) {
          setChatHistory(prev => 
            prev.map(session => 
              session.id === sessionWithResponse.id ? sessionWithResponse : session
            )
          );
        }
      }
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        content: "Je suis désolé, mais j'ai des difficultés à générer une réponse pour le moment. Veuillez réessayer plus tard.",
        timestamp: Date.now()
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    startNewSession();
  };

  const loadChatSession = (sessionId: string) => {
    const session = chatHistory.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
      setMessages(session.messages);
    }
  };

  return (
    <ChatContext.Provider value={{
      messages,
      sendMessage,
      isTyping,
      clearChat,
      chatHistory,
      loadChatSession,
      currentSession,
      startNewSession,
      deleteSession,
      userPreferences
    }}>
      {children}
    </ChatContext.Provider>
  );
};























