import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaCalendarAlt, FaClock, FaUser, FaIdCard, FaEnvelope, FaPhone, FaSuitcase, FaStar, FaBirthdayCake } from 'react-icons/fa';
import emailjs from '@emailjs/browser'; 
import '../styles/FlightDetails.css';

const airlineCodes = {
  "Air Astana": "KC",
  "SCAT": "DV",
  "SCAT Airlines": "DV",
  "FlyArystan": "FS",
  "Qazaq Air": "IQ",
  "Aeroflot": "SU",
  "Turkish Airlines": "TK",
  "Lufthansa": "LH",
  "Emirates": "EK"
};

const FlightDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const flight = location.state?.flight || {
    airline: 'Air Astana',
    origin: 'ALA',
    destination: 'DXB',
    departureTime: '10:00',
    arrivalTime: '14:30',
    price: '150 000 ₸',
    date: '15 Авг 2026'
  };

  const iataCode = airlineCodes[flight.airline] || 'XX'; 
  const logoUrl = `https://pics.avs.io/200/50/${iataCode}.png`;

  const [passenger, setPassenger] = useState({ 
    fullName: '', 
    dob: '',
    passport: '', 
    email: '',
    phone: '',
    flightClass: 'economy',
    baggage: '20kg'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault(); 
    setIsProcessing(true);
    setErrorMsg('');

    const templateParams = {
      to_email: passenger.email,
      to_name: passenger.fullName,
      route: `${flight.from?.city || flight.origin} — ${flight.to?.city || flight.destination}`,
      date: flight.date || 'Не указана',
      time: `${flight.departureTime} - ${flight.arrivalTime}`,
      airline: flight.airline,
      flight_class: passenger.flightClass,
      price: `${flight.price?.toLocaleString() || flight.price} ₸`
    };

    const SERVICE_ID = 'service_t1famju'; 
    const TEMPLATE_ID = 'template_b82wtyq'; 
    const PUBLIC_KEY = 'z8hV5wbD5hxcI2LVp';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsProcessing(false);
        setShowModal(true);
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setErrorMsg('Не удалось отправить письмо. Проверьте правильность email или настройки EmailJS.');
        setIsProcessing(false);
      });
  };

  return (
    <div className="details-bg">
      <div className="glass-panel flight-panel-centered">
        
        <div className="flight-details-header">
          <h1 className="details-title" style={{ marginBottom: 0 }}>Оформление билета</h1>
          <img 
            src={logoUrl} 
            alt={flight.airline} 
            className="details-airline-logo"
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        </div>
        
        <div className="details-info-bar">
          <div className="info-group">
            <span className="info-item"><FaPlaneDeparture /> {flight.from?.city || flight.origin} — {flight.to?.city || flight.destination}</span>
            <span className="info-item"><FaCalendarAlt /> {flight.date || 'Дата не выбрана'}</span>
            <span className="info-item"><FaClock /> {flight.departureTime} - {flight.arrivalTime}</span>
          </div>
          <span className="price-tag">{flight.price?.toLocaleString() || flight.price} ₸</span>
        </div>

        <div className="details-info">
          <h3 style={{ marginTop: 0, color: '#333', marginBottom: '20px' }}>Данные пассажира и перелета</h3>
          
          {errorMsg && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{errorMsg}</div>}

          <form onSubmit={handleBooking} className="passenger-form-grid">
            
            <div className="input-group">
              <label><FaUser /> ФИО (латиницей):</label>
              <input type="text" name="fullName" className="flight-custom-input" value={passenger.fullName} onChange={handleChange} placeholder="NURLAN OMAROV" required />
            </div>

            <div className="input-group">
              <label><FaBirthdayCake /> Дата рождения:</label>
              <input type="date" name="dob" className="flight-custom-input" value={passenger.dob} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label><FaIdCard /> Номер паспорта (ИИН):</label>
              <input type="text" name="passport" className="flight-custom-input" value={passenger.passport} onChange={handleChange} placeholder="N1234567" required />
            </div>

            <div className="input-group">
              <label><FaStar /> Класс обслуживания:</label>
              <select name="flightClass" className="flight-custom-input" value={passenger.flightClass} onChange={handleChange}>
                <option value="economy">Эконом-класс</option>
                <option value="comfort">Комфорт</option>
                <option value="business">Бизнес-класс</option>
              </select>
            </div>

            <div className="input-group">
              <label><FaPhone /> Номер телефона:</label>
              <input type="tel" name="phone" className="flight-custom-input" value={passenger.phone} onChange={handleChange} placeholder="+7 (700) 000-00-00" required />
            </div>

            <div className="input-group">
              <label><FaEnvelope /> E-mail (сюда придет билет):</label>
              <input type="email" name="email" className="flight-custom-input" value={passenger.email} onChange={handleChange} placeholder="example@mail.com" required />
            </div>

            <div className="input-group full-width">
              <label><FaSuitcase /> Багаж:</label>
              <select name="baggage" className="flight-custom-input" value={passenger.baggage} onChange={handleChange}>
                <option value="0kg">Без багажа (только ручная кладь 5 кг)</option>
                <option value="20kg">Стандартный багаж (до 20 кг)</option>
                <option value="30kg">Увеличенный багаж (до 30 кг) + 15 000 ₸</option>
              </select>
            </div>

            <div className="input-group full-width" style={{ marginTop: '10px' }}>
              <button type="submit" className="blue-btn booking-btn" disabled={isProcessing}>
                {isProcessing ? 'ОТПРАВКА БИЛЕТА...' : 'ОПЛАТИТЬ И ЗАБРОНИРОВАТЬ'}
              </button>
            </div>

          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowModal(false)}>×</button>
            
            <h2 style={{ marginTop: 0, color: '#333' }}>Оплата прошла успешно!</h2>
            <p>Ваш электронный билет и квитанция об оплате были успешно отправлены на адрес <strong>{passenger.email}</strong>.</p>
            
            <button onClick={() => setShowModal(false)} className="blue-btn" style={{ marginTop: '20px' }}>
              ОТЛИЧНО
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetails;