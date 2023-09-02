import { Formik } from 'formik'
import * as Yup from 'yup'
import { Dialog, Button, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material'
import axios from '../api/axios'
import { projectKey } from '../commercetoolsConfig'

interface Props {
  isOpen: boolean
  onClose: () => void
  setUser: (user: object) => void
  userVersion: number
  userId: string
}

interface InitialValues {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

function PasswordChangeModal({ isOpen, onClose, setUser, userId, userVersion }: Props) {
  const initialValues: InitialValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('New password is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm new password is required'),
  })

  const handleSubmit = (values: InitialValues) => {
    const payload = {
      id: userId,
      version: userVersion,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    }

    console.log('Payload: ', payload)
    axios.post(`/${projectKey}/customers/password`, payload).then((res) => {
      console.log('hi')
      setUser(res.data)
      onClose()
    })
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>New Address</DialogTitle>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {(formik) => (
          <>
            <DialogContent>
              <DialogContentText style={{ paddingBottom: 25 }}>Enter your new password</DialogContentText>
              <div>
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentPassword}
                />
                {formik.touched.currentPassword && formik.errors.currentPassword ? (
                  <div className="error">{formik.errors.currentPassword}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="error">{formik.errors.newPassword}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmNewPassword}
                />
                {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
                  <div className="error">{formik.errors.confirmNewPassword}</div>
                ) : null}
              </div>
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => formik.handleSubmit()} disabled={!formik.isValid}>
                  Save
                </Button>
              </DialogActions>
            </DialogContent>
          </>
        )}
      </Formik>
    </Dialog>
  )
}

export default PasswordChangeModal
