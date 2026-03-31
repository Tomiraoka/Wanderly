import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTourById, updateTour } from '../services/tourService';
import toast from 'react-hot-toast';
import '../styles/EditTour.css';

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', location: '', duration: '', price: '', description: '', included: '', hotel: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const tour = await getTourById(id);
        setFormData({ ...tour, imageUrl: tour.image && !tour.image.startsWith('/uploads') ? tour.image : '' });
      } catch (error) { toast.error('Ошибка'); }
    };
    fetchTour();
  }, [id]);

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
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      await updateTour(id, data);
      toast.success('Обновлено!');
      navigate(`/tours/${id}`);
    } catch (error) { toast.error('Ошибка'); } 
    finally { setLoading(false); }
  };

  return (
    <div className="form-bg">
      <div className="glass-form">
        <h2>Редактировать тур</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-input" name="title" value={formData.title} required onChange={handleChange} />
          <input className="form-input" name="location" value={formData.location} required onChange={handleChange} />
          <input className="form-input" name="duration" value={formData.duration} required onChange={handleChange} />
          <input className="form-input" name="price" type="number" value={formData.price} required onChange={handleChange} />
          <textarea className="form-input area" name="description" value={formData.description} required onChange={handleChange} />
          <input className="form-input" name="included" value={formData.included || ''} onChange={handleChange} />
          <input className="form-input" name="hotel" value={formData.hotel || ''} onChange={handleChange} />
          
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
            <input className="form-input" name="imageUrl" value={formData.imageUrl || ''} placeholder="URL изображения" onChange={handleChange} disabled={!!imageFile} />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
            <button type="submit" className="blue-btn" disabled={loading}>СОХРАНИТЬ</button>
            <button type="button" className="blue-btn" onClick={() => navigate(`/tours/${id}`)}>ОТМЕНА</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTour;