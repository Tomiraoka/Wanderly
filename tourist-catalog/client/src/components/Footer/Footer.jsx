import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <img 
                src="/public/Wanderly.png" 
                alt="Wanderly Logo" 
                className="footer-logo-img"
              />
              <span className="footer-wanderly-text">Wanderly</span>
            </Link>
            <p>Откройте для себя лучшие туристические направления с нашим каталогом. Путешествуйте с комфортом и безопасностью.</p>
          </div>
          
          <div className="footer-section">
            <h4>Быстрые ссылки</h4>
            <ul>
              <li><Link to="/home">Главная</Link></li>
              <li><Link to="/tours">Туры</Link></li>
              <li><Link to="/flights">Авиабилеты</Link></li>
              <li><Link to="/blogs">Блог</Link></li>
              <li><Link to="/about">О нас</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Контакты</h4>
            <ul className="contacts-list">
              <li><strong>Почта:</strong> <span>wanderly.official@gmail.com</span></li>
              <li><strong>Телефон:</strong> <span>+7 (999) 123-45-67</span></li>
              <li><strong>Адрес:</strong> <span>г. Астана, пр. Мангилик Ел, 8</span></li>
            </ul>
          </div>
          
          <div className="footer-section right-align">
            <h4>Мы в соцсетях</h4>
            <div className="social-icons">
              <a href="https://facebook.com/wanderly" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://x.com/wanderly" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
              <a href="https://instagram.com/wanderly" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://youtube.com/wanderly" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Wanderly. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer