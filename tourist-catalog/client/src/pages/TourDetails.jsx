import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTourById, addComment, deleteTour } from '../services/tourService';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader/Loader';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaUsers, FaCalendarCheck } from 'react-icons/fa'; 
import emailjs from '@emailjs/browser'; 
import '../styles/TourDetails.css';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    participants: '1',
    date: ''
  });

  useEffect(() => { fetchTour(); }, [id]);

  const fetchTour = async () => {
    try {
      const data = await getTourById(id);
      setTour(data);
    } catch (error) { toast.error('Ошибка загрузки'); } 
    finally { setLoading(false); }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const updatedTour = await addComment(id, user._id, commentText);
      setTour(updatedTour);
      setCommentText('');
      toast.success('Комментарий добавлен');
    } catch (error) { toast.error('Ошибка'); }
  };

  const handleDelete = async () => {
    if (window.confirm('Удалить тур навсегда?')) {
      try {
        await deleteTour(id);
        toast.success('Удалено!');
        navigate('/tours');
      } catch (error) { toast.error('Ошибка'); }
    }
  };

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg('');

    const templateParams = {
      to_email: bookingData.email,
      to_name: bookingData.fullName,
      tour_title: tour.title,
      tour_location: tour.location,
      tour_price: tour.price?.toLocaleString() + ' ₸',
      participants: bookingData.participants,
      booking_date: bookingData.date,
      phone: bookingData.phone
    };

    const SERVICE_ID = 'service_45x31om'; 
    const TEMPLATE_ID = 'template_8bbi93i'; 
    const PUBLIC_KEY = 'z8hV5wbD5hxcI2LVp';

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        setIsProcessing(false);
        setShowBookingModal(false);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.error('Ошибка EmailJS:', error);
        setErrorMsg('Не удалось отправить письмо. Проверьте настройки EmailJS.');
        setIsProcessing(false);
      });
  };

  if (loading) return <Loader />;
  if (!tour) return <div className="details-bg"><div className="glass-panel"><h2>Тур не найден</h2></div></div>;

  const imageUrl = tour.image?.startsWith('/uploads') ? `http://localhost:5000${tour.image}` : (tour.image || '/public/hero-bg.jpg');

  return (
    <div className="details-bg">
      <div className="glass-panel">
        <img src={imageUrl} alt={tour.title} className="details-img" />
        
        <h1 className="details-title">{tour.title}</h1>
        
        <div className="details-info-bar">
          <div className="info-group">
            <span className="info-item"><FaMapMarkerAlt /> {tour.location}</span>
            <span className="info-item"><FaCalendarAlt /> {tour.duration}</span>
          </div>
          <span className="price-tag">{tour.price?.toLocaleString()} ₸</span>
        </div>

        {user?.role === 'admin' && (
          <div className="admin-controls">
            <button onClick={() => navigate(`/edit-tour/${id}`)} className="blue-btn">РЕДАКТИРОВАТЬ</button>
            <button onClick={handleDelete} className="blue-btn">УДАЛИТЬ</button>
          </div>
        )}
        
        <p className="details-desc">{tour.description}</p>
        
        <div className="details-info">
          <p><strong>Что включено:</strong> {tour.included || 'Уточняется'}</p>
          <p><strong>Отель:</strong> {tour.hotel || 'Подбор по факту'}</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={() => setShowBookingModal(true)} className="book-tour-btn">
            ЗАБРОНИРОВАТЬ ТУР
          </button>
        </div>

        <hr className="divider" />

        <h2>Отзывы ({tour.reviews?.length || 0})</h2>
        {user ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <input 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
              placeholder="Напишите свой отзыв..." 
              required
              className="comment-input"
            />
            <button type="submit" className="comment-submit-btn">ОТПРАВИТЬ</button>
          </form>
        ) : (
          <p className="login-prompt">Войдите в аккаунт, чтобы оставить комментарий.</p>
        )}

        <div className="comments-list">
          {tour.reviews?.map((review, index) => {
            const userAvatar = review.user?.avatar && review.user.avatar !== 'default-avatar.jpg' 
              ? `http://localhost:5000${review.user.avatar}` 
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

            return (
              <div key={index} className="comment-card">
                <img src={userAvatar} alt="avatar" className="comment-avatar" />
                <div>
                  <h4 className="comment-author">
                    {review.user?.name || 'Пользователь'}
                    {review.user?.role === 'admin' && (
                      <svg className="admin-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#3ba4ff"/>
                        <path d="M7.5 12.5L10.5 15.5L16.5 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </h4>
                  <p className="comment-text">{review.text}</p>
                  <span className="comment-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showBookingModal && (
        <div className="modal-overlay">
          <div className="modal-content tour-booking-modal">
            <button className="close-modal-btn" onClick={() => setShowBookingModal(false)}>×</button>
            <h2 style={{ marginTop: 0, color: '#333' }}>Оформление тура</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>{tour.title} • {tour.price?.toLocaleString()} ₸</p>
            
            {errorMsg && <div style={{ color: 'red', marginBottom: '15px' }}>{errorMsg}</div>}

            <form onSubmit={handleBookingSubmit} className="passenger-form-grid">
              
              <div className="input-group">
                <label><FaUser /> ФИО:</label>
                <input 
                  type="text" 
                  name="fullName" 
                  className="tour-custom-input" 
                  value={bookingData.fullName} 
                  onChange={handleBookingChange} 
                  placeholder="Иванов Иван"
                  minLength="3"
                  required 
                />
              </div>

              <div className="input-group">
                <label><FaEnvelope /> E-mail:</label>
                <input 
                  type="email" 
                  name="email" 
                  className="tour-custom-input" 
                  value={bookingData.email} 
                  onChange={handleBookingChange} 
                  placeholder="example@mail.com"
                  required 
                />
              </div>

              <div className="input-group">
                <label><FaPhone /> Телефон:</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="tour-custom-input" 
                  value={bookingData.phone} 
                  onChange={handleBookingChange} 
                  placeholder="+7 (700) 000-00-00" 
                  minLength="10"
                  pattern="[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}|[\+0-9\-\s\(\)]+"
                  title="Введите корректный номер телефона"
                  required 
                />
              </div>

              <div className="input-group">
                <label><FaUsers /> Количество человек:</label>
                <input 
                  type="number" 
                  name="participants" 
                  className="tour-custom-input no-spinners" 
                  value={bookingData.participants} 
                  onChange={handleBookingChange} 
                  min="1" 
                  max="20" 
                  required 
                />
              </div>

              <div className="input-group full-width">
                <label><FaCalendarCheck /> Желаемая дата начала:</label>
                <input 
                  type="date" 
                  name="date" 
                  className="tour-custom-input" 
                  value={bookingData.date} 
                  onChange={handleBookingChange} 
                  min={new Date().toISOString().split('T')[0]} 
                  required 
                />
              </div>

              <div className="input-group full-width" style={{ marginTop: '10px' }}>
                <button type="submit" className="blue-btn booking-btn" disabled={isProcessing}>
                  {isProcessing ? 'ОТПРАВКА...' : 'ОПЛАТИТЬ И ЗАБРОНИРОВАТЬ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowSuccessModal(false)}>×</button>
            <h2 style={{ marginTop: 0, color: '#333' }}>Оплата прошла успешно!</h2>            
            <p>Ваш ваучер на тур и детали поездки отправлены на <strong>{bookingData.email}</strong>.</p>
            <button onClick={() => setShowSuccessModal(false)} className="blue-btn" style={{ marginTop: '20px' }}>
              ОТЛИЧНО
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetails;