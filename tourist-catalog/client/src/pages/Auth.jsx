import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    let success = false
    if (isLogin) {
      success = await login(email, password)
    } else {
      if (password.length < 6) {
        alert('Пароль должен содержать минимум 6 символов')
        setLoading(false)
        return
      }
      success = await register(name, email, password)
    }
    
    setLoading(false)
    if (success) {
      navigate('/')
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-logo">
          <img 
            src="/public/Wanderly.png" 
            alt="Wanderly Logo" 
            className="logo-img"
          />
          <h1 className="wanderly-text">Wanderly</h1>
        </div>

        <h2>{isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Имя"
              disabled={loading}
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            disabled={loading}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Пароль"
            disabled={loading}
          />

          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button type="button" onClick={toggleMode} className="toggle-btn">
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth