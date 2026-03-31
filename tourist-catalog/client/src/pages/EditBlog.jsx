import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getBlogById, updateBlog } from '../services/blogService';
import toast from 'react-hot-toast';
import '../styles/EditBlog.css'; 

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);
        setFormData({
          title: blog.title,
          content: blog.content,
          imageUrl: blog.image && !blog.image.startsWith('/uploads') ? blog.image : ''
        });
      } catch (error) {
        toast.error('Не удалось загрузить данные поста');
      }
    };
    fetchBlog();
  }, [id]);

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
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('imageUrl', formData.imageUrl);
      if (imageFile) data.append('image', imageFile);

      await updateBlog(id, data);
      toast.success('Пост обновлен!');
      navigate(`/blogs/${id}`);
    } catch (error) {
      toast.error('Ошибка при обновлении поста');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-bg">
      <div className="glass-form">
        <h2>Редактировать пост</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-input" name="title" value={formData.title} required onChange={handleChange} />
          <textarea className="form-input area" name="content" value={formData.content} required onChange={handleChange} />
          
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
            <button type="button" className="blue-btn" onClick={() => navigate(`/blogs/${id}`)}>ОТМЕНА</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;