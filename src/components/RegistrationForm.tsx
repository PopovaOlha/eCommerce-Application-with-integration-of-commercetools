import React, { useState } from 'react'
import { authenticateUser } from '../utils/authUtils'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../App'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'Yup'
import { Formik } from 'formik'

function RegistrationForm() {
  const rootStore = useRootStore()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const Schema = yup.object({
    email: yup.string().email('Not valid email').required('email is required'),
    password: yup.string().min(8, 'min 8 length').required('Password is required'),
  })

  const onSubmit = ({ email, password }) => {
    authenticateUser(email, password, navigate).then((isAuthenticated) => {
      if (isAuthenticated){
        rootStore.userStore.userProfile
        setIsAuthenticated(true)
      } else {
        setError("Error occured")
      }
    }).catch(err => {
      setError("Error occured")
    })
  }
  if (isAuthenticated) {
    console.log(true)
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Schema}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldTouched }) => (
          <>
            {error && <p>error: {error}</p>}
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={values.email}
                onChange={handleChange('email')}
                onBlur={setFieldTouched('email')}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange('password')}
                onBlur={setFieldTouched('password')}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
              <button onClick={handleSubmit}>Авторизация</button>
              <button type="button">
                <Link to="/registrations">Зарегистрироваться</Link>
              </button>
            </div>
          </>
        )}
      </Formik>
    </div>
  )
}

export default observer(RegistrationForm)
