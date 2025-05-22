import { OrientationData } from './orientationData';

// This function is no longer used as the app now uses Stack AI API
// Keeping it for reference or fallback purposes
export const generateBotResponse = (input: string): string => {
  // Convert input to lowercase for easier matching
  const lowerInput = input.toLowerCase();
  
  // Check for greetings
  if (containsAny(lowerInput, ['hello', 'hi', 'hey', 'greetings', 'howdy'])) {
    return "Hello! How can I help you with orientation today?";
  }
  
  // Check for thank you messages
  if (containsAny(lowerInput, ['thank you', 'thanks', 'thx', 'appreciate'])) {
    return "You're welcome! Is there anything else you'd like to know about?";
  }
  
  // Check for goodbye messages
  if (containsAny(lowerInput, ['bye', 'goodbye', 'see you', 'farewell'])) {
    return "Goodbye! Feel free to come back if you have more questions.";
  }
  
  // Check for questions about the chatbot
  if (containsAny(lowerInput, ['who are you', 'what are you', 'your name', 'chatbot'])) {
    return "I'm OrientBot, an AI assistant designed to help with orientation questions. I can provide information about various topics and answer your questions to the best of my abilities.";
  }
  
  // Search for relevant information in orientation data
  for (const category in OrientationData) {
    const categoryData = OrientationData[category as keyof typeof OrientationData];
    
    for (const topic in categoryData) {
      const keywords = categoryData[topic].keywords;
      
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        return categoryData[topic].response;
      }
    }
  }
  
  // If we couldn't find a match, give a generic response
  return "I don't have specific information about that yet. Could you ask something else about orientation, or be more specific?";
};

// Helper function to check if string contains any of the words in the array
const containsAny = (text: string, words: string[]): boolean => {
  return words.some(word => text.includes(word));
};
