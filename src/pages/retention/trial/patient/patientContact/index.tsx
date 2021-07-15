import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Button, Grid } from '@mui/material'

import styles from './styles.module.scss'


const PatientContact: React.FC = () => {

  const { patientcontacts } = useSelector((store: any) => store.patient)
  const data: IPatientContactData = patientcontacts

  const { t } = useTranslation()

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.texts}>
          <Grid container spacing={1} >
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.FIRST_NAME')}
                </div>
                <div className={styles.label}>
                  {data.firstName !== null ?
                    <>
                      {data.firstName}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.MIDDLE_NAME')}
                </div>
                <div className={styles.label}>
                  {data.middleName !== null ?
                    <>
                      {data.middleName}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.LAST_NAME')}
                </div>
                <div className={styles.label}>
                  {data.lastName !== null ?
                    <>
                      {data.lastName}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>

                </div>
                <div className={styles.label}>

                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={styles.texts}>
          <Grid container spacing={1}>
            <Grid item lg={3} md={6} sm={12} >
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.ADDRESS')}
                </div>
                <div className={styles.label}>
                  {data.address !== null ?
                    <>
                      {data.address}
                    </> : <div style={{ height: '25px' }}>
                      N/A
                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12} >
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.CITY')}
                </div>
                <div className={styles.label}>
                  {data.city !== null ?
                    <>
                      {data.city}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12} >
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.STATE')}
                </div>
                <div className={styles.label}>
                  {data.state !== null ?
                    <>
                      {data.state}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12} >
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.ZIP')}
                </div>
                <div className={styles.label}>
                  {data.zip !== null ?
                    <>
                      {data.zip}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={styles.texts}>
          <Grid container spacing={1}>
            <Grid item lg={6} md={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.TIMEZONE')}
                </div>
                <div className={styles.label}>
                  {data.timeZone !== null ?
                    <>
                      {data.timeZone}
                    </> : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={6} md={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.PERMISSION?')}
                </div>
                <div className={styles.label}>
                  {data.permissionLeaveMessage !== null ?
                    <>
                      {data.permissionLeaveMessage === true ? 'yes' : 'no'}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={styles.texts}>
          <Grid container spacing={1}>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.HOME_PHONE')}
                </div>
                <div className={styles.label}>
                  {data.homePhoneNumber !== null ?
                    <>
                      {data.homePhoneNumber}
                    </> : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.MOBILE_PHONE')}
                </div>
                <div className={styles.label}>
                  {data.cellPhoneNumber !== null ?
                    <>
                      {data.cellPhoneNumber}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.EMAIL')}
                </div>
                <div className={styles.label}>
                  {data.emailAddress !== null ?
                    <>
                      {data.emailAddress}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.CALLBACK')}
                </div>
                <div className={styles.label}>
                  {data.preferredCallBackTime !== null ?
                    <>
                      {data.preferredCallBackTime}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={styles.texts}>
          <Grid container spacing={1} >
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.PROTOCOL')}
                </div>
                <div className={styles.label}>
                  {data.applicableProtocolNo !== null ?
                    <>
                      {data.applicableProtocolNo}
                    </> : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.CAREGIVER_NAME')}
                </div>
                <div className={styles.label}>
                  {data.careGiversName !== null ?
                    <>
                      {data.careGiversName}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.CAREGIVER_NUMBER')}
                </div>
                <div className={styles.label}>
                  {data.careGiversPhoneNumber !== null ?
                    <>
                      {data.careGiversPhoneNumber}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={6} sm={12}>
              <div className={styles.block}>
                <div className={styles.title}>
                  {t('PATIENT.CAREGIVER_EMAIL')}
                </div>
                <div className={styles.label}>
                  {data.careGiverEmailAddress !== null ?
                    <>
                      {data.careGiverEmailAddress}
                    </>
                    : <div style={{ height: '25px' }}>

                    </div>
                  }
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <Button variant="contained" size="medium" color="primary"
        style={{ height: '45px', borderRadius: '5px', position: 'absolute', bottom: '0px', backgroundColor: '#2C6FB4' }}
      >
        {t('BUTTON.UPDATE_CONTACT_INFO')}
      </Button>
    </div>
  )
}

export default PatientContact
