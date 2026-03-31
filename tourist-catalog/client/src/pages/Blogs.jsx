import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard/BlogCard';
import Loader from '../components/Loader/Loader';
import { getBlogs } from '../services/blogService';
import '../styles/Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Ошибка:', err);
      setError('Не удалось загрузить список постов. Проверьте подключение к серверу.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearchQuery(searchQuery);
  };

  if (loading) return <Loader />;

  const filteredBlogs = blogs.filter(blog => {
    const query = activeSearchQuery.toLowerCase();
    return (
      (blog.title && blog.title.toLowerCase().includes(query)) ||
      (blog.content && blog.content.toLowerCase().includes(query))
    );
  });

  return (
    <div className="blogs-page">
      
      <div className="blogs-hero">
        <h1>Блог о путешествиях</h1>
      </div>

      <div className="container blogs-container">
        {error ? (
          <h2 style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</h2>
        ) : blogs.length === 0 ? (
          <div className="empty-blogs-wrapper">
            <div className="empty-blogs-content">
              <img 
                src="/NoBlogs.png" 
                alt="Нет постов" 
                className="empty-blogs-img" 
              />
              <h2>Постов пока нет</h2>
              <p>Администратор еще не опубликовал ни одной статьи. Загляните сюда немного позже!</p>
            </div>
          </div>
        ) : (
          <>
            <div className="search-white-block">
              <form onSubmit={handleSearch} className="search-form-flex">
                <input
                  type="text"
                  className="search-input-field"
                  placeholder="Поиск по названию или тексту поста..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-find-btn">Найти</button>
              </form>
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="empty-blogs-wrapper">
                <div className="empty-blogs-content">
                  <img src="/NoBlogs.png" alt="Ничего не найдено" className="empty-blogs-img" />
                  <h2>Ничего не найдено</h2>
                  <p>По запросу «{activeSearchQuery}» постов не найдено. Попробуйте изменить параметры поиска.</p>
                </div>
              </div>
            ) : (
              <div className="blogs-grid">
                {filteredBlogs.map(blog => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;