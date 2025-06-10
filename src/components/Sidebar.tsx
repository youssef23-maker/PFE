import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, PlusCircle, ChevronRight, ChevronLeft, Trash2, Archive } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const { chatHistory, loadChatSession, startNewSession, currentSession, deleteSession } = useChat();
  const { currentUser } = useAuth();
  const location = useLocation();

  // Ajouter un message de bienvenue personnalisé
  useEffect(() => {
    if (currentUser && chatHistory.length > 0) {
      // L'utilisateur a des conversations archivées
      console.log(`Bienvenue ${currentUser.name}! Nous avons chargé vos ${chatHistory.length} conversations.`);
    }
  }, [currentUser, chatHistory]);

  return (
    <>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-r-md shadow-md z-20"
        aria-label={isCollapsed ? "Ouvrir la barre latérale" : "Fermer la barre latérale"}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
      
      <aside 
        className={`
          fixed left-0 top-[65px] bottom-0 w-64 bg-gray-100 dark:bg-gray-800 transition-all duration-300 z-10
          border-r border-gray-200 dark:border-gray-700 shadow-sm overflow-y-auto
          ${isCollapsed ? '-ml-64' : 'ml-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            {currentUser && (
              <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Bienvenue, <strong>{currentUser.name}</strong>
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {chatHistory.length} conversation{chatHistory.length !== 1 ? 's' : ''} archivée{chatHistory.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                startNewSession();
                if (window.innerWidth < 768) {
                  setIsCollapsed(true);
                }
              }}
              className="w-full py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nouvelle conversation</span>
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto">
            <div className="px-3 pb-3">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                Conversations récentes
              </h3>
              <ul className="space-y-1">
                {chatHistory.length > 0 ? (
                  chatHistory.map((session) => (
                    <li key={session.id} className="group relative">
                      <button
                        onClick={() => {
                          loadChatSession(session.id);
                          if (window.innerWidth < 768) {
                            setIsCollapsed(true);
                          }
                        }}
                        className={`
                          w-full text-left px-3 py-2 rounded-md text-sm group flex items-center gap-2
                          ${currentSession?.id === session.id ? 
                            'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 
                            'hover:bg-gray-200 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <MessageSquare className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate flex-1">{session.title}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(session.updatedAt).toLocaleDateString()}
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all duration-200"
                        aria-label="Supprimer la conversation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    Aucune conversation archivée
                  </li>
                )}
              </ul>
            </div>
          </nav>
          
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/profile"
              className={`
                w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2
                ${location.pathname === '/profile' ? 
                  'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 
                  'hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.90625 20.2499C3.82775 18.6534 5.15328 17.328 6.75 16.4062C8.34672 15.4845 10.1534 15 12 15C13.8466 15 15.6533 15.4845 17.25 16.4062C18.8467 17.328 20.1722 18.6534 21.0938 20.2499" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Profile Settings</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar



