import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const loginUser = (email, password) => 
  api.post('/auth/login', { email, password }).then(res => res.data)

export const registerUser = (name, email, password) => 
  api.post('/auth/register', { name, email, password }).then(res => res.data)

export const getCurrentUser = () => 
  api.get('/auth/me').then(res => res.data)

export default api