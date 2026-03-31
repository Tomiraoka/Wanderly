const API_URL = 'http://localhost:5000/api/blogs';

export const getBlogs = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Ошибка загрузки блогов');
  return await response.json();
};

export const getBlogById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Ошибка загрузки поста');
  return await response.json();
};

export const createBlog = async (formData) => {
  const response = await fetch(API_URL, { method: 'POST', body: formData });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка создания поста');
  return data;
};

export const updateBlog = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'PUT', body: formData });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка обновления поста');
  return data;
};

export const deleteBlog = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка удаления поста');
  return data;
};

export const addComment = async (blogId, userId, text) => {
  const response = await fetch(`${API_URL}/${blogId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, text }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка добавления комментария');
  return data;
};