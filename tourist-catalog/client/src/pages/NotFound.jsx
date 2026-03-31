import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        
        <img 
          src="/404.png" 
          alt="404 - Сбился курс" 
          className="not-found-img" 
        />
        
        <h2>Похоже, вы сбились с курса</h2>
        <p>
          Страница не найдена. Возможно, ссылка устарела или маршрут был изменен.
        </p>
        
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn">
            Вернуться на главную
          </Link>
          <Link to="/flights" className="not-found-btn">
            Посмотреть авиарейсы
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default NotFound;