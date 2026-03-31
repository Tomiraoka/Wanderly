import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { buildServerUrl } from '../config/api';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout, uploadAvatar } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setLoading(true);
    const success = await uploadAvatar(selectedFile);
    if (success) {
      e.target.value = '';
    }
    setLoading(false);
  };

  const triggerFileInput = () => {
    document.getElementById('avatar-upload').click();
  };

  const avatarUrl = user?.avatar?.startsWith('/uploads')
    ? buildServerUrl(user.avatar)
    : (user?.avatar ||
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h2>Личный кабинет</h2>
          <button onClick={logout} className="logout-btn">
            ВЫЙТИ
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="avatar-section">
              <img src={avatarUrl} alt="Avatar" className="profile-avatar" />

              <div className="avatar-actions">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={triggerFileInput}
                  className="profile-btn"
                  disabled={loading}
                >
                  {loading ? 'Загрузка...' : 'Обновить фото'}
                </button>
              </div>
            </div>

            <div className="user-info">
              <h3 className="user-name">
                {user?.name}
                {user?.role === 'admin' && (
                  <svg
                    className="verified-badge"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="12" fill="#3ba4ff" />
                    <path
                      d="M7.5 12.5L10.5 15.5L16.5 8.5"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </h3>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="profile-main">
            {user?.role === 'admin' ? (
              <div className="admin-panel">
                <h3>Панель администратора</h3>
                <p>Управление контентом платформы Wanderly.</p>
                <div className="admin-actions">
                  <button onClick={() => navigate('/add-tour')} className="profile-btn">
                    Добавить тур
                  </button>
                  <button onClick={() => navigate('/add-blog')} className="profile-btn">
                    Добавить пост
                  </button>
                  <button onClick={() => navigate('/tours')} className="profile-btn">
                    Редактировать туры
                  </button>
                </div>
              </div>
            ) : (
              <div className="user-panel">
                <h3>Мои бронирования</h3>
                <div className="empty-state">
                  <p>У вас пока нет активных бронирований</p>
                  <button onClick={() => navigate('/tours')} className="profile-btn">
                    Выбрать тур
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;