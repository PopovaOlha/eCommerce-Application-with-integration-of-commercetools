import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { authenticateUser } from '../utils/authUtils'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box, Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { useRootStore } from '../App'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email обязателен')
    .email('Некорректный формат email')
    .matches(/^\S+$/, 'Email не может содержать пробелы')
    .test('no-spaces-around', 'Email не может начинаться или заканчиваться на пробел', (value) => {
      if (value) {
        return !/^\s|\s$/.test(value)
      }
      return true
    }),
  password: Yup.string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .matches(/^(?=.*[0-9])/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(/^\S*$/, 'Пароль не может содержать пробелы')
    .required('Пароль обязателен'),
})

interface FormValues {
  email: string
  password: string
}

function RegistrationForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const rootStore = useRootStore()
  const { authStore } = rootStore

  const initialValues: FormValues = {
    email: '',
    password: '',
  }
  console.log(isAuthenticated)

  // const handleLogin = () => {
  //   const authData = JSON.parse(localStorage.getItem('authData')!)
  //   authStore.isAuthenticated
  //   authStore.login()
  //   navigate('/')
  // }

  const handleSubmit = async (values: FormValues) => {
    try {
      const isAuthenticated = await authenticateUser(values.email, values.password, navigate)
      if (isAuthenticated) {
        setIsAuthenticated(true)
        authStore.login()
      } else {
        setError('Произошла ошибка при авторизации')
      }
    } catch (error) {
      setError('Произошла ошибка при авторизации')
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        {error && <Typography color="error">{error}</Typography>}
        <Box my={2}>
          <Field name="email">
            {({ field }: FieldProps<string>) => <TextField {...field} type="email" id="email" label="Email" required />}
          </Field>
          <ErrorMessage name="email" component="div" className="error" />
        </Box>
        <Box my={2}>
          <Field
            name="password"
            as={TextField}
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} onMouseDown={(e) => e.preventDefault()}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ErrorMessage name="password" component="div" className="error" />
        </Box>
        <Box my={2}>
          <Button type="submit" variant="contained" color="primary">
            Авторизация
          </Button>
          <span style={{ marginRight: '8px' }} />
          <Link to="/registrations">Зарегистрироваться</Link>
        </Box>
      </Form>
    </Formik>
  )
}

export default observer(RegistrationForm)
