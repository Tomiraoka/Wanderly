import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, deleteBlog, addComment } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader/Loader';
import toast from 'react-hot-toast';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { buildServerUrl } from '../config/api';
import '../styles/BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        toast.error('Ошибка загрузки поста');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      try {
        await deleteBlog(id);
        toast.success('Пост удален!');
        navigate('/blogs');
      } catch (error) {
        toast.error('Ошибка при удалении');
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const updatedBlog = await addComment(id, user._id, commentText);
      setBlog(updatedBlog);
      setCommentText('');
      toast.success('Комментарий добавлен');
    } catch (error) {
      toast.error('Ошибка при добавлении комментария');
    }
  };

  if (loading) return <Loader />;
  if (!blog) {
    return (
      <div className="details-bg">
        <div className="glass-panel">
          <h2>Пост не найден</h2>
        </div>
      </div>
    );
  }

  const imageUrl = blog.image?.startsWith('/uploads')
    ? buildServerUrl(blog.image)
    : (blog.image || '/public/hero-bg.jpg');

  return (
    <div className="details-bg">
      <div className="glass-panel">
        <img src={imageUrl} alt={blog.title} className="details-img" />
        <h1 className="details-title">{blog.title}</h1>

        <div className="details-info-bar">
          <div className="info-group">
            <span className="info-item">
              <FaUser /> {blog.author?.name || 'Администратор'}
              {(!blog.author || blog.author?.role === 'admin') && (
                <svg
                  className="admin-check"
                  width="18"
                  height="18"
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
            </span>
            <span className="info-item">
              <FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="admin-controls">
            <button onClick={() => navigate(`/edit-blog/${id}`)} className="blue-btn">
              РЕДАКТИРОВАТЬ
            </button>
            <button onClick={handleDelete} className="blue-btn">
              УДАЛИТЬ
            </button>
          </div>
        )}

        <div className="details-desc">{blog.content}</div>

        <hr className="divider" />
        <h2>Комментарии ({blog.comments?.length || 0})</h2>

        {user ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Напишите комментарий..."
              required
              className="comment-input"
            />
            <button type="submit" className="comment-submit-btn">
              ОТПРАВИТЬ
            </button>
          </form>
        ) : (
          <p className="login-prompt">
            Войдите в аккаунт, чтобы оставить комментарий.
          </p>
        )}

        <div className="comments-list">
          {blog.comments?.map((comment, index) => {
            const userAvatar =
              comment.user?.avatar && comment.user.avatar !== 'default-avatar.jpg'
                ? buildServerUrl(comment.user.avatar)
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

            return (
              <div key={index} className="comment-card">
                <img src={userAvatar} alt="avatar" className="comment-avatar" />
                <div>
                  <h4 className="comment-author">
                    {comment.user?.name || 'Пользователь'}
                    {comment.user?.role === 'admin' && (
                      <svg
                        className="admin-check"
                        width="18"
                        height="18"
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
                  </h4>
                  <p className="comment-text">{comment.text}</p>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;