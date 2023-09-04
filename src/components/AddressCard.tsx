import { useState } from 'react'
import EditBtn from '../assets/edit.png'

import RemoveBtn from '../assets/remove.png'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from '../api/axios'
import { projectKey } from '../commercetoolsConfig'

interface Props {
  city: string
  country: string
  postalCode: string
  state: string
  streetName: string
  title: string
  addressId: string
  userId: string
  userVersion: number
  handleDelete: () => void
  setUser: (user: object) => void
}

const AddressCard = (props: Props) => {
  const { setUser, userVersion, addressId, city, country, postalCode, state, streetName, title, handleDelete, userId } =
    props

  const [isEdit, setIsEdit] = useState(false)

  const handleEdit = () => {
    setIsEdit(true)
  }

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

  const initialValues = {
    city: city,
    country: country,
    postalCode: postalCode,
    state: state,
    streetName: streetName,
  }

  const validationSchema = Yup.object({
    city: Yup.string(),
    country: Yup.string(),
    postalCode: Yup.string(),
    state: Yup.string(),
    streetName: Yup.string(),
  })

  const handleSubmit = (values: {
    city: string
    country: string
    postalCode: string
    state: string
    streetName: string
  }) => {
    console.log('Values: ', values)

    const payload = {
      version: userVersion,
      actions: [
        {
          action: 'changeAddress',
          addressId: addressId,
          address: {
            city: values.city,
            country: values.country,
            postalCode: values.postalCode,
            state: values.state,
            streetName: values.streetName,
          },
        },
      ],
    }

    axios.post(`/${projectKey}/customers/${userId}`, payload).then((res) => {
      console.log('Update Address REs: ', res)
      setUser(res.data)
      setIsEdit(false)
      notify()
    })
  }

  return (
    <div className="addresses__item">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {(formik) => (
          <>
            <div className="address__header">
              <p className="title address-title">{title}</p>
              <div className="address__action">
                {isEdit && (
                  <div onClick={() => formik.handleSubmit()}>
                    <p className="save-address">Save</p>
                  </div>
                )}
                {!isEdit ? (
                  <div className="edit__btn" onClick={handleEdit}>
                    <img src={EditBtn} alt="edit button" />
                  </div>
                ) : (
                  <div className="cancel-address" onClick={() => setIsEdit(false)}>
                    Cancel
                  </div>
                )}
                <div className="remove__btn" onClick={handleDelete}>
                  <img src={RemoveBtn} alt="remove button" />
                </div>
              </div>
            </div>
            <div className="address__details">
              <div className="address__item">
                <p className="subtitle">City:</p>{' '}
                {isEdit ? (
                  <input name="city" value={formik.values.city} onChange={formik.handleChange} placeholder={city} />
                ) : (
                  <p>{city}</p>
                )}
              </div>
              <div className="address__item">
                <p className="subtitle">Country:</p>{' '}
                {isEdit ? (
                  <input
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    placeholder={country}
                  />
                ) : (
                  <p>{country}</p>
                )}
              </div>
              <div className="address__item">
                <p className="subtitle">Postal code:</p>{' '}
                {isEdit ? (
                  <input
                    name="postalCode"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    placeholder={postalCode}
                  />
                ) : (
                  <p>{postalCode}</p>
                )}
              </div>
              <div className="address__item">
                <p className="subtitle">Street:</p>{' '}
                {isEdit ? (
                  <input name="state" value={formik.values.state} onChange={formik.handleChange} placeholder={state} />
                ) : (
                  <p>{state}</p>
                )}
              </div>
              <div className="address__item">
                <p className="subtitle">Street:</p>{' '}
                {isEdit ? (
                  <input
                    name="street"
                    value={formik.values.streetName}
                    onChange={formik.handleChange}
                    placeholder={streetName}
                  />
                ) : (
                  <p>{streetName}</p>
                )}
              </div>
            </div>
            <div className="checkbox-row">
              <div>
                <input type="checkbox" className="checkbox" id="checkbox1" />
                <label htmlFor="checkbox1">Default Billing Address</label>
              </div>
              <div>
                <input type="checkbox" className="checkbox" id="checkbox2" />
                <label htmlFor="checkbox2">Default Shipping Address</label>
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  )
}

export default AddressCard
