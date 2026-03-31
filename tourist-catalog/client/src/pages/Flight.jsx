import React, { useState } from 'react';
import FlightCard from '../components/FlightCard/FlightCard';
import Loader from '../components/Loader/Loader';
import toast from 'react-hot-toast';
import '../styles/Flight.css'; 

const Flight = () => {
  const [departure, setDeparture] = useState('ALA'); 
  const [destination, setDestination] = useState('NQZ'); 
  const [date, setDate] = useState('');
  
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const kzAirports = [
    { code: 'ALA', name: 'Алматы' },
    { code: 'NQZ', name: 'Астана' },
    { code: 'CIT', name: 'Шымкент' },
    { code: 'SCO', name: 'Актау' },
    { code: 'GUW', name: 'Атырау' },
    { code: 'KGF', name: 'Караганда' },
    { code: 'UKK', name: 'Усть-Каменогорск' },
    { code: 'DMB', name: 'Тараз' },
    { code: 'PWQ', name: 'Павлодар' },
    { code: 'AKX', name: 'Актобе' },
    { code: 'KSN', name: 'Костанай' },
    { code: 'KZO', name: 'Кызылорда' },
    { code: 'URA', name: 'Уральск' },
    { code: 'PLX', name: 'Семей' },
    { code: 'PPK', name: 'Петропавловск' },
    { code: 'KOV', name: 'Кокшетау' },
    { code: 'TDK', name: 'Талдыкорган' },
    { code: 'DZN', name: 'Жезказган' }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!destination) {
      toast.error('Пожалуйста, укажите код аэропорта прибытия');
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`http://localhost:5000/api/flights/search?origin=${departure}&dest=${destination}`);
      const data = await response.json();

      if (response.ok) {
        setFlights(data);
      } else {
        toast.error(data.message || 'Ошибка поиска рейсов');
        setFlights([]);
      }
    } catch (error) {
      toast.error('Не удалось соединиться с сервером');
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flight-page">

      <div className="flight-hero">
        <h1>Авиабилеты</h1>
      </div>

      <div className="container">

        <div className="flight-search-container">
          <form onSubmit={handleSearch} className="flight-form">
            
            <div className="input-group">
              <label>Откуда (Казахстан):</label>
              <select 
                className="flight-input"
                value={departure} 
                onChange={(e) => setDeparture(e.target.value)}
              >
                {kzAirports.map(port => (
                  <option key={port.code} value={port.code}>{port.name} ({port.code})</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Куда (Код аэропорта):</label>
              <input 
                type="text" 
                className="flight-input"
                value={destination} 
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                placeholder="Например: DXB, IST"
                maxLength="3"
                required
                style={{ textTransform: 'uppercase' }}
              />
            </div>

            <div className="input-group">
              <label>Дата (Опционально):</label>
              <input 
                type="date" 
                className="flight-input"
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="input-group button-group">
              <button type="submit" disabled={loading} className="flight-btn">
                {loading ? 'ПОИСК...' : 'НАЙТИ БИЛЕТЫ'}
              </button>
            </div>

          </form>
        </div>

        <div className="flights-container">
          {loading ? (
            <Loader />
          ) : hasSearched && flights.length === 0 ? (
            <div className="empty-flight-wrapper">
              <div className="empty-flight-content">
                <img src="/NoTours.png" alt="Рейсы не найдены" className="empty-flight-img" />
                <h2>Рейсы не найдены</h2>
                <p>Попробуйте выбрать другое направление. Возможно, на данный момент нет запланированных рейсов по этому маршруту.</p>
              </div>
            </div>
          ) : (
            <div className="flights-list">
              {flights.length > 0 && <h2 style={{ marginBottom: '20px', color: '#333' }}>Найденные рейсы:</h2>}
              {flights.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flight;