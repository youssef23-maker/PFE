import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, MessageCircle, User } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 sticky top-0 z-10 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <MessageCircle className="text-blue-500 h-6 w-6" />
          <span className="font-bold text-xl">OrientBot</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center gap-2"
              >
                <span className="hidden md:inline">{currentUser?.name}</span>
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </div>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 p-2 rounded-full"
                aria-label="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;