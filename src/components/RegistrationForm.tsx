import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { authenticateUser } from '../utils/authUtils'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { useRootStore } from '../App'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(/^\S+$/, 'Email should not contain spaces')
    .test('no-spaces-around', 'Email should not start or end with space', (value) => {
      if (value) {
        return !/^\s|\s$/.test(value)
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
})

interface FormValues {
  email: string
  password: string
}

function RegistrationForm() {
  const navigate = useNavigate()
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const rootStore = useRootStore()
  const { authStore } = rootStore

  const initialValues: FormValues = {
    email: '',
    password: '',
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      const isAuthenticated = await authenticateUser(values.email, values.password, navigate)
      if (isAuthenticated) {
        setIsAuthenticated(true)
        authStore.login()
      } else {
        setShowErrorModal(true)
        setError('An error occurred during authentication')
      }
    } catch (error) {
      setError('An error occurred during authentication')
    }
  }
  console.log(isAuthenticated)

  return (
    <Box>
      <div></div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          {error && <Typography color="error">{error}</Typography>}
          <Box my={2}>
            <Field name="email">
              {({ field }: FieldProps<string>) => (
                <TextField
                  {...field}
                  type="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  size="small"
                />
              )}
            </Field>
            <ErrorMessage name="email" component="div" className="error" />
          </Box>
          <Box my={2}>
            <Field
              name="password"
              as={TextField}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              size="small"
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log In
            </Button>
            <Box my={1} display="flex" justifyContent="center">
              <Link to="/registrations" style={{ color: '#1976D2', textDecoration: 'none', fontSize: '14px' }}>
                Register
              </Link>
            </Box>
          </Box>
          <Dialog open={showErrorModal} onClose={() => setShowErrorModal(false)}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>Account with the given credentials not found.</DialogContent>
            <DialogActions>
              <Button onClick={() => setShowErrorModal(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      </Formik>
    </Box>
  )
}

export default observer(RegistrationForm)
