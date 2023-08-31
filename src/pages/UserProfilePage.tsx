import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserImg from '../assets/user.png'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { projectKey } from '../commercetoolsConfig'
import { get, set } from 'lodash'
import axios from '../api/axios'
import '../styles/user-profile.scss'

interface Address {
  city: string
  country: string
  postalCode: string
  state: string
  streetName: string
}

interface User {
  id: string
  version: number
  firstName: string
  lastName: string
  dateOfBirth: string
  addresses: Address[]
  email: string
}

const UserProfilePage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [editState, setEditState] = useState(false)

  useEffect(() => {
    const { customer } = JSON.parse(localStorage.getItem('user')!)
    axios.get(`/${projectKey}/customers/${customer?.id}`).then((userData) => {
      console.log('USER_RESPONSE: ', userData)
      setUser(userData?.data)
    })
  }, [])

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-zА-Яа-я\s]+$/, 'Last name must contain only alphabetic characters')
      .test('no-spaces-around', 'Last name cannot start or end with a space', (value) => {
        if (value) {
          return !/^\s|\s$/.test(value)
        }
        return true
      }),
    lastName: Yup.string()
      .matches(/^[A-Za-zА-Яа-я\s]+$/, 'Last name must contain only alphabetic characters')
      .test('no-spaces-around', 'Last name cannot start or end with a space', (value) => {
        if (value) {
          return !/^\s|\s$/.test(value)
        }
        return true
      }),
    dateOfBirth: Yup.date(),
    email: Yup.string().email(),
  })

  const handleEditProfile = () => {
    setEditState(!editState)
  }

  const fieldActionMap = {
    email: 'changeEmail',
    lastName: 'setLastName',
    firstName: 'setFirstName',
    dateOfBirth: 'setDateOfBirth',
  }

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    dateOfBirth: user?.dateOfBirth,
    email: user?.email,
  }

  const handleUserProfileSubmit = (values: {
    firstName: string | undefined
    lastName: string | undefined
    dateOfBirth: string | undefined
    email: string | undefined
  }) => {
    const resultObject = {}
    Object.entries(initialValues)?.map((entry) => {
      const [key, oldVal] = entry
      const newVal = get(values, key)
      if (newVal !== oldVal) {
        set(resultObject, key, newVal)
      }
    })

    const actions = []
    for (const [key, value] of Object.entries(resultObject)) {
      actions.push({
        action: get(fieldActionMap, key),
        [key]: value,
      })
    }

    const payload = {
      version: user?.version,
      actions: actions,
    }

    axios.post(`/${projectKey}/customers/${user?.id}`, payload).then((res) => {
      setUser(res?.data)
    })
  }

  return (
    <div>
      <Header />
      <div className="user-profile__wrapper">
        <div className="user-info">
          <div className="user__block">
            <div className="user-photo">
              <img src={UserImg} alt="user-photo" />
            </div>
          </div>

          <div className="user__data">
            {user && (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleUserProfileSubmit}
              >
                {(formik) => (
                  <div className="user-data__list">
                    <div className="user-data__item">
                      <p className="title">Name:</p>
                      {formik.errors.firstName && <p color="red">Error: {formik.errors.firstName}</p>}
                      {editState ? (
                        <input
                          type="text"
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                        />
                      ) : (
                        <p>{user?.firstName}</p>
                      )}
                    </div>
                    <div className="user-data__item">
                      <p className="title">Last Name:</p>
                      {formik.errors.lastName && <p color="red">Error: {formik.errors.lastName}</p>}
                      {editState ? (
                        <input
                          type="text"
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                        />
                      ) : (
                        <p>{user?.lastName}</p>
                      )}
                    </div>
                    <div className="user-data__item">
                      <p className="title">Date of birth: </p>
                      {formik.errors.dateOfBirth && <p color="red">Error: {formik.errors.dateOfBirth}</p>}
                      {editState ? (
                        <input
                          type="text"
                          name="dateOfBirth"
                          value={formik.values.dateOfBirth}
                          onChange={formik.handleChange}
                        />
                      ) : (
                        <p>{user?.dateOfBirth}</p>
                      )}
                    </div>
                    <div className="user-data__item">
                      <p className="title">E-mail:</p>
                      {formik.errors.email && <p color="red">Error: {formik.errors.email}</p>}
                      {editState ? (
                        <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} />
                      ) : (
                        <p>{user?.email}</p>
                      )}
                    </div>
                    <div className="profile-buttons">
                      {editState && (
                        <button
                          type="submit"
                          className="profile-button save-button"
                          onClick={() => formik.handleSubmit()}
                          disabled={!formik.isValid}
                        >
                          Save Changes
                        </button>
                      )}
                      {editState ? (
                        <button className="profile-button cancel-button" onClick={handleEditProfile}>
                          Cancel
                        </button>
                      ) : (
                        <button className="profile-button" onClick={handleEditProfile}>
                          Edit profile
                        </button>
                      )}
                      {!editState && <button className="profile-button">Change password</button>}
                    </div>
                  </div>
                )}
              </Formik>
            )}
          </div>
        </div>
        <div className="addresses">
          <div className="addresses__list">
            <div className="addresses__item">
              <p className="title address-title">Billing adress</p>
              <div className="adress_list">
                <div className="address__item">
                  <p className="subtitle">City:</p> <p>{user && user?.addresses[0].city}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Country:</p> <p>{user && user?.addresses[0].country}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Postal code:</p> <p>{user && user?.addresses[0].postalCode}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">State:</p> <p>{user && user?.addresses[0].state}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Street:</p> <p>{user && user?.addresses[0].streetName}</p>
                </div>
              </div>
            </div>

            <div className="addresses__item">
              <p className="title address-title">Shipping Address</p>
              <div>
                <div className="address__item">
                  <p className="subtitle">City:</p> <p>{user && user?.addresses[0].city}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Country:</p> <p>{user && user?.addresses[0].country}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Postal code:</p> <p>{user && user?.addresses[0].postalCode}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">State:</p> <p>{user && user?.addresses[0].state}</p>
                </div>
                <div className="address__item">
                  <p className="subtitle">Street:</p> <p>{user && user?.addresses[0].streetName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default observer(UserProfilePage)
