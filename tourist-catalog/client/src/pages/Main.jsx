import React from 'react'
import { FaRegCompass, FaShieldAlt, FaStar, FaCreditCard } from 'react-icons/fa'
import '../styles/Main.css'

const Home = () => {
  return (
    <div className="home-page">
      
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="welcome-box">
            <h1 className="hero-title">Добро пожаловать в Wanderly!</h1>
            <p className="hero-subtitle">
              Мы создаем маршруты, которые превращаются в легенды. 
              С нами вы сможете открыть для себя самые живописные уголки планеты, насладиться безупречным комфортом и забыть о повседневной суете. 
              Каждая деталь вашего отдыха продумана до мелочей: от выбора премиальных отелей до уникальных экскурсионных программ. 
              Доверьте свой отпуск профессионалам и позвольте себе настоящее приключение, полное ярких эмоций, вдохновения и новых открытий.
            </p>
          </div>
        </div>
      </section>

      <section className="agency-section">
        <div className="container agency-container">
          <div className="agency-text">
            <div>
              <h2>Ваш идеальный отдых <br /><span>Начинается здесь</span></h2>
              <p className="agency-description">
                Wanderly — это ваш надежный проводник в мир незабываемых впечатлений. 
                Мы превращаем обычные поездки в уникальные истории, заботясь о каждом 
                шаге вашего пути. С нами вы открываете границы возможного.
              </p>
            </div>
          </div>
          <div className="agency-collage">
            <img src="https://i.pinimg.com/736x/d0/21/cd/d021cdef423b0e5d64938bb145da57b0.jpg" alt="USA" className="collage-main" />
            <img src="https://img1.akspic.ru/crops/0/7/4/0/6/160470/160470-turciya-stambul-voda-oblako-vodnyj_put-1536x2048.jpg" alt="Turkey" className="collage-small top-right" />
            <img src="https://image.fonwall.ru/o/os/gstaad-region-switzerland-mountains.jpg?auto=compress&fit=crop&w=1920&h=1080&domain=img1.fonwall.ru" alt="Switzerland" className="collage-small bottom-left" />
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают нас?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><FaRegCompass /></div>
              <h3>Лучшие маршруты</h3>
              <p>Гарантируем самые интересные туры и направления</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaStar /></div>
              <h3>Лучшие отели</h3>
              <p>Только проверенные отели с высоким рейтингом</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaShieldAlt /></div>
              <h3>Безопасность</h3>
              <p>Полная юридическая защита и страховка</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaCreditCard /></div>
              <h3>Удобная оплата</h3>
              <p>Различные способы оплаты и рассрочка</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home