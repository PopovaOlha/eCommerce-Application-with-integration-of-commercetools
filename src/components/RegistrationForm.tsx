import React, { useState } from 'react'

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleRegistration = () => {
    setEmail('')
    setPassword('')
  }

  const validateEmail = (emailValue: string) => {
    if (!emailValue) {
      setEmailError('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
  }

  const validatePassword = (passwordValue: string) => {
    if (!passwordValue) {
      setPasswordError('Password is required')
    } else if (passwordValue.length < 6) {
      setPasswordError('Password must be at least 6 characters long')
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    validateEmail(email)
    validatePassword(password)

    if (!emailError && !passwordError) {
      handleRegistration()
      // Здесь вызови функцию для отправки данных на сервер Commercetools
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
        <button type="submit">Register</button>
      </div>
    </form>
  )
}

export default RegistrationForm
