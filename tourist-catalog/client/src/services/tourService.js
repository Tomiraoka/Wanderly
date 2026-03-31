const API_URL = 'http://localhost:5000/api/tours';

export const getTours = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Ошибка загрузки туров');
  return await response.json();
};

export const getTourById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Ошибка загрузки тура');
  return await response.json();
};

export const createTour = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: formData, 
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка создания тура');
  return data;
};

export const updateTour = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка обновления тура');
  return data;
};

export const deleteTour = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка удаления тура');
  return data;
};

export const addComment = async (tourId, userId, text) => {
  const response = await fetch(`${API_URL}/${tourId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, text }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка добавления комментария');
  return data;
};