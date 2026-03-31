import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import './BlogCard.css'; 

const BlogCard = ({ blog }) => {
  const imageUrl = blog.image?.startsWith('/uploads') 
    ? `http://localhost:5000${blog.image}` 
    : (blog.image || '/public/hero-bg.jpg');

  const excerpt = blog.content?.length > 100 
    ? blog.content.substring(0, 100) + '...' 
    : blog.content;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="blog-card">
      <div className="blog-card-img-wrapper">
        <img src={imageUrl} alt={blog.title} className="blog-card-img" />
      </div>
      
      <div className="blog-card-content">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-excerpt">{excerpt}</p>
        
        <div className="blog-footer">
          <div className="blog-meta">
            <span>
              <FaUser /> {blog.author?.name || 'Администратор'}
              {(!blog.author || blog.author?.role === 'admin') && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="12" fill="#3ba4ff"/>
                  <path d="M7.5 12.5L10.5 15.5L16.5 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span><FaCalendarAlt /> {formattedDate}</span>
          </div>
          
          <Link to={`/blogs/${blog._id}`} className="blog-btn">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;