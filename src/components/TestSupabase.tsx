import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const TestSupabase = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    isConnected: boolean;
    message: string;
    isLoading: boolean;
  }>({
    isConnected: false,
    message: '',
    isLoading: true
  });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Utiliser une fonction RPC intégrée au lieu d'une table spécifique
        const { data, error } = await supabase.rpc('pg_version')
        
        // Si cette méthode ne fonctionne pas, essayez celle-ci :
        // const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('❌ Erreur Supabase :', error.message)
          setConnectionStatus({
            isConnected: false,
            message: `Erreur de connexion : ${error.message}`,
            isLoading: false
          });
        } else {
          console.log('✅ Connexion Supabase réussie :', data)
          setConnectionStatus({
            isConnected: true,
            message: 'Connexion établie avec succès !',
            isLoading: false
          });
        }
      } catch (err) {
        console.error('❌ Exception :', err)
        setConnectionStatus({
          isConnected: false,
          message: `Exception : ${err instanceof Error ? err.message : String(err)}`,
          isLoading: false
        });
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Test de connexion Supabase</h2>
      
      {connectionStatus.isLoading ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Test en cours...</span>
        </div>
      ) : connectionStatus.isConnected ? (
        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-md text-green-700 dark:text-green-400">
          ✅ {connectionStatus.message}
        </div>
      ) : (
        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-md text-red-700 dark:text-red-400">
          ❌ {connectionStatus.message}
        </div>
      )}
      
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Consultez également la console du navigateur pour plus de détails.
      </p>
    </div>
  )
}

export default TestSupabase