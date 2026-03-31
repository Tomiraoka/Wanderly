import React, { useState, useEffect } from 'react';
import TourCard from '../components/TourCard/TourCard';
import Loader from '../components/Loader/Loader';
import { getTours } from '../services/tourService';
import { useAuth } from '../context/AuthContext';
import '../styles/Tours.css';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const { user, toggleFavorite } = useAuth();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const data = await getTours();
      setTours(data);
    } catch (err) {
      setError('Не удалось загрузить список туров.');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = async (tourId) => {
    if (toggleFavorite) await toggleFavorite(tourId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearchQuery(searchQuery);
  };

  if (loading) return <Loader />;

  const filteredTours = tours.filter(tour => {
    const query = activeSearchQuery.toLowerCase();
    return (
      (tour.title && tour.title.toLowerCase().includes(query)) ||
      (tour.location && tour.location.toLowerCase().includes(query))
    );
  });

  return (
    <div className="tours-page">
      <div className="tours-hero">
        <h1>Список туров</h1>
      </div>
      
      <div className="container tours-container">
        {error ? (
          <h2 style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</h2>
        ) : tours.length === 0 ? (
          <div className="empty-tours-wrapper">
            <div className="empty-tours-content">
              <img src="/NoTours.png" alt="Нет туров" className="empty-tours-img" />
              <h2>Туров пока нет</h2>
              <p>Администратор еще не добавил ни одного тура. Загляните сюда немного позже!</p>
            </div>
          </div>
        ) : (
          <>
            <div className="search-white-block">
              <form onSubmit={handleSearch} className="search-form-flex">
                <input
                  type="text"
                  className="search-input-field"
                  placeholder="Поиск по названию или направлению..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-find-btn">Найти</button>
              </form>
            </div>

            {filteredTours.length === 0 ? (
              <div className="empty-tours-wrapper">
                <div className="empty-tours-content">
                  <img src="/NoTours.png" alt="Ничего не найдено" className="empty-tours-img" />
                  <h2>Ничего не найдено</h2>
                  <p>По запросу «{activeSearchQuery}» туров не найдено. Попробуйте изменить параметры поиска.</p>
                </div>
              </div>
            ) : (
              <div className="tours-grid">
                {filteredTours.map(tour => (
                  <TourCard
                    key={tour._id}
                    tour={tour}
                    isFavorite={user?.favorites?.includes(tour._id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Tours;