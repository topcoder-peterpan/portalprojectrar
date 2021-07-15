import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  CircularProgress,
  TextField,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFormik } from 'formik'

import { useAuth } from '../../../contexts/auth'
import InputField from '../../InputField'
import validationSchema from './schema'
import './style.scss'

function LoginForm() {
  const auth = useAuth()
  const [submitting, setSubmitting] = React.useState(false)
  const { t } = useTranslation()

  const handleSubmit = async (values: { email: string; password: string; }) => {
    setSubmitting(true)
    try {
      await auth.login(values.email, values.password)
    }
    catch (error) {
      setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {!!(auth.error?.message) && (
        <Alert
          variant="filled"
          severity="error"
          style={{ marginBottom: '24px' }}
        >
          {auth.error?.message}
        </Alert>
      )}
      <InputField
        className='inputfield'
        formik={formik}
        name="email"
        label={t('AUTH.EMAIL')}
        placeholder={t('AUTH.EMAIL')}
        inputProps={{
          'data-cy': 'email',
        }}
      />
      <InputField
        className='inputfield'
        formik={formik}
        type="password"
        name="password"
        label={t('AUTH.PASSWORD')}
        placeholder="********"
        inputProps={{
          'data-cy': 'password',
        }}
      />
      <div className="div_auth_btn">
        <Button
          className="btn_signin"
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting || formik.isSubmitting}
        >
          {submitting || formik.isSubmitting ? (
            <CircularProgress size={28} />
          ) : (
            t('AUTH.SIGNIN')
          )}
        </Button>
        <Button
          color='primary'>
          {t('AUTH.FORGOT')}
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
