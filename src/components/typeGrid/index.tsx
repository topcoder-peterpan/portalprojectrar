import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Badge, Grid, Modal } from '@material-ui/core'

import RetentionCard from 'components/retentionCard'
import GraphicBar from 'components/graphicBar'
import Patient from 'pages/retention/trial/patient'

import styles from './styles.module.scss'

import { getRetentions, getStudyPatientData, getArmStudyVisit } from 'store/actions/study.actions'
import { setNoteState, getPatientContacts } from 'store/actions/patient.actions'
import { getPatientVisitList, getStudyArms } from 'store/actions/dashboard.actions'

import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import { useHistory } from 'react-router'

import { getArmLabel, studyGroupPatients } from 'utils/study'
import Study from 'types/study'
import { isEmpty } from 'utils/helper'

const TypeGrid: React.FC = () => {

  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()

  const { filterType, studyId, sortType, armFilterType } = useSelector((store: any) => store.study)

  useEffect(() => {
    dispatch(getArmStudyVisit(studyId, history))
    dispatch(getStudyArms(studyId, history))
    dispatch(getRetentions(studyId, history))
    dispatch(getStudyPatientData(studyId, history))
    dispatch(getPatientVisitList(studyId, history))
    setIsLoading(true)
  }, [studyId])

  const { patientVisits } = useSelector((store: any) => store.dashboard)
  const { studyData, studyArmVisit } = useSelector((store: any) => store.study)
  
  const studyRetentionData: IStudyData = studyData
  const studyObject = new Study(studyRetentionData)
  const patientCards: IPatientData[] = patientVisits
  const prepareResult: IPatientData[][] = studyGroupPatients(studyObject, patientCards)
  const strPrepareResult = prepareResult.toString()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [result, setResult] = useState<IPatientData[][]>(prepareResult)
  const [state, setState] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [empty, setEmpty] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = React.useState(0)
  const [patientName, setPatientName] = React.useState('')
  const [randomDate, setRandomDate] = React.useState('')
  const [filterArmId, setFilterArmId] = useState<number>()

  const filterArmLabel = (value: IPatientData[], armFilterType: string) => {
    if (value !== null && value !== undefined) {
      if (armFilterType === 'all') return value
      else {
        return value.filter(item => item.armLabel?.replaceAll(/\s/g, '') === armFilterType)
      }
    }
    else return []
  }

  const getArmId = ( value : string) => {
    if( value === 'all' ) return -1
    else { if ( studyRetentionData.arms !== undefined ) {
      const existElem = studyRetentionData.arms?.findIndex(
        (item: IStudyArm) => item.armLabel.replaceAll(/\s/g, '') === value )
      if ( existElem !== undefined && existElem >= 0 ) return studyRetentionData.arms[existElem].studyARMId
      else return -1
    }
    else return -1}}
    
  useEffect(() => {
    setFilterArmId(getArmId(armFilterType))
  }, [armFilterType])

  useEffect(() => {
    setResult(prepareResult)
    if (state) {
      if (isEmpty(strPrepareResult)) {
        setEmpty(true)
      }
      else setEmpty(false)
      setIsLoading(false)
      prepareResult.forEach((items: IPatientData[], index1: number) => {
        items.forEach((item: IPatientData, index2: number) => {
          prepareResult[index1][index2].armLabel = getArmLabel(item, studyArmVisit)
        })
      })
    }
    setState(true)
  }, [strPrepareResult, dispatch])

  const tempResultArray: IPatientData[][] = []

  useEffect(() => {
    const getPatientData = (value: IPatientData, sortName: string) => {
      if (sortName === 'nextVisitDate') {
        const existElem = value.referralVisits.findIndex(
          (item: IReferralVisitsData) =>
            item.appointmentStatus === 'Scheduled'
        )
        if (existElem >= 0) return value.referralVisits[existElem].appointmentDate
        return ''
      }
      else return value[sortName]
    }
    let sort_name = ''
    switch (sortType) {
    case 'apptDate':
      sort_name = 'nextVisitDate'
      break
    case 'IVRS':
      sort_name = 'ivrno'
      break
    case 'name':
      sort_name = 'firstName'
      break
    case 'source':
      sort_name = 'owner'
      break
    default:
      sort_name = 'firstName'
      break
    }
    result.forEach((items: IPatientData[], index: number) => {
      const tempArray = items.sort((first, second) => {
        if (getPatientData(first, sort_name) > getPatientData(second, sort_name)) return 1
        else if (getPatientData(first, sort_name) < getPatientData(second, sort_name)) return -1
        return 0
      })
      tempResultArray[index] = tempArray
    })
    setResult(tempResultArray)
  }, [sortType])

  const handleClose = () => {
    setOpen(false)
    dispatch(setNoteState('table'))
  }

  const body = (
    <div className={styles.modalBody}>
      <div className={styles.modalContent}>
        <Patient onCloseClick={handleClose} patientId={modalTitle} patientName={patientName} randomizationDate={randomDate} />
      </div>
    </div>
  )

  const onClick = (value: number, patientName: string) => {
    setOpen(true)
    dispatch(getPatientContacts(studyId, value, history))
    setModalTitle(value)
    setPatientName(patientName)
  }

  const { patientcontacts } = useSelector((store: any) => store.patient)

  useEffect(() => {
    if (patientcontacts !== null) {
      setRandomDate(patientcontacts.randomizationDate)
    }
  }, [patientcontacts])


  return (
    <div className={styles.root}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      <div className={styles.graphicFlap}>
        <GraphicBar label1={'treatment period'} label2={'follow up period'} />
      </div>
      <div className={styles.body}>
        {(isLoading === true) ?
          <Stack sx={{ width: '100%', color: 'grey.500', paddingTop: '20px' }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack> : (empty === false) ?
            <div className={styles.main}>
              <Grid container >
                <Grid container item lg={9} md={8} sm={6} xs={12}>
                  {studyObject.getRetentionGroups(filterArmId).map((item: string, index: number) => {
                    if (index >= 3) return // only 3 groupe
                    return (
                      <Grid item lg={4} md={6} sm={12} xs={12} key={index}>
                        <div className={styles.content}>
                          <div className={styles.label}>
                            {item}
                          </div>
                          <div>
                            <Badge badgeContent={filterArmLabel(result[index], armFilterType).length} color="primary" />
                          </div>
                        </div>
                        <div className={styles.cardBox}>
                          {(result[index] !== null && result[index] !== undefined) &&
                            filterArmLabel(result[index], armFilterType).map((el: IPatientData, index: number) => (
                              <Grid item xs={12} key={index}>
                                <div className={styles.card}>
                                  <RetentionCard items={el} armData={studyArmVisit} gridType={'nextvisit'} cardClick={() => onClick(el.referralId, el.firstName + ' ' + el.lastName)} />
                                </div>
                              </Grid>
                            ))}
                        </div>
                      </Grid>
                    )
                  })}
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <div className={styles.content}>
                    <div className={styles.label}>
                      {studyObject.getRetentionGroups(filterArmId)[3]}
                    </div>
                    <div>
                      <Badge badgeContent={filterArmLabel(result[3], armFilterType).length} color="primary" />
                    </div>
                  </div>
                  <div className={styles.cardBox}>
                    {(result[3] !== null && result[3] !== undefined) &&
                      filterArmLabel(result[3], armFilterType).map((el: IPatientData, index: number) => (
                        <Grid item xs={12} key={index}>
                          <div className={styles.card}>
                            <RetentionCard items={el} armData={studyArmVisit} gridType={'nextfollowup'} cardClick={() => onClick(el.referralId, el.firstName + ' ' + el.lastName)} />
                          </div>
                        </Grid>
                      ))}
                  </div>
                </Grid>
              </Grid>
              <div className={styles.footer}>
                © CLINICAL TRIAL MEDIA 2021
              </div>
            </div> : <div></div>}
      </div>
    </div>
  )

}
export default TypeGrid
