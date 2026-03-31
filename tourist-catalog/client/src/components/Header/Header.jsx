import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <img src="/Wanderly.png" alt="Wanderly Logo" className="header-logo-img" />
          <span className="header-wanderly-text">Wanderly</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Меню"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Главная
          </Link>
          <Link to="/tours" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Туры
          </Link>
          <Link to="/flights" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Авиабилеты
          </Link>
          <Link to="/blogs" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Блог
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            О нас
          </Link>

          <div className="mobile-user-actions">
            {user ? (
              <>
                <Link
                  to="/favorites"
                  className="header-blue-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Избранное
                </Link>
                <Link to="/profile" className="header-blue-btn" onClick={() => setMobileMenuOpen(false)}>
                  Профиль
                </Link>
              </>
            ) : (
              <Link to="/auth" className="header-blue-btn" onClick={() => setMobileMenuOpen(false)}>
                Вход / Регистрация
              </Link>
            )}
          </div>
        </nav>

        <div className="user-actions">
          {user ? (
            <div className="user-menu">
              <Link to="/favorites" className="header-blue-btn">
                Избранное
              </Link>
              <Link to="/profile" className="header-blue-btn">
                Профиль
              </Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/auth" className="header-blue-btn">
                Вход / Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;