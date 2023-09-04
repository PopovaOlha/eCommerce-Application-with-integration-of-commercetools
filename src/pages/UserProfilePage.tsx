import { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserImg from '../assets/user.png'
import AddBtn from '../assets/add.png'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { projectKey } from '../commercetoolsConfig'
import { get, set } from 'lodash'
import axios from '../api/axios'
import { toast } from 'react-toastify'
import AddressCard from '../components/AddressCard'
import PasswordChangeModal from '../components/ChangePasswordModal'
import '../styles/user-profile.scss'
import AddAddressModal from '../components/AddAddressModal'

interface Address {
  id: string
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
  const [open, setOpen] = useState(false)
  const [openPassword, setopenPassword] = useState(false)

  function notify() {
    return toast.success('Success changes', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

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
    dateOfBirth: Yup.string()
      .test((value) => {
        const date = dayjs(value, 'YYYY-MM-DD', true)
        return date.isValid()
      })
      .length(10),
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
      setEditState(false)
      notify()
    })
  }

  return (
    <div>
      <Header subcategories={[]} />
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
                      <div className="user-input">
                        {formik.errors.firstName && (
                          <p className="error-input" color="red">
                            Error: {formik.errors.firstName}
                          </p>
                        )}
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
                    </div>
                    <div className="user-data__item">
                      <p className="title">Last Name:</p>
                      <div className="user-input">
                        {formik.errors.lastName && (
                          <p className="error-input" color="red">
                            Error: {formik.errors.lastName}
                          </p>
                        )}
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
                    </div>
                    <div className="user-data__item">
                      <p className="title">Date of birth: </p>
                      <div className="user-input">
                        {formik.errors.dateOfBirth && (
                          <p className="error-input" color="red">
                            Error: {formik.errors.dateOfBirth}
                          </p>
                        )}
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
                    </div>
                    <div className="user-data__item">
                      <p className="title">E-mail:</p>
                      <div className="user-input">
                        {formik.errors.email && (
                          <p className="error-input" color="red">
                            Error: {formik.errors.email}
                          </p>
                        )}
                        {editState ? (
                          <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} />
                        ) : (
                          <p>{user?.email}</p>
                        )}
                      </div>
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
                      {!editState && (
                        <button className="profile-button" onClick={() => setopenPassword(true)}>
                          Change password
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </Formik>
            )}
          </div>
        </div>
        <div
          className="add-address"
          onClick={() => {
            setOpen(true)
          }}
        >
          <div className="profile-button add-address__btn">
            <p>Add Address</p>{' '}
            <div className="add-btn">
              <img src={AddBtn} alt="add button" />
            </div>
          </div>
        </div>
        <PasswordChangeModal
          isOpen={openPassword}
          onClose={() => {
            setopenPassword(false)
          }}
          setUser={(user) => setUser(user as User)}
          userId={user?.id as string}
          userVersion={user?.version as number}
        />
        <AddAddressModal
          isOpen={open}
          onClose={() => {
            setOpen(false)
          }}
          userId={user?.id as string}
          userVersion={user?.version as number}
          setUser={(user) => setUser(user as User)}
        />

        <div className="addresses">
          <div className="addresses__list">
            {user?.addresses.map((address) => (
              <AddressCard
                key={address.id}
                userVersion={user?.version}
                userId={user?.id}
                setUser={(user) => setUser(user as User)}
                addressId={address.id}
                title="Address"
                city={address.city as string}
                country={address.country as string}
                postalCode={address.postalCode as string}
                state={address.state as string}
                streetName={address.streetName as string}
                handleDelete={() => {
                  const payload = {
                    version: user.version,
                    actions: [
                      {
                        action: 'removeAddress',
                        addressId: address.id,
                      },
                    ],
                  }
                  axios.post(`${projectKey}/customers/${user.id}`, payload).then((res) => {
                    console.log('Detetion Result: ', res)
                    setUser(res.data)
                  })
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default observer(UserProfilePage)
