import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Define User type
type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  isGuest: boolean;
};

// Enable bypass auth for development
const ENABLE_BYPASS_AUTH = true;

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  loginAsGuest: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserCoordinates: (lat?: number, lng?: number) => Promise<void>;
  error: string | null;
  bypassLogin: (email: string) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // Check Supabase session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
          setIsLoading(false);
          return;
        }
        
        if (data.session?.user) {
          const user = data.session.user;
          const formattedUser = {
            id: user.id,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            createdAt: user.created_at,
            isGuest: user.user_metadata?.isGuest || false
          };
          
          console.log('Found existing supabase session:', formattedUser);
          setCurrentUser(formattedUser);
        }
      } catch (err) {
        console.error('Session check exception:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        if (event === 'SIGNED_IN' && session?.user) {
          const user = session.user;
          const formattedUser = {
            id: user.id,
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            createdAt: user.created_at,
            isGuest: user.user_metadata?.isGuest || false
          };
          setCurrentUser(formattedUser);
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        const user = {
          id: data.user.id,
          name: data.user.user_metadata?.name || email.split('@')[0],
          email: data.user.email || email,
          createdAt: data.user.created_at,
          isGuest: false
        };
        
        console.log('Login successful:', user);
        
        // Vérifier si l'utilisateur existe dans la table profiles
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Erreur lors de la vérification du profil:', profileError);
        }
        
        // Si le profil n'existe pas, le créer
        if (!profileData) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              name: user.name,
              email: user.email,
              created_at: new Date().toISOString()
            });
          
          if (insertError) {
            console.error('Erreur lors de la création du profil:', insertError);
          }
        }
        
        setCurrentUser(user);
        
        // Forcer le rechargement des sessions de chat
        localStorage.setItem('last_login', Date.now().toString());
        
        return data;
      }
      
      return data;
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login error');
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            isGuest: false
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        const user = {
          id: data.user.id,
          name: name || email.split('@')[0],
          email: data.user.email || email,
          createdAt: data.user.created_at,
          isGuest: false
        };
        
        console.log('Registration successful:', user);
        setCurrentUser(user);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Error during registration');
      throw err;
    }
  };

  const logout = async () => {
    console.log('Logging out user');
    setCurrentUser(null);
    await supabase.auth.signOut();
  };

  const updateUserCoordinates = async (lat?: number, lng?: number) => {
    // Simplified for now
    console.log('Updating coordinates:', { lat, lng });
  };

  const loginAsGuest = async (): Promise<void> => {
    try {
      // Generate a random email for the guest user
      const randomEmail = `guest_${Math.random().toString(36).substring(2, 10)}@example.com`;
      const randomPassword = Math.random().toString(36).substring(2, 15);
      
      // Register a new guest user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: randomEmail,
        password: randomPassword,
        options: {
          data: {
            name: 'Guest User',
            isGuest: true
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        const user = {
          id: data.user.id,
          name: 'Guest User',
          email: data.user.email || randomEmail,
          createdAt: data.user.created_at,
          isGuest: true
        };
        
        console.log('Guest login successful:', user);
        setCurrentUser(user);
      }
    } catch (err) {
      console.error('Guest login error:', err);
      setError(err instanceof Error ? err.message : 'Error during guest login');
      throw err;
    }
  };

  const bypassLogin = async (email: string) => {
    try {
      if (!ENABLE_BYPASS_AUTH) {
        throw new Error('Bypass authentication is disabled');
      }
      
      // Create a mock user for development purposes
      const mockUser = {
        id: `dev-${Date.now()}`,
        name: email.split('@')[0] || 'Dev User',
        email: email,
        createdAt: new Date().toISOString(),
        isGuest: false
      };
      
      console.log('Development bypass login:', mockUser);
      setCurrentUser(mockUser);
      
      return { user: mockUser };
    } catch (err) {
      console.error('Bypass login error:', err);
      setError(err instanceof Error ? err.message : 'Error during bypass login');
      throw err;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        isAuthenticated: !!currentUser, 
        isLoading, 
        login,
        loginAsGuest,
        register,
        logout,
        updateUserCoordinates,
        error,
        bypassLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};















