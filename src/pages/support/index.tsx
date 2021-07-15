
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiPhone } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'

import { Divider, Grid } from '@material-ui/core'

import logo from '../../assets/imgs/logo_auth.png'
import styles from './styles.module.scss'

const Support: React.FC = () => {

  const { t } = useTranslation()

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Grid container>
          <Grid item lg={7} md={12} sm={12} xs={12}>
            <div className={styles.leftContent}>
              <div className={styles.logo}>
                <img src={logo} alt={logo} width="137" />
              </div>
              <div className={styles.label}>
                <p>
                                    Clinical Trial Media is a data-driven, global patient recruitment and retention
                                    company with a comprehensive suite of services and solutions, expertly tested
                                    and proven across 1,500 studies. Since 1995, CTM has been a preferred vendor
                                    to sponsors, CRO’s and sites. Our team consists of smart and highly
                                    experienced individuals who are passionate about the patient and site
                                    experience throughout the trial journey.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <div className={styles.rightContent}>
              <div className={styles.contact}>
                <div className={styles.jobLabel}>
                  {t('SUPPORT.SPONSOR')}
                </div>
                <div className={styles.nameLabel}>
                  {t('SUPPORT.STEVE_TYLER')}
                </div>
                <div className={styles.email}>
                  <AiOutlineMail size="25" />
                  <div className={styles.emailLabel}>
                                        steve@chrysanthemum.com
                  </div>
                </div>
                <div className={styles.phone}>
                  <FiPhone size="20" />
                  <div className={styles.phoneLabel}>
                                        (202) 445-7989
                  </div>
                </div>
              </div>
              <div className={styles.divider}>
                <Divider />
              </div>
              <div className={styles.contact}>
                <div className={styles.jobLabel}>
                  {t('SUPPORT.CTM')}
                </div>
                <div className={styles.nameLabel}>
                  {t('SUPPORT.FRANK_DELGUERCIO')}
                </div>
                <div className={styles.email}>
                  <AiOutlineMail size="25" />
                  <div className={styles.emailLabel}>
                                        frank@clinicaltrialmedia.com
                  </div>
                </div>
                <div className={styles.phone}>
                  <FiPhone size="20" />
                  <div className={styles.phoneLabel}>
                                        (123) 456-7980
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Support
