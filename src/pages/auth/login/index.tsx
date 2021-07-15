import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import Logo from '../../../assets/imgs/logo_auth.png'
import LoginForm from '../../../components/auth/loginform/LoginForm'
import {APP_VERSION} from '../../../constants/env'
import styles from './styles.module.scss'

const Login: React.FC = () => {

  const [sessionEnded, setSessionEnded] = useState(!!localStorage.getItem('sessionEnded'))
  const { t } = useTranslation()

  const handleModalClose = () => {
    setSessionEnded(false)
    localStorage.removeItem('sessionEnded')
  }

  return (
    <>
      <Dialog
        open={sessionEnded}
        onClose={handleModalClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {t('AUTH.SESSION_EXPIRED_DIALOG')}
        </DialogTitle>
        <DialogContent id='alert-dialog-description'>
          {t('AUTH.SESSION_EXPIRED_DIALOG')}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} autoFocus>
            {t('BUTTON.CONTINUE')}
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={0}>
        <Grid item xs={false} sm={8} className={styles.left_col}>
        </Grid>
        <Grid item xs={12} sm={4} className={styles.right_col}>
          <img src={Logo} alt="logo" width="133" />
          <div className={styles.login_form_div}>
            <LoginForm />
            <div className={styles.version}>{APP_VERSION}</div>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Login
