import React, { useState, useEffect, useRef } from 'react'

import TextField from '@mui/material/TextField'
import { Button, Divider } from '@material-ui/core'

import { colorType } from 'constants/colors'
import styles from './styles.module.scss'

import circle_logo from 'assets/imgs/circle_logo.png'
import steth from 'assets/imgs/steth.png'

const Profile: React.FC = () => {
  const profileData = JSON.parse(localStorage.getItem('userData') || '')
  const [avatar, setAvatar] = useState(steth)

  useEffect(() => {
    if (profileData.email.includes('clinicaltrialmedia.com')) {
      setAvatar(circle_logo)
    }
  }, [profileData.email])

  const getFileUrl = (event: any) => {
    if (event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0])
      setAvatar(src)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        User Profile
      </div>
      <Divider />
      <div className={styles.content}>
        <label className={styles.avatar}>
          {/* TODO: Image upload feature is disabled for now du to no backend api is ready
          ========
          <input accept="image/*" type='file' onChange={(e) => {getFileUrl(e)}} style={{ display:'none' }}/>
          =======*/}
          <div className={styles.image}>
            <img src={avatar} alt="logo1" width={'130px'} height={'130px'} style={{ cursor: 'pointer', borderRadius: '200px' }} />
          </div>
        </label>
        <div className={styles.textField}>
          <div className={styles.inputField}>
            <div className={styles.input}>
              <TextField id="standard-basic" label="User Id" variant="standard" defaultValue={profileData.userId} disabled />
            </div>
            <div className={styles.input}>
              <TextField id="standard-basic" label="User Type" variant="standard" defaultValue={profileData.userType} disabled />
            </div>
          </div>
          <div className={styles.inputField}>
            <div className={styles.input}>
              <TextField id="standard-basic" label="User Name" variant="standard" defaultValue={profileData.userName} disabled />
            </div>
            <div className={styles.input} >
              <TextField id="standard-basic" label="Email" variant="standard" defaultValue={profileData.email} disabled />
            </div>
          </div>
          <div className={styles.inputField}>
            <div className={styles.input} >
              <TextField id="standard-basic" label="First Name" variant="standard" defaultValue={profileData.firstName} disabled />
            </div>
            <div className={styles.input} >
              <TextField id="standard-basic" label="Last Name" variant="standard" defaultValue={profileData.lastName} disabled />
            </div>
          </div>
          <div className={styles.inputField}>
            <div className={styles.input} >
              <TextField id="standard-basic" label="Phone Number" variant="standard" defaultValue={profileData.phoneNumber} disabled />
            </div>
            <div className={styles.input} >
              <TextField id="standard-basic" label="Associated Site" variant="standard" defaultValue={profileData.associatedSite} disabled />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          variant="contained"
          color="primary"
          style={{ width: '200px', backgroundColor: colorType.Red, fontFamily: 'Roboto' }}
        >
          Reset Password
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ width: '110px', fontFamily: 'Roboto' }}
        >
          Update
        </Button>
      </div>
    </div>
  )
}

export default Profile
