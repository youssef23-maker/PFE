export interface Message {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

