import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { buildServerUrl } from '../../config/api';
import './TourCard.css';

const TourCard = ({ tour, isFavorite, onFavoriteToggle }) => {
  const imageUrl = tour.image?.startsWith('/uploads')
    ? buildServerUrl(tour.image)
    : (tour.image || '/public/hero-bg.jpg');

  return (
    <div className="tour-card">
      <div className="tour-card-img-wrapper">
        <img src={imageUrl} alt={tour.title} className="tour-card-img" />
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onFavoriteToggle(tour._id);
          }}
        >
          {isFavorite ? (
            <FaHeart className="heart-icon active" style={{ color: 'red' }} />
          ) : (
            <FaRegHeart className="heart-icon" />
          )}
        </button>
      </div>

      <div className="tour-card-content">
        <div className="tour-location">
          <FaMapMarkerAlt /> {tour.location || 'Направление'}
        </div>

        <h3 className="tour-title">{tour.title}</h3>

        <div className="tour-details">
          <span>
            <FaCalendarAlt /> {tour.duration || '7 дней'}
          </span>
        </div>

        <div className="tour-footer">
          <div className="tour-price">
            <span className="price-value">
              {tour.price?.toLocaleString('ru-RU')} ₸
            </span>
          </div>
          <Link to={`/tours/${tour._id}`} className="tour-btn">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;