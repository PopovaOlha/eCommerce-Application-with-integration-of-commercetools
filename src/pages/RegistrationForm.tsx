import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { registerUser } from '../utils/authUtils'

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegistration = async () => {
    try {
      const isRegistered = await registerUser(firstName, lastName, login, password)
      if (isRegistered) {
        navigate('/')
      } else {
        setError('Произошла ошибка при регистрации.')
      }
    } catch (error) {
      setError('Произошла ошибка при регистрации.')
    }
  }

  return (
    <div>
      <h2>Регистрация нового пользователя</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label htmlFor="firstName">Имя:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="lastName">Фамилия:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="login">Логин:</label>
        <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <button type="button" onClick={handleRegistration}>
          Зарегистрироваться
        </button>
      </div>
      <div>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>
    </div>
  )
}

export default observer(RegistrationPage)
