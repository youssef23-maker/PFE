import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LocationTracker: React.FC = () => {
  const { isAuthenticated, updateUserCoordinates } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Vérifier si la géolocalisation est disponible
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas prise en charge par votre navigateur');
      return;
    }

    // Mettre à jour les coordonnées immédiatement au chargement
    updateLocation();

    // Configurer la mise à jour périodique des coordonnées (toutes les 15 minutes)
    const intervalId = setInterval(updateLocation, 15 * 60 * 1000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await updateUserCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          setError(null);
        } catch (err) {
          setError('Erreur lors de la mise à jour des coordonnées');
          console.error(err);
        }
      },
      (err) => {
        setError(`Erreur de géolocalisation: ${err.message}`);
        console.error('Erreur de géolocalisation:', err);
      }
    );
  };

  // Ce composant ne rend rien visuellement
  return null;
};

export default LocationTracker;

