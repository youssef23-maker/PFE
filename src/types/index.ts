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
  createdAt: number;
  updatedAt: number;
  archived?: boolean;
  archivedAt?: number | null;
  messages: Message[];
}


