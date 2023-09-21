import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { observer } from 'mobx-react-lite'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Typography,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik'
import * as Yup from 'yup'
import { registerUser } from '../utils/authUtils'
import { RegistrationValues } from '../types/interfaces'
import { useRootStore } from '../App'
import Footer from '../components/Footer'
import Header from '../components/Header'

const RegistrationPage: React.FC = () => {
  const rootStore = useRootStore()
  const { authStore } = rootStore
  const [showPassword, setShowPassword] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(false)
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(false)
  const [isSameAsBillingAndShippingAddress, setIsSameAsShippingAddress] = useState(false)
  const navigate = useNavigate()

  const initialValues: RegistrationValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
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
  const pageStyle: React.CSSProperties = {
    background: 'radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)',
    minHeight: 'calc(100vh - 70px - 64px)',
  }
  const backButtonStyle: React.CSSProperties = {
    marginTop: '20px',
    paddingLeft: '25px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#555',
    marginBottom: '1rem',
  }

  const backButtonIconStyle: React.CSSProperties = {
    marginRight: '0.5rem',
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
        values.dateOfBirth.split('-').reverse().join('-'),
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
      } else {
        setShowErrorModal(true)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Last name is required')
      .matches(/^[A-Za-zА-Яа-я\s]+$/, 'Last name must contain only alphabetic characters')
      .test('no-spaces-around', 'Last name cannot start or end with a space', (value) => {
        if (value) {
          return !/^\s|\s$/.test(value)
        }
        return true
      }),
    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[A-Za-zА-Яа-я\s]+$/, 'Last name must contain only alphabetic characters')
      .test('no-spaces-around', 'Last name cannot start or end with a space', (value) => {
        if (value) {
          return !/^\s|\s$/.test(value)
        }
        return true
      }),
    dateOfBirth: Yup.string()
      .required('Birthday is required')
      .matches(/^\d{2}-\d{2}-\d{4}$/, 'Invalid date format (DD-MM-YYYY)')
      .test('is-valid-age', 'You must be at least 18 years old', (value) => {
        if (value) {
          const [day, month, year] = value.split('-').map(Number)
          const birthDate = new Date(year, month - 1, day)
          const today = new Date()
          const age = today.getFullYear() - birthDate.getFullYear()
          const monthDiff = today.getMonth() - birthDate.getMonth()
          const dayDiff = today.getDate() - birthDate.getDate()
          if (age < 18 || age > 100) {
            return false
          }
          if (age === 18) {
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
              return false
            }
          }
          return true
        }
        return false
      }),
    login: Yup.string()
      .required('Email is required')
      .email('Invalid email format')
      .matches(/^\S+$/, 'Email cannot contain spaces')
      .test('no-spaces-around', 'Email cannot start or end with a space', (value) => {
        if (value) {
          return !/^\s|\s$/.test(value)
        }
        return true
      })
      .test('valid-domain', 'Invalid domain format', (value) => {
        if (value) {
          const emailParts = value.split('@')
          if (emailParts.length !== 2) {
            return false
          }
          const [localPart, domain] = emailParts
          if (!localPart || !domain) {
            return false
          }
          const domainParts = domain.split('.')
          if (domainParts.length < 2) {
            return false
          }

          if (domain.startsWith('.') || domain.endsWith('.')) {
            return false
          }

          return true
        }
        return true
      }),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/^(?=.*[0-9])/, 'Password must contain at least one digit (0-9)')
      .matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character (!@#$%^&*)')
      .matches(/[a-z]/, 'Password must contain at least one lowercase Latin letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase Latin letter')
      .matches(/^\S*$/, 'Password should not contain spaces')
      .required('Password is required'),
    shippingAddress: Yup.object().shape({
      streetName: Yup.string().required('Street address is required'),
      city: Yup.string().required('City is required'),
      postalCode: Yup.string().required('Postal code is required'),
      country: Yup.string().required('Country is required'),
      state: Yup.string().required('State is required'),
      isDefault: Yup.boolean(),
    }),
    billingAddress: Yup.object().shape({
      streetName: Yup.string().test('streetName', 'Street address is required for billing', function () {
        if (!isSameAsBillingAndShippingAddress) {
          return this.createError({
            path: 'billingAddress.streetName',
            message: 'Street address is required for billing',
          })
        }
        return true
      }),
      city: Yup.string().test('city', 'City is required for billing', function () {
        if (!isSameAsBillingAndShippingAddress) {
          return this.createError({
            path: 'billingAddress.city',
            message: 'City is required for billing',
          })
        }
        return true
      }),
      postalCode: Yup.string().test('postalCode', 'Postal code is required for billing', function () {
        if (!isSameAsBillingAndShippingAddress) {
          return this.createError({
            path: 'billingAddress.postalCode',
            message: 'Postal code is required for billing',
          })
        }
        return true
      }),
      country: Yup.string().test('country', 'Country is required for billing', function () {
        if (!isSameAsBillingAndShippingAddress) {
          return this.createError({
            path: 'billingAddress.country',
            message: 'Country is required for billing',
          })
        }
        return true
      }),
      state: Yup.string().test('state', 'State is required for billing', function () {
        if (!isSameAsBillingAndShippingAddress) {
          return this.createError({
            path: 'billingAddress.state',
            message: 'State is required for billing',
          })
        }
        return true
      }),
      isDefault: Yup.boolean(),
    }),
  })
  return (
    <div style={pageStyle}>
      <Header subcategories={[]} />
      <Link to="/" style={backButtonStyle}>
        <ArrowBackIcon style={backButtonIconStyle} /> Back to main page
      </Link>
      <Box
        maxWidth={isMobile ? '100%' : '600px'}
        margin="80px auto"
        padding={isMobile ? '16px' : '32px'}
        boxShadow={isMobile ? 'none' : '0px 4px 6px rgba(0, 0, 0, 0.1)'}
        borderRadius="8px"
        bgcolor="white"
      >
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Typography variant="h4" color="#9ba6a5">
              Register New User
            </Typography>
            <Box my={2}>
              <Field name="firstName" as={TextField} label="First Name" fullWidth required />
              <ErrorMessage name="firstName" component="div" className="error" />
            </Box>
            <Box my={2}>
              <Field name="lastName" as={TextField} label="Last Name" fullWidth required />
              <ErrorMessage name="lastName" component="div" className="error" />
            </Box>
            <Box my={2}>
              <Field name="dateOfBirth" as={TextField} label="Birthday" placeholder="DD-MM-YYYY" fullWidth required />
              <ErrorMessage name="dateOfBirth" component="div" className="error" />
            </Box>
            <Box my={2}>
              <Field name="login" as={TextField} label="Email" fullWidth required />
              <ErrorMessage name="login" component="div" className="error" />
            </Box>
            <Box my={2}>
              <Field
                name="password"
                as={TextField}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage name="password" component="div" className="error" />
            </Box>
            <Box my={2}>
              <Typography variant="h5" color="#9ba6a5">
                Shipping Address
              </Typography>
              <Box my={1}>
                <Field name="shippingAddress.streetName" as={TextField} label="Street Address" fullWidth required />
                <ErrorMessage name="shippingAddress.streetName" component="div" className="error" />
              </Box>
              <Box my={1}>
                <Field name="shippingAddress.city" as={TextField} label="City" fullWidth required />
                <ErrorMessage name="shippingAddress.city" component="div" className="error" />
              </Box>
              <Box my={1}>
                <Field name="shippingAddress.postalCode" as={TextField} label="Postal Code" fullWidth required />
                <ErrorMessage name="shippingAddress.postalCode" component="div" className="error" />
              </Box>
              <Box my={1}>
                <FormControl fullWidth required>
                  <InputLabel>Country</InputLabel>
                  <Field name="shippingAddress.country">
                    {({ field }: FieldProps) => (
                      <Select {...field}>
                        <MenuItem value="UA">Ukraine</MenuItem>
                        <MenuItem value="PL">Poland</MenuItem>
                      </Select>
                    )}
                  </Field>
                </FormControl>
              </Box>
              <Box my={1}>
                <Field name="shippingAddress.state" as={TextField} label="State" fullWidth required />
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
                  label="Set as Default Shipping Address"
                  style={{ color: 'red' }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isSameAsBillingAndShippingAddress}
                      onChange={handleSameAsShippingChange}
                      name="isSameAsBillingAndShippingAddress"
                    />
                  }
                  label="Use this address for billing"
                  style={{ color: 'red' }}
                />
              </Box>
            </Box>
            {!isSameAsBillingAndShippingAddress && (
              <Box my={2}>
                <Typography variant="h5" color="#9ba6a5">
                  Billing Address
                </Typography>
                <Box my={1}>
                  <Field name="billingAddress.streetName" as={TextField} label="Street Address" fullWidth required />
                  <ErrorMessage name="billingAddress.streetName" component="div" className="error" />
                </Box>
                <Box my={1}>
                  <Field name="billingAddress.city" as={TextField} label="City" fullWidth required />
                  <ErrorMessage name="billingAddress.city" component="div" className="error" />
                </Box>
                <Box my={1}>
                  <Field name="billingAddress.postalCode" as={TextField} label="Postal Code" fullWidth required />
                  <ErrorMessage name="billingAddress.postalCode" component="div" className="error" />
                </Box>
                <Box my={1}>
                  <FormControl fullWidth required>
                    <InputLabel>Country</InputLabel>
                    <Field name="billingAddress.country">
                      {({ field }: FieldProps) => (
                        <Select {...field}>
                          <MenuItem value="UA">Ukraine</MenuItem>
                          <MenuItem value="PL">Poland</MenuItem>
                        </Select>
                      )}
                    </Field>
                  </FormControl>
                </Box>
                <Box my={1}>
                  <Field name="billingAddress.state" as={TextField} label="State" fullWidth required />
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
                    label="Set as Default Billing Address"
                    style={{ color: 'red' }}
                  />
                </Box>
              </Box>
            )}
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
            <div>
              Already have an account? <Link to="/login">Log In</Link>
            </div>
            <Dialog open={showErrorModal} onClose={() => setShowErrorModal(false)}>
              <DialogTitle>Error</DialogTitle>
              <DialogContent>There is already an existing customer with the provided email</DialogContent>
              <DialogActions>
                <Button onClick={() => setShowErrorModal(false)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Form>
        </Formik>
      </Box>
      <Footer />
    </div>
  )
}
export default observer(RegistrationPage)
