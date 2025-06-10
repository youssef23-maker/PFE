import React from 'react';
import { useChat } from '../contexts/ChatContext';
import { Trash2, Edit, MessageSquare, Archive } from 'lucide-react';

const ChatHistory: React.FC = () => {
  const { 
    chatHistory, 
    currentSession, 
    loadChatSession, 
    deleteSession, 
    updateSessionTitle,
    archiveSession // Nouvelle fonction
  } = useChat();
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editTitle, setEditTitle] = React.useState('');

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSave = (id: string) => {
    if (editTitle.trim()) {
      updateSessionTitle(id, editTitle);
    }
    setEditingId(null);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  if (chatHistory.length === 0) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400">
        Aucune conversation enregistrée
      </div>
    );
  }

  return (
    <div className="space-y-2 p-2">
      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Historique des conversations</h3>
      
      {chatHistory.map(session => (
        <div 
          key={session.id}
          className={`p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
            currentSession?.id === session.id 
              ? 'bg-blue-100 dark:bg-blue-900/30' 
              : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          <div className="flex-1" onClick={() => loadChatSession(session.id)}>
            {editingId === session.id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => handleSave(session.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave(session.id)}
                className="w-full p-1 bg-white dark:bg-gray-700 border rounded"
                autoFocus
              />
            ) : (
              <div>
                <div className="font-medium truncate w-48">{session.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(session.updatedAt)}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => handleEdit(session.id, session.title)}
              className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => archiveSession(session.id)}
              className="text-gray-500 hover:text-yellow-500"
              title="Archiver cette conversation"
            >
              <Archive className="w-4 h-4" />
            </button>
            <button 
              onClick={() => deleteSession(session.id)}
              className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
