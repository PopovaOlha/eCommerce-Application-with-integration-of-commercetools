import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { TextField, Button, Grid, Container, Typography } from '@mui/material'
import { registerUser } from '../utils/authUtils'
import { Address } from '../types/interfaces'

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
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
    <Container maxWidth="sm">
      <Typography variant="h4">Регистрация нового пользователя</Typography>
      {error && <p className="error">{error}</p>}
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Имя"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Фамилия"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Логин" fullWidth value={login} onChange={(e) => setLogin(e.target.value)} required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Пароль"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Улица"
              fullWidth
              value={addressInfo.streetName}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  streetName: e.target.value,
                })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Город"
              fullWidth
              value={addressInfo.city}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  city: e.target.value,
                })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Почтовый индекс"
              fullWidth
              value={addressInfo.postalCode}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  postalCode: e.target.value,
                })
              }
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Страна"
              fullWidth
              value={addressInfo.country}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  country: e.target.value,
                })
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Область/штат"
              fullWidth
              value={addressInfo.state}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  state: e.target.value,
                })
              }
              required
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleRegistration}>
          Зарегистрироваться
        </Button>
        <div>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </form>
    </Container>
  )
}

export default observer(RegistrationPage)
