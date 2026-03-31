import React from 'react';
import { FaGlobeAmericas, FaHeadset, FaHeart, FaPiggyBank } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>О нас</h1>
      </div>

      <div className="container about-container">
        
        <section className="about-section top-agency-section">
          <div className="agency-text">
            <div>
              <h2>Мы — лучшие! <br /><span>Туристическое агентство</span></h2>
              <p className="agency-description">
                Wanderly — это ваш надежный проводник в мир незабываемых впечатлений. 
                Мы превращаем обычные поездки в уникальные истории, заботясь о каждом 
                шаге вашего пути. С нами вы открываете границы возможного.
              </p>
            </div>
          </div>
          <div className="agency-collage">
            <img src="https://kalilaskatour.by/wp-content/uploads/2019/05/autobus-paris-1.jpg" alt="Paris" className="collage-main" />
            <img src="https://club-miry.ru/wp-content/uploads/Agafonov_Sergei/2021/China/glav.jpg" alt="China" className="collage-small top-right" />
            <img src="https://oboitd.ru/images/goods/big/20200118021141_Dubaj_2-198.jpg" alt="Dubai" className="collage-small bottom-left" />
          </div>
        </section>

        <section className="about-section features-section-about">
          <h2>Что делает нас особенными?</h2>
          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="about-feature-icon"><FaGlobeAmericas /></div>
              <h3>Широкий охват</h3>
              <p>Организуем туры в самые отдаленные и экзотические уголки планеты</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon"><FaHeadset /></div>
              <h3>Забота 24/7</h3>
              <p>Личный менеджер всегда на связи, в каком бы часовом поясе вы ни были</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon"><FaHeart /></div>
              <h3>Доверие клиентов</h3>
              <p>Тысячи положительных отзывов и счастливых семейных историй</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon"><FaPiggyBank /></div>
              <h3>Честные цены</h3>
              <p>Никаких скрытых комиссий, только прозрачные и выгодные условия</p>
            </div>
          </div>
        </section>

        <section className="about-section testimonials-section">
          <div className="testimonials-box">
            <div className="testimonials-text">
              <h2>Услышьте улыбки наших <br /><span>Счастливых путешественников.</span></h2>
              <div className="avatar-group">
                <div className="avatars">
                  <img src="https://i.pravatar.cc/150?img=1" alt="user" />
                  <img src="https://i.pravatar.cc/150?img=2" alt="user" />
                  <img src="https://i.pravatar.cc/150?img=3" alt="user" />
                  <div className="avatar-count">10k+</div>
                </div>
                <p>Более 1000 довольных клиентов</p>
              </div>
            </div>
            
            <div className="adventure-card">
              <img src="https://blog.global-guide.org/wp-content/uploads/2025/01/111-193-e1758115913742-1024x671.jpg" alt="Tokyo" className="adventure-img" />
              <div className="adventure-info">
                <h3>Ждете приключений? <br /><span>Не пропустите их!</span></h3>
                <ul>
                  <li>Уникальные маршруты</li>
                  <li>Качество услуг</li>
                  <li>Узнайте больше, платите меньше</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;