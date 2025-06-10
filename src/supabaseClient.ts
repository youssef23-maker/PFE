import { createClient } from '@supabase/supabase-js';

// Utilisez des valeurs par défaut pour le développement local si les variables d'environnement ne sont pas définies
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction de test simple pour vérifier la connexion
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Erreur de connexion Supabase:', error.message);
      return { success: false, error: error.message };
    }
    
    return { success: true, session: data.session };
  } catch (err) {
    console.error('Exception lors du test de connexion:', err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
};




