import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { Message, ChatSession } from '../types';
import { ChatService } from '../services/ChatService';

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
      loadChatHistory();
      // Supprimez cette ligne pour éviter la création automatique
      // startNewSession();
    } else {
      // Pour les utilisateurs non connectés, créer une session unique
      if (!currentSession) {
        startNewSession();
      }
    }
  }, [currentUser]);

  const startNewSession = async () => {
    if (currentUser) {
      try {
        const newSession = await ChatService.createChatSession(currentUser.id);
        setCurrentSession(newSession);
        setMessages([]);
        
        // Mettre à jour l'historique
        loadChatHistory();
      } catch (error) {
        console.error('Error creating new session:', error);
      }
    } else {
      // Pour les utilisateurs invités, créer une session locale
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: 'New Chat',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: []
      };
      setCurrentSession(newSession);
      setMessages([]);
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
      // Sauvegarder le message utilisateur dans Supabase
      if (currentUser) {
        try {
          await ChatService.saveMessage(currentSession.id, {
            sender: 'user',
            content,
            timestamp: Date.now()
          });
        } catch (error) {
          console.error('Error saving user message:', error);
        }
      }
      
      // Mettre à jour la session locale
      const updatedSession = {
        ...currentSession,
        messages: updatedMessages
      };
      setCurrentSession(updatedSession);
    }
    
    try {
      // Utiliser l'API Stack AI
      const botResponse = await getStackAIResponse(content);
      
      const botMessage: Message = {
        id: Date.now().toString(),
        sender: 'bot',
        content: botResponse,
        timestamp: Date.now()
      };

      const messagesWithResponse = [...updatedMessages, botMessage];
      setMessages(messagesWithResponse);

      // Sauvegarder la réponse du bot dans Supabase
      if (currentUser && currentSession) {
        try {
          await ChatService.saveMessage(currentSession.id, {
            sender: 'bot',
            content: botResponse,
            timestamp: Date.now()
          });
        } catch (error) {
          console.error('Error saving bot message:', error);
        }
      }

      if (currentSession) {
        const sessionWithResponse = {
          ...currentSession,
          messages: messagesWithResponse
        };
        setCurrentSession(sessionWithResponse);
      }
    } catch (error) {
      console.error('Error getting bot response:', error);
      // Gérer l'erreur...
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    startNewSession();
  };

  // Fonction pour charger l'historique des conversations
  const loadChatHistory = async () => {
    if (currentUser) {
      try {
        const sessions = await ChatService.getUserChatSessions(currentUser.id);
        setChatHistory(sessions);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  };

  // Charger une session spécifique
  const loadChatSession = async (sessionId: string) => {
    if (currentUser) {
      try {
        const session = await ChatService.getChatSession(sessionId);
        if (session) {
          setCurrentSession(session);
          setMessages(session.messages);
        }
      } catch (error) {
        console.error('Error loading chat session:', error);
      }
    } else {
      // Pour les utilisateurs invités, utiliser l'historique local
      const session = chatHistory.find(s => s.id === sessionId);
      if (session) {
        setCurrentSession(session);
        setMessages(session.messages);
      }
    }
  };

  // Supprimer une session
  const deleteSession = async (sessionId: string) => {
    if (currentUser) {
      try {
        await ChatService.deleteChatSession(sessionId);
        // Mettre à jour l'historique après suppression
        loadChatHistory();
        
        if (currentSession?.id === sessionId) {
          startNewSession();
        }
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    } else {
      // Pour les utilisateurs invités...
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



































