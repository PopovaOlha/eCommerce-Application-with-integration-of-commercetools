import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { authenticateUser } from '../utils/authUtils'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'

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
    <Box p={2}>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <Box my={2}>
          <TextField type="email" id="email" label="Email" value={email} onChange={handleEmailChange} required />
          {emailError && <Typography color="error">{emailError}</Typography>}
        </Box>
        <Box my={2}>
          <TextField
            type="password"
            id="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <Typography color="error">{passwordError}</Typography>}
        </Box>
        <Box my={2}>
          <Button type="submit" variant="contained" color="primary">
            Авторизация
          </Button>
          <span style={{ marginRight: '8px' }} />
          <Link to="/registrations">Зарегистрироваться</Link>
        </Box>
      </form>
    </Box>
  )
}
export default observer(RegistrationForm)
