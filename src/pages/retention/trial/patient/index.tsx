import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Box, Divider, Grid } from '@material-ui/core'

import VerticalStepper from 'components/stepper'
import TabButton from 'components/tabButton'

import PatientContact from './patientContact'
import PatientNote from './patientNote'
import PatientPreQualification from './patientPreQualification'
import PatientHistory from './patientHistory'

import styles from './styles.module.scss'
import { getPatientContacts, getPatientHistoryData, getPatientNoteData, getPatientPreQualificationData } from 'store/actions/patient.actions'
import { useHistory } from 'react-router'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  onCloseClick?: any
  patientId: number
  patientName: string
  randomizationDate?: string
};


const Patient: React.FC<Props> = ({ patientId, patientName, randomizationDate, onCloseClick }) => {

  const history = useHistory()

  const { t } = useTranslation()

  type TabPanelProps = {
    children?: React.ReactNode
    index: any
    value: any
  }

  const [tabIndex, setTabIndex] = useState(0)

  const changeTabIndex = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ height: '100%' }}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    )
  }

  const dispatch = useDispatch()

  const { studyId } = useSelector((store: any) => store.study)

  useEffect(() => {
    dispatch(getPatientContacts(studyId, patientId, history))
    dispatch(getPatientHistoryData(studyId, patientId, history))
    dispatch(getPatientPreQualificationData(studyId, patientId, history))
    dispatch(getPatientNoteData(studyId, patientId, history))
  }, [dispatch])

  const [tabButtonLists, setTabButtonLists] = useState<string[]>([])
  const { patientPreQualificationData } = useSelector((store: any) => store.patient)

  useEffect(() => {
    if (patientPreQualificationData === null || patientPreQualificationData.length === 0) setTabButtonLists(['CONTACT', 'HISTORY', 'NOTES'])
    else setTabButtonLists(['CONTACT', 'PRE-QUALIFICATION', 'HISTORY', 'NOTES'])
  }, [patientPreQualificationData])


  return (
    <div className={styles.root}>
      <div className={styles.header} onClick={onCloseClick}>
        <CloseIcon style={{ color: '#7B91AB' }} />
      </div>
      <Grid container spacing={1} className={styles.content} >
        <Grid item xl={9} lg={8} md={7} sm={6} xs={12} className={styles.leftContent}>
          <div className={styles.header}>
            <div className={styles.label}>
              {t('PATIENT.PATIENT')}
            </div>
            <div className={styles.title}>
              <div className={styles.label}>
                {patientName}
              </div>
              <div className={styles.badgeFlap}>
                RANDOMIZED {randomizationDate?.toString().substr(0, 10)}
              </div>
            </div>
            <div className={styles.tabButtonFlap}>
              <TabButton value={tabIndex} handleChange={changeTabIndex} items={tabButtonLists} />
            </div>
            <div className={styles.dividerFlap} >
              <Divider variant='fullWidth' />
            </div>
          </div>
          <div>
            {
              (patientPreQualificationData !== null && patientPreQualificationData.length !== 0) ?
                <>
                  <TabPanel index={0} value={tabIndex}>
                    <PatientContact />
                  </TabPanel>
                  <TabPanel index={1} value={tabIndex}>
                    <PatientPreQualification />
                  </TabPanel>
                  <TabPanel index={2} value={tabIndex}>
                    <PatientHistory />
                  </TabPanel>
                  <TabPanel index={3} value={tabIndex}>
                    <PatientNote patientId={patientId} studyId={studyId} />
                  </TabPanel>
                </> :
                <>
                  <TabPanel index={0} value={tabIndex}>
                    <PatientContact />
                  </TabPanel>
                  <TabPanel index={1} value={tabIndex}>
                    <PatientHistory />
                  </TabPanel>
                  <TabPanel index={2} value={tabIndex}>
                    <PatientNote patientId={patientId} studyId={studyId} />
                  </TabPanel>
                </>
            }
          </div>
        </Grid>
        <Grid item xl={3} lg={4} md={5} sm={6} xs={12} >
          <VerticalStepper />
        </Grid>
      </Grid>
    </div>
  )
}

export default Patient
