// Make sure the User interface is correctly defined
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  isGuest?: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: number; // Changed from string to number to match src/types.ts
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
  updatedAt?: number; // Added to match the other definition
}





