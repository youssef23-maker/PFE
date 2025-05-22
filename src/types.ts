export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number; // Using number consistently
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}


