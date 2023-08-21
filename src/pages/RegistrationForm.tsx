import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Typography, Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { registerUser } from '../utils/authUtils'
import { RegistrationValues } from '../types/interfaces'
import { useRootStore } from '../App'

const RegistrationPage: React.FC = () => {
  const rootStore = useRootStore()
  const { authStore } = rootStore
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(false)
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(false)
  const [isSameAsBillingAndShippingAddress, setIsSameAsShippingAddress] = useState(false)
  const navigate = useNavigate()

  const initialValues: RegistrationValues = {
    firstName: '',
    lastName: '',
    login: '',
    password: '',
    shippingAddress: {
      streetName: '',
      city: '',
      postalCode: '',
      country: '',
      state: '',
      isDefault: false,
    },
    billingAddress: {
      streetName: '',
      city: '',
      postalCode: '',
      country: '',
      state: '',
      isDefault: false,
    },
    defaultAddress: false,
  }

  const handleShippingDefaultChange = () => {
    setIsDefaultShippingAddress(!isDefaultShippingAddress)
  }

  const handleBillingDefaultChange = () => {
    setIsDefaultBillingAddress(!isDefaultBillingAddress)
  }
  const handleSameAsShippingChange = () => {
    setIsSameAsShippingAddress(!isSameAsBillingAndShippingAddress)
    //  if (!isSameAsBillingAndShippingAddress) {
    //    setIsDefaultBillingAddress(false) // Сбрасываем состояние "сделать адрес платежа дефолтным"
    //  }
  }

  const handleSubmit = async (values: RegistrationValues) => {
    try {
      const shippingAddress = {
        streetName: values.shippingAddress.streetName,
        city: values.shippingAddress.city,
        postalCode: values.shippingAddress.postalCode,
        country: values.shippingAddress.country,
        state: values.shippingAddress.state,
      }
      let billingAddress = { ...shippingAddress }
      if (!isSameAsBillingAndShippingAddress) {
        // Только если чекбокс не выбран, создаем отдельный адрес для платежа
        billingAddress = {
          streetName: values.billingAddress.streetName,
          city: values.billingAddress.city,
          postalCode: values.billingAddress.postalCode,
          country: values.billingAddress.country,
          state: values.billingAddress.state,
        }
      }
      const isRegistered = await registerUser(
        values.firstName,
        values.lastName,
        values.login,
        values.password,
        [shippingAddress, billingAddress],
        isDefaultShippingAddress,
        isDefaultBillingAddress,
        isSameAsBillingAndShippingAddress,
        navigate
      )

      if (isRegistered) {
        authStore.login()
      }
    } catch (error) {
      console.error(error)
    }
  }
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Имя обязательно'),
    lastName: Yup.string().required('Фамилия обязательна'),
    login: Yup.string().required('Логин обязателен'),
    password: Yup.string().min(6, 'Пароль должен содержать не менее 6 символов').required('Пароль обязателен'),
    shippingAddress: Yup.object().shape({
      streetName: Yup.string().required('Улица для доставки обязательна'),
      city: Yup.string().required('Город для доставки обязателен'),
      postalCode: Yup.string().required('Почтовый индекс для доставки обязателен'),
      country: Yup.string().required('Страна для доставки обязательна'),
      state: Yup.string().required('Область/штат для доставки обязателен'),
      isDefault: Yup.boolean(),
    }),
    billingAddress: Yup.object().shape({
      streetName: Yup.string().test('streetName', 'Улица для платежа обязательна', function () {
        const { isSameAsBillingAndShippingAddress, shippingAddress } = this.parent
        if (isSameAsBillingAndShippingAddress && shippingAddress) {
          return this.createError({
            path: 'billingAddress.streetName',
            message: 'Улица для платежа обязательна',
          })
        }
        return true
      }),
      city: Yup.string().test('city', 'Город для платежа обязателен', function () {
        const { isSameAsBillingAndShippingAddress, shippingAddress } = this.parent
        if (isSameAsBillingAndShippingAddress && shippingAddress) {
          return this.createError({
            path: 'billingAddress.city',
            message: 'Город для платежа обязателен',
          })
        }
        return true
      }),
      postalCode: Yup.string().test('postalCode', 'Почтовый индекс для платежа обязателен', function () {
        const { isSameAsBillingAndShippingAddress, shippingAddress } = this.parent
        if (isSameAsBillingAndShippingAddress && shippingAddress) {
          return this.createError({
            path: 'billingAddress.postalCode',
            message: 'Почтовый индекс для платежа обязателен',
          })
        }
        return true
      }),
      country: Yup.string().test('country', 'Страна для платежа обязательна', function () {
        const { isSameAsBillingAndShippingAddress, shippingAddress } = this.parent
        if (isSameAsBillingAndShippingAddress && shippingAddress) {
          return this.createError({
            path: 'billingAddress.country',
            message: 'Страна для платежа обязательна',
          })
        }
        return true
      }),
      state: Yup.string().test('state', 'Область/штат для платежа обязателен', function () {
        const { isSameAsBillingAndShippingAddress, shippingAddress } = this.parent
        if (isSameAsBillingAndShippingAddress && shippingAddress) {
          return this.createError({
            path: 'billingAddress.state',
            message: 'Область/штат для платежа обязателен',
          })
        }
        return true
      }),
      isDefault: Yup.boolean(),
    }),
  })
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <Typography variant="h4">Регистрация нового пользователя</Typography>
        <Box my={2}>
          <Field name="firstName" as={TextField} label="Имя" fullWidth required />
          <ErrorMessage name="firstName" component="div" className="error" />
        </Box>
        <Box my={2}>
          <Field name="lastName" as={TextField} label="Фамилия" fullWidth required />
          <ErrorMessage name="lastName" component="div" className="error" />
        </Box>
        <Box my={2}>
          <Field name="login" as={TextField} label="Логин" fullWidth required />
          <ErrorMessage name="login" component="div" className="error" />
        </Box>
        <Box my={2}>
          <Field name="password" as={TextField} label="Пароль" type="password" fullWidth required />
          <ErrorMessage name="password" component="div" className="error" />
        </Box>
        <Box my={2}>
          <Typography variant="h5">Адрес доставки</Typography>
          <Box my={1}>
            <Field name="shippingAddress.streetName" as={TextField} label="Улица для доставки" fullWidth required />
            <ErrorMessage name="shippingAddress.streetName" component="div" className="error" />
          </Box>
          <Box my={1}>
            <Field name="shippingAddress.city" as={TextField} label="Город для доставки" fullWidth required />
            <ErrorMessage name="shippingAddress.city" component="div" className="error" />
          </Box>
          <Box my={1}>
            <Field
              name="shippingAddress.postalCode"
              as={TextField}
              label="Почтовый индекс для доставки"
              fullWidth
              required
            />
            <ErrorMessage name="shippingAddress.postalCode" component="div" className="error" />
          </Box>
          <Box my={1}>
            <Field name="shippingAddress.country" as={TextField} label="Страна для доставки" fullWidth required />
            <ErrorMessage name="shippingAddress.country" component="div" className="error" />
          </Box>
          <Box my={1}>
            <Field name="shippingAddress.state" as={TextField} label="Область/штат для доставки" fullWidth required />
            <ErrorMessage name="shippingAddress.state" component="div" className="error" />
          </Box>
          <Box my={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDefaultShippingAddress}
                  onChange={handleShippingDefaultChange}
                  name="isDefaultShippingAddress"
                />
              }
              label="Сделать адрес доставки дефолтным"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSameAsBillingAndShippingAddress}
                  onChange={handleSameAsShippingChange}
                  name="isSameAsBillingAndShippingAddress"
                />
              }
              label="Сделать адрес доставки и адресом платежа"
            />
          </Box>
        </Box>
        {!isSameAsBillingAndShippingAddress && (
          <Box my={2}>
            <Typography variant="h5">Адрес платежа</Typography>
            <Box my={1}>
              <Field name="billingAddress.streetName" as={TextField} label="Улица для платежа" fullWidth required />
              <ErrorMessage name="billingAddress.streetName" component="div" className="error" />
            </Box>
            <Box my={1}>
              <Field name="billingAddress.city" as={TextField} label="Город для платежа" fullWidth required />
              <ErrorMessage name="billingAddress.city" component="div" className="error" />
            </Box>
            <Box my={1}>
              <Field
                name="billingAddress.postalCode"
                as={TextField}
                label="Почтовый индекс для платежа"
                fullWidth
                required
              />
              <ErrorMessage name="billingAddress.postalCode" component="div" className="error" />
            </Box>
            <Box my={1}>
              <Field name="billingAddress.country" as={TextField} label="Страна для платежа" fullWidth required />
              <ErrorMessage name="billingAddress.country" component="div" className="error" />
            </Box>
            <Box my={1}>
              <Field name="billingAddress.state" as={TextField} label="Область/штат для платежа" fullWidth required />
              <ErrorMessage name="billingAddress.state" component="div" className="error" />
            </Box>
            <Box my={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDefaultBillingAddress}
                    onChange={handleBillingDefaultChange}
                    name="isDefaultBillingAddress"
                  />
                }
                label="Сделать адрес платежа дефолтным"
              />
            </Box>
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary">
          Зарегистрироваться
        </Button>
        <div>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </Form>
    </Formik>
  )
}

export default observer(RegistrationPage)
