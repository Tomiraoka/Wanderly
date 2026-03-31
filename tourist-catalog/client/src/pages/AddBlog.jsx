import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createBlog } from '../services/blogService';
import toast from 'react-hot-toast';
import '../styles/AddBlog.css'; 

const AddBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);

  if (!user || user.role !== 'admin') {
    return <div className="form-bg"><div className="glass-form"><h2>Доступ запрещен</h2></div></div>;
  }

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
      data.append('userId', user._id);
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('imageUrl', formData.imageUrl);
      if (imageFile) data.append('image', imageFile);

      await createBlog(data);
      toast.success('Пост успешно добавлен!');
      navigate('/blogs');
    } catch (error) {
      toast.error(error.message || 'Ошибка при добавлении поста');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-bg">
      <div className="glass-form">
        <h2>Добавить пост в блог</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-input" name="title" placeholder="Заголовок поста" required onChange={handleChange} />
          <textarea className="form-input area" name="content" placeholder="Текст поста..." required onChange={handleChange} />
          
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
            <button type="submit" className="blue-btn" disabled={loading}>ОПУБЛИКОВАТЬ</button>
            <button type="button" className="blue-btn" onClick={() => navigate('/blogs')}>ОТМЕНА</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;