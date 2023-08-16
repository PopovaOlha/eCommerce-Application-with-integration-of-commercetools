import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Address, registerUser } from '../utils/authUtils'

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [billingAddress, setBillingAddress] = useState<Address>({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  })
  const [shippingAddress, setShippingAddress] = useState<Address>({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  })
  const [error, setError] = useState('')

  const handleRegistration = async () => {
    try {
      const isRegistered = await registerUser(
        firstName,
        lastName,
        login,
        password,
        billingAddress,
        shippingAddress,
        navigate
      )
      if (isRegistered !== null) {
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
      <form onSubmit={handleRegistration}>
        <div>
          <label htmlFor="billingStreet">Адрес для биллинга:</label>
          <input
            type="text"
            id="billingStreet"
            value={billingAddress.streetName}
            onChange={(e) => setBillingAddress({ ...billingAddress, streetName: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="billingCity">Город для биллинга:</label>
          <input
            type="text"
            id="billingCity"
            value={billingAddress.city}
            onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="billingPostalCode">Почтовый индекс для биллинга:</label>
          <input
            type="text"
            id="billingPostalCode"
            value={billingAddress.postalCode}
            onChange={(e) => setBillingAddress({ ...billingAddress, postalCode: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="billingCountry">Страна для биллинга:</label>
          <input
            type="text"
            id="billingCountry"
            value={billingAddress.country}
            onChange={(e) => setBillingAddress({ ...billingAddress, country: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="shippingStreet">Адрес для шиппинга:</label>
          <input
            type="text"
            id="shippingStreet"
            value={shippingAddress.streetName}
            onChange={(e) => setShippingAddress({ ...shippingAddress, streetName: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="shippingCity">Город для шиппинга:</label>
          <input
            type="text"
            id="shippingCity"
            value={shippingAddress.city}
            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="shippingPostalCode">Почтовый индекс для шиппинга:</label>
          <input
            type="text"
            id="shippingPostalCode"
            value={shippingAddress.postalCode}
            onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="shippingCountry">Страна для шиппинга:</label>
          <input
            type="text"
            id="shippingCountry"
            value={shippingAddress.country}
            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
            required
          />
        </div>
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Зарегистрироваться</button>
        </div>
        <div>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </form>
    </div>
  )
}

export default observer(RegistrationPage)
