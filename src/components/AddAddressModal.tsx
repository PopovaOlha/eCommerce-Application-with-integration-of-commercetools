import { Button, DialogActions, Dialog, DialogTitle, DialogContentText, DialogContent } from '@mui/material'

import * as Yup from 'yup'
import { Formik } from 'formik'
import { projectKey } from '../commercetoolsConfig'

import axios from '../api/axios'
import { countriesToCodes } from '../utils/countries'

interface Props {
  isOpen: boolean
  onClose: () => void
  userVersion: number
  userId: string
  setUser: (user: object) => void
}

interface SubmitValues {
  city: string
  country: string
  postalCode: string
  streetName: string
  streetNumber: string
}

function AddAddressModal({ isOpen, onClose, userVersion, userId, setUser }: Props) {
  const initialValues = {
    city: '',
    country: '',
    postalCode: '',
    streetName: '',
    streetNumber: '',
  }

  const validationSchema = Yup.object({
    city: Yup.string().required(),
    country: Yup.mixed().oneOf(Object.values(countriesToCodes)).required(),
    postalCode: Yup.string().required(),
    streetName: Yup.string().required(),
    streetNumber: Yup.number().required(),
  })

  const handleSubmit = (values: SubmitValues) => {
    const payload = {
      version: userVersion,
      actions: [
        {
          action: 'addAddress',
          address: {
            city: values.city,
            country: values.country,
            postalCode: values.postalCode,
            streetName: values.streetName,
            streetNumber: values.streetNumber,
          },
        },
      ],
    }

    axios.post(`/${projectKey}/customers/${userId}`, payload).then((res) => {
      setUser(res.data)
      onClose()
    })
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>New Address</DialogTitle>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {(formik) => (
          <>
            <DialogContent>
              <DialogContentText style={{ paddingBottom: 25 }}>Enter your new address information</DialogContentText>
              <div className="address__input">
                <input
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  placeholder="City"
                  type="address"
                />
                <input
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  placeholder="Country"
                  type="address"
                />
                <input
                  name="postalCode"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  placeholder="Postal Code"
                  type="address"
                />
                <input
                  name="streetName"
                  value={formik.values.streetName}
                  onChange={formik.handleChange}
                  placeholder="Street Name"
                  type="address"
                />
                <input
                  name="streetNumber"
                  value={formik.values.streetNumber}
                  onChange={formik.handleChange}
                  placeholder="Street Number"
                  type="address"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={() => formik.handleSubmit()} disabled={!formik.isValid}>
                Save
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  )
}

export default AddAddressModal
