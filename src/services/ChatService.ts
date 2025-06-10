import { supabase } from '../supabaseClient';
import { ChatSession, Message } from '../types';

export class ChatService {
  
  // Créer une nouvelle session de chat
  static async createChatSession(userId: string, title: string = 'New Chat'): Promise<ChatSession> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        user_id: userId,
        title: title
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating chat session:', error);
      throw new Error('Failed to create chat session');
    }

    return {
      id: data.id,
      title: data.title,
      createdAt: new Date(data.created_at).getTime(),
      updatedAt: new Date(data.updated_at).getTime(),
      messages: []
    };
  }

  // Récupérer toutes les sessions de chat d'un utilisateur
  static async getUserChatSessions(userId: string): Promise<ChatSession[]> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        id,
        title,
        created_at,
        updated_at,
        messages (
          id,
          sender,
          content,
          timestamp
        )
      `)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching chat sessions:', error);
      throw new Error('Failed to fetch chat sessions');
    }

    return data.map(session => ({
      id: session.id,
      title: session.title,
      createdAt: new Date(session.created_at).getTime(),
      updatedAt: new Date(session.updated_at).getTime(),
      messages: session.messages.map((msg: any) => ({
        id: msg.id,
        sender: msg.sender,
        content: msg.content,
        timestamp: msg.timestamp
      }))
    }));
  }

  // Sauvegarder un message
  static async saveMessage(sessionId: string, message: Omit<Message, 'id'>): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        session_id: sessionId,
        sender: message.sender,
        content: message.content,
        timestamp: message.timestamp
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      throw new Error('Failed to save message');
    }

    // Mettre à jour le timestamp de la session
    await this.updateSessionTimestamp(sessionId);

    return {
      id: data.id,
      sender: data.sender,
      content: data.content,
      timestamp: data.timestamp
    };
  }

  // Mettre à jour le titre d'une session
  static async updateSessionTitle(sessionId: string, title: string): Promise<void> {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ title })
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating session title:', error);
      throw new Error('Failed to update session title');
    }
  }

  // Supprimer une session de chat
  static async deleteChatSession(sessionId: string): Promise<void> {
    // D'abord supprimer tous les messages associés
    const { error: messagesError } = await supabase
      .from('messages')
      .delete()
      .eq('session_id', sessionId);

    if (messagesError) {
      console.error('Error deleting messages:', messagesError);
      throw new Error('Failed to delete messages');
    }

    // Ensuite supprimer la session
    const { error } = await supabase
      .from('chat_sessions')
      .delete()
      .eq('id', sessionId);

    if (error) {
      console.error('Error deleting chat session:', error);
      throw new Error('Failed to delete chat session');
    }
  }

  // Récupérer une session spécifique avec ses messages
  static async getChatSession(sessionId: string): Promise<ChatSession | null> {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select(`
        id,
        title,
        created_at,
        updated_at,
        messages (
          id,
          sender,
          content,
          timestamp
        )
      `)
      .eq('id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Session not found
      }
      console.error('Error fetching chat session:', error);
      throw new Error('Failed to fetch chat session');
    }

    return {
      id: data.id,
      title: data.title,
      createdAt: new Date(data.created_at).getTime(),
      updatedAt: new Date(data.updated_at).getTime(),
      messages: data.messages.map((msg: any) => ({
        id: msg.id,
        sender: msg.sender,
        content: msg.content,
        timestamp: msg.timestamp
      }))
    };
  }

  // Mettre à jour le timestamp d'une session (appelé automatiquement lors de l'ajout de messages)
  private static async updateSessionTimestamp(sessionId: string): Promise<void> {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating session timestamp:', error);
    }
  }
}
