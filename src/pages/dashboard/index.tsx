import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'

import { isAfter } from 'date-fns'

import { Grid } from '@material-ui/core'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'


import StudyCard from '../../components/card'
import Lists from '../../components/list'

import { getCards, getPatientAllVisitList, getStudyArms } from 'store/actions/dashboard.actions'
import { setCardClick, setStudyId } from 'store/actions/study.actions'
import { AppScheduled } from 'constants/consts'
import Study from '../../types/study'
import styles from './styles.module.scss'


const Dashboard: React.FC = () => {

  const { t } = useTranslation()

  const history = useHistory()

  const dispatch = useDispatch()
  const studiesNumber: number[] = []
  const [displayListArray, setDisplayListArray] = useState<IVisitListData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { studies } = useSelector((store: any) => store.dashboard)

  // TODO Pass id value instead of study title (two studies with same title will break this logic below)
  const onClick = (value: string) => {
    let studyId
    if (studies.length > 0) {
      const index = studies.findIndex((items: Study) => items.studyTitle === value)
      if (index >= 0) {
        studyId = studies[index].id
        const url = studies[index].studyRoute
        history.push(`/study/${url}`)
      }
    }
    if (studyId) {
      dispatch(setStudyId(studyId))
      dispatch(setCardClick(true))
    }
  }

  useEffect(() => {
    if (studies.length > 0)
      studies.forEach((item: Study) => {
        studiesNumber.push(item.id)
      })
    dispatch(getPatientAllVisitList(studiesNumber, history))
  }, [studies])

  const getStudyName = (value: number | undefined | null) => {
    const index = studies.findIndex((items: Study) => items.id === value)
    if (index >= 0) {
      return studies[index].studyTitle
    }
    return ''
  }

  const { cards, patientAllVisits } = useSelector((store: any) => store.dashboard)

  useEffect(() => {
    setIsLoading(true)
    const tempArray: IVisitListData[] = []
    if (patientAllVisits.length > 0 && patientAllVisits !== null && patientAllVisits !== undefined) {
      patientAllVisits.forEach((items: IPatientData) => {
        const existElem = items.referralVisits.findIndex(
          (item: IReferralVisitsData) =>
            item.appointmentStatus === AppScheduled && item.appointmentDate !== null && isAfter(new Date(item.appointmentDate), Date.now())
        )
        if (existElem >= 0) {
          tempArray.push({
            'studyName': getStudyName(items.studyId),
            'patientId': items.referralId,
            'patientName': `${items.firstName} ${items.lastName}`,
            'visitDate': items.referralVisits[existElem].appointmentDate,
            'currentVisitNumber': items.referralVisits[existElem].visitNumber,
            'prevVisitNumber': existElem - 1 < 0 ? '' : items.referralVisits[existElem - 1].visitLabel,
            'prevVisitIVRS': items.ivrno,
          })
        }
      })
      if (tempArray.length === 0) {
        tempArray.push({
          'studyName': 'test',
          'patientId': -1,
          'patientName': 'end',
          'visitDate': 'end',
          'currentVisitNumber': 'end',
          'prevVisitNumber': 'end',
          'prevVisitIVRS': 'end',
        })
      }
    }

    if (tempArray.length > 0 && tempArray[0].patientId > -1) {
      const Array = tempArray.sort((first, second) => {
        if (first['visitDate'] > second['visitDate']) return 1
        else if (first['visitDate'] < second['visitDate']) return -1
        return 0
      })
      setDisplayListArray(Array)
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientAllVisits])

  return (
    <div className={styles.content} >
      <div className={styles.top}>
        <div className={styles.title}>
          {t('CONTENT.ACTIVE_TRIALS')}
        </div>
        <div className={styles.update}>
                    Last Updated July 19, 2021 1:34pm
        </div>
      </div>
      <Grid container spacing={1} justifyContent="space-between" >
        <Grid className={styles.cards} container item lg={9} md={8} sm={6} xs={12} spacing={3}>
          {cards.length > 0 &&
                        cards.map((item: ICardData, index: number) => (
                          <Grid item lg={4} md={6} xs={12} key={index}>
                            <StudyCard data={item} cardClick={() => onClick(item.study)} />
                          </Grid>
                        ))
          }
        </Grid>
        <Grid container item lg={3} md={4} sm={6} xs={12}>
          {
            (isLoading === false && displayListArray.length > 0) &&
                        <Lists lists={displayListArray} />
          }
          {isLoading === true &&
                        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                          <LinearProgress color="inherit" />
                        </Stack>
          }
        </Grid>
      </Grid>
      {
        (isLoading === false && displayListArray.length > 0) &&
                <div className={styles.footer}>
                    © CLINICAL TRIAL MEDIA 2021
                </div>
      }
    </div>
  )
}

export default Dashboard
