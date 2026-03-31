import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api/auth';

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        setUser(data);
        toast.success('Успешный вход!');
        return true;
      } else {
        toast.error(data.message || 'Ошибка входа');
        return false;
      }
    } catch (error) {
      toast.error('Ошибка сети');
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        setUser(data);
        toast.success('Регистрация успешна!');
        return true;
      } else {
        toast.error(data.message || 'Ошибка регистрации');
        return false;
      }
    } catch (error) {
      toast.error('Ошибка сети');
      return false;
    }
  };

  const uploadAvatar = async (file) => {
    if (!user) return false;
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('avatar', file);

    try {
      const response = await fetch(`${API_URL}/upload-avatar`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        toast.success('Аватар обновлен!');
        return true;
      } else {
        toast.error(data.message || 'Ошибка при загрузке');
        return false;
      }
    } catch (error) {
      toast.error('Ошибка сети');
      return false;
    }
  };

  const toggleFavorite = async (tourId) => {
    if (!user) {
      toast.error('Войдите в аккаунт, чтобы добавить в избранное');
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/toggle-favorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, tourId }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = { ...user, favorites: data.favorites };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return true;
      }
    } catch (error) {
      toast.error('Ошибка обновления избранного');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Выход выполнен');
  };

  const value = {
    user, loading, login, register, logout, uploadAvatar, toggleFavorite
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};