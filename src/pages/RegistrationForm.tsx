import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { registerUser } from '../utils/authUtils'
import { Address } from '../types/interfaces'

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [addressInfo, setAddressInfo] = useState<Address>({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
    state: '',
  })

  const handleRegistration = async () => {
    try {
      const isRegistered = await registerUser(firstName, lastName, login, password, addressInfo, navigate)
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
        <label htmlFor="streetName">Улица:</label>
        <input
          type="text"
          id="streetName"
          value={addressInfo.streetName}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              streetName: e.target.value,
            })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="city">Город:</label>
        <input
          type="text"
          id="city"
          value={addressInfo.city}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              city: e.target.value,
            })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="postalCode">Почтовый индекс:</label>
        <input
          type="text"
          id="postalCode"
          value={addressInfo.postalCode}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              postalCode: e.target.value,
            })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="country">Страна:</label>
        <input
          type="text"
          id="country"
          value={addressInfo.country}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              country: e.target.value,
            })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="state">Область/штат:</label>
        <input
          type="text"
          id="state"
          value={addressInfo.state}
          onChange={(e) =>
            setAddressInfo({
              ...addressInfo,
              state: e.target.value,
            })
          }
          required
        />
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
