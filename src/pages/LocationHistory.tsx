import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

interface LocationEntry {
  latitude: number;
  longitude: number;
  timestamp: string;
}

const LocationHistory: React.FC = () => {
  const { currentUser } = useAuth();
  const [locationHistory, setLocationHistory] = useState<LocationEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationHistory = async () => {
      if (!currentUser) return;

      try {
        setIsLoading(true);
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }
        
        if (user && user.user_metadata && user.user_metadata.locationHistory) {
          setLocationHistory(user.user_metadata.locationHistory);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors de la récupération de l\'historique');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationHistory();
  }, [currentUser]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Historique des localisations</h1>
      
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          {error}
        </div>
      ) : locationHistory.length === 0 ? (
        <p>Aucun historique de localisation disponible.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Latitude</th>
                <th className="px-4 py-2 text-left">Longitude</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {locationHistory.map((entry, index) => (
                <tr key={index} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{formatDate(entry.timestamp)}</td>
                  <td className="px-4 py-2">{entry.latitude.toFixed(6)}</td>
                  <td className="px-4 py-2">{entry.longitude.toFixed(6)}</td>
                  <td className="px-4 py-2">
                    <a 
                      href={`https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Voir sur la carte
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LocationHistory;