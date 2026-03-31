import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createTour } from '../services/tourService';
import toast from 'react-hot-toast';
import '../styles/AddTour.css';

const AddTour = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', location: '', duration: '', price: '', description: '', included: '', hotel: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);

  if (!user || user.role !== 'admin') return <div className="form-bg"><div className="glass-form"><h2>Доступ запрещен</h2></div></div>;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    if(e.target.files[0]) {
       toast.success('Фото выбрано');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append('userId', user._id);
      if (imageFile) data.append('image', imageFile);

      await createTour(data);
      toast.success('Успешно!');
      navigate('/tours');
    } catch (error) { toast.error('Ошибка'); } 
    finally { setLoading(false); }
  };

  return (
    <div className="form-bg">
      <div className="glass-form">
        <h2>Добавить новый тур</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-input" name="title" placeholder="Название тура" required onChange={handleChange} />
          <input className="form-input" name="location" placeholder="Локация" required onChange={handleChange} />
          <input className="form-input" name="duration" placeholder="Длительность" required onChange={handleChange} />
          <input className="form-input" name="price" type="number" placeholder="Цена" required onChange={handleChange} />
          <textarea className="form-input area" name="description" placeholder="Описание" required onChange={handleChange} />
          <input className="form-input" name="included" placeholder="Что включено" onChange={handleChange} />
          <input className="form-input" name="hotel" placeholder="Отель" onChange={handleChange} />
          
          <div className="file-box">
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }} 
            />
            <button type="button" onClick={triggerFileInput} className="blue-btn" style={{marginTop: 0, marginBottom: '8px'}}>
              {imageFile ? 'ФОТО ВЫБРАНО' : 'ОБНОВИТЬ ФОТО'}
            </button>
            <input className="form-input" name="imageUrl" placeholder="URL изображения" onChange={handleChange} disabled={!!imageFile} />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
            <button type="submit" className="blue-btn" disabled={loading}>СОХРАНИТЬ</button>
            <button type="button" className="blue-btn" onClick={() => navigate('/tours')}>ОТМЕНА</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTour;