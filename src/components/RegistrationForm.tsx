import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { authenticateUser } from '../utils/authUtils'
import { Link, useNavigate } from 'react-router-dom'

function RegistrationForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const validateEmail = (emailValue: string) => {
    if (!emailValue) {
      setEmailError('Email обязателен')
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError('Неверный формат email')
    } else {
      setEmailError('')
    }
  }

  const validatePassword = (passwordValue: string) => {
    if (!passwordValue) {
      setPasswordError('Пароль обязателен')
    } else if (passwordValue.length < 6) {
      setPasswordError('Пароль должен содержать не менее 6 символов')
    } else {
      setPasswordError('')
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value
    setEmail(newEmail)
    validateEmail(newEmail)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value
    setPassword(newPassword)
    validatePassword(newPassword)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const isAuthenticated = await authenticateUser(email, password, navigate)
      if (isAuthenticated) {
        setIsAuthenticated(true)
      } else {
        setError('Произошла ошибка при авторизации')
      }
    } catch (error) {
      setError('Произошла ошибка при авторизации')
    }
  }
  if (isAuthenticated) {
    console.log(true)
  }

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} required />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <div>
          <button type="submit">Авторизация</button>
          <Link to="/registrations">Зарегистрироваться</Link>
        </div>
      </form>
    </div>
  )
}

export default observer(RegistrationForm)
