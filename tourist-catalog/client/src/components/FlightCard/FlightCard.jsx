import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaPlaneArrival, FaClock } from 'react-icons/fa';
import './FlightCard.css';

const airlineCodes = {
  "Air Astana": "KC",
  "SCAT": "DV",
  "SCAT Airlines": "DV",
  "FlyArystan": "FS",
  "Qazaq Air": "IQ",
  "Aeroflot": "SU",
  "Turkish Airlines": "TK",
  "Lufthansa": "LH",
  "Emirates": "EK",
  "Pegasus Airlines": "PC",
  "Pegasus": "PC",
  "Wizz Air": "W6",
  "Wizz Air Abu Dhabi": "5W",
  "FlyDubai": "FZ",
  "flydubai": "FZ",
  "Qatar Airways": "QR",
  "Uzbekistan Airways": "HY",
  "Belavia": "B2",
  "S7 Airlines": "S7",
  "Air Arabia": "G9",
  "Jazeera Airways": "J9",
  "China Southern Airlines": "CZ",
  "Asiana Airlines": "OZ",
  "LOT Polish Airlines": "LO",
  "IndiGo": "6E",
  "Red Wings": "WZ",
  "Neos": "NO",
  "EgyptAir": "MS"
};

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const iataCode = flight.airlineCode || flight.carrier || airlineCodes[flight.airline] || 'XX'; 
  const logoUrl = `https://pics.avs.io/200/50/${iataCode}.png`;

  const handleSelect = () => {
    navigate('/booking', { state: { flight } });
  };

  return (
    <div className="flight-card shadow-sm">
      <div className="flight-card-main">
        <div className="airline-info">
          <img 
            src={logoUrl} 
            alt={flight.airline} 
            title={flight.airline}
            className="airline-logo" 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/150x50/eeeeee/3ba4ff?text=✈️'; 
            }}
          />
        </div>

        <div className="flight-route">
          <div className="route-point">
            <span className="time">{flight.departureTime}</span>
            <span className="city">{flight.from?.city || flight.from}</span>
          </div>
          
          <div className="route-divider">
            <span className="duration"><FaClock style={{marginRight: '5px'}}/> {flight.duration} мин</span>
            <div className="plane-line">
              <div className="line"></div>
              <FaPlaneDeparture className="plane-icon" />
              <div className="line"></div>
            </div>
            <span className="stops">{flight.stops === 0 ? 'Прямой' : `${flight.stops} пересадка`}</span>
          </div>

          <div className="route-point">
            <span className="time">{flight.arrivalTime}</span>
            <span className="city">{flight.to?.city || flight.to}</span>
          </div>
        </div>

        <div className="flight-price-section">
          <span className="price">{flight.price?.toLocaleString()} ₸</span>
          <button className="book-btn" onClick={handleSelect}>Выбрать</button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;