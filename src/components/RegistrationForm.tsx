import React, { useState } from 'react'
import { authenticateUser, registerUser } from '../utils/authUtils'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../App'

function RegistrationForm() {
  const rootStore = useRootStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

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

  const handleRegistration = async () => {
    try {
      const isRegistered = await registerUser(email, password)
      if (isRegistered) {
        rootStore.userStore.setTokenAndProfile
      } else {
        console.log('error')
      }
    } catch (error) {
      // Обработка ошибки регистрации.
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
      const isAuthenticated = await authenticateUser(email, password)
      if (isAuthenticated) {
        // Успешная аутентификация: выполнить действия.
      } else {
        console.log('error')
      }
    } catch (error) {
      // Обработка ошибки аутентификации.
    }
  }

  return (
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
        <button type="submit">Войти</button>
        <button type="button" onClick={handleRegistration}>
          Зарегистрироваться
        </button>
      </div>
    </form>
  )
}

export default observer(RegistrationForm)
