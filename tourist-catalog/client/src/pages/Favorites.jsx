import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTours } from '../services/tourService';
import TourCard from '../components/TourCard/TourCard';
import Loader from '../components/Loader/Loader';
import '../styles/Favorites.css';

const Favorites = () => {
  const { user, toggleFavorite } = useAuth();
  const [favoriteTours, setFavoriteTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavoriteTours();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchFavoriteTours = async () => {
    try {
      const allTours = await getTours();
      const filtered = allTours.filter(tour => user?.favorites?.includes(tour._id));
      setFavoriteTours(filtered);
    } catch (error) {
      console.error('Ошибка при загрузке избранного:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (tourId) => {
    const success = await toggleFavorite(tourId);
    if (success) {
      setFavoriteTours(prev => prev.filter(t => t._id !== tourId));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="favorites-page">
      <div className="favorites-hero">
        <h1>Мое избранное</h1>
      </div>

      <div className="container favorites-container">
        {favoriteTours.length === 0 ? (
          <div className="empty-favorites-wrapper">
            <div className="empty-favorites-content">
              <img 
                src="/NoFavorites.png" 
                alt="Список пуст" 
                className="empty-favorites-img" 
              />
              <h2>Список пуст</h2>
              <p>У вас пока нет сохраненных туров. Перейдите в каталог, чтобы добавить их!</p>
            </div>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoriteTours.map(tour => (
              <TourCard
                key={tour._id}
                tour={tour}
                isFavorite={true}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;