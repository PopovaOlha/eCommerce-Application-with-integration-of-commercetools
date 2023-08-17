import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { TextField, Button, Grid, Container, Typography } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { registerUser } from '../utils/authUtils'
import { FormValues } from '../types/interfaces'

const validationSchema = Yup.object({
  firstName: Yup.string().required('Имя обязательно'),
  lastName: Yup.string().required('Фамилия обязательна'),
  login: Yup.string().required('Логин обязателен'),
  password: Yup.string().min(6, 'Пароль должен содержать не менее 6 символов').required('Пароль обязателен'),
  streetName: Yup.string().required('Улица обязательна'),
  city: Yup.string().required('Город обязателен'),
  postalCode: Yup.string().required('Почтовый индекс обязателен'),
  country: Yup.string().required('Страна обязательна'),
  state: Yup.string().required('Область/штат обязательна'),
})

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    login: '',
    password: '',
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
    state: '',
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      const isRegistered = await registerUser(
        values.firstName,
        values.lastName,
        values.login,
        values.password,
        {
          streetName: values.streetName,
          city: values.city,
          postalCode: values.postalCode,
          country: values.country,
          state: values.state,
        },
        navigate
      )
      if (isRegistered) {
        navigate('/')
      } else {
        console.error('Произошла ошибка при регистрации.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Регистрация нового пользователя</Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field as={TextField} label="Имя" fullWidth name="firstName" required />
              <ErrorMessage name="firstName" component="div" className="error" />
            </Grid>
            <Grid item xs={6}>
              <Field as={TextField} label="Фамилия" fullWidth name="lastName" required />
              <ErrorMessage name="lastName" component="div" className="error" />
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} label="Логин" fullWidth name="login" required />
              <ErrorMessage name="login" component="div" className="error" />
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} label="Пароль" fullWidth name="password" type="password" required />
              <ErrorMessage name="password" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} label="Улица" fullWidth name="streetName" required />
              <ErrorMessage name="streetName" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} label="Город" fullWidth name="city" required />
              <ErrorMessage name="city" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} label="Почтовый индекс" fullWidth name="postalCode" required />
              <ErrorMessage name="postalCode" component="div" className="error" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field as={TextField} label="Страна" fullWidth name="country" required />
              <ErrorMessage name="country" component="div" className="error" />
            </Grid>
            <Grid item xs={12}>
              <Field as={TextField} label="Область/штат" fullWidth name="state" required />
              <ErrorMessage name="state" component="div" className="error" />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained">
            Зарегистрироваться
          </Button>
          <div>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </div>
        </Form>
      </Formik>
    </Container>
  )
}

export default observer(RegistrationPage)
