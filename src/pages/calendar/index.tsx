
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { EventInput } from '@fullcalendar/react'
import { useHistory } from 'react-router'
import MediaQuery from 'react-responsive'

import { Badge, Grid } from '@material-ui/core'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'

import Lists from 'components/list'
import FullCalendarComponent from 'components/fullCalendar'
import { isAfter } from 'date-fns'

import { getPatientVisitList } from 'store/actions/dashboard.actions'
import styles from './styles.module.scss'

const CalendarPage: React.FC = () => {

  const { t } = useTranslation()
  const history = useHistory()

  const dispatch = useDispatch()

  const [displayShowListArray, setDisplayShowListArray] = useState<IVisitListData[]>([])

  const { studyId } = useSelector((store: any) => store.study)

  useEffect(() => {
    dispatch(getPatientVisitList(studyId, history))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyId])

  const { patientVisits } = useSelector((store: any) => store.dashboard)

  useEffect(() => {
    const tempArray: IVisitListData[] = []
    if (patientVisits.length > 0) {
      patientVisits.forEach((items: IPatientData) => {
        const existElem = items.referralVisits.findIndex(
          (item: IReferralVisitsData) =>
            item.appointmentDate !== null && isAfter(new Date(item.appointmentDate), Date.now())
        )
        if (existElem >= 0) {
          tempArray.push({
            'patientId': items.referralId,
            'patientName': `${items.firstName} ${items.lastName}`,
            'visitDate': items.referralVisits[existElem].appointmentDate,
            'currentVisitNumber': items.referralVisits[existElem].visitNumber,
            'prevVisitNumber': existElem - 1 < 0 ? '' : items.referralVisits[existElem - 1].visitNumber,
            'prevVisitIVRS': items.ivrno,
          })
        }
      })

      const Array = tempArray.sort((first, second) => {
        if (first['visitDate'] > second['visitDate']) return 1
        else if (first['visitDate'] < second['visitDate']) return -1
        return 0
      })
      setDisplayShowListArray(Array)
    }
  }, [patientVisits])

  let eventGuid = 0
  const createEventId = () => String(eventGuid++)

  const [calendarData, setCalendarData] = useState<EventInput[]>([])

  useEffect(() => {
    const tempArray: EventInput[] = []
    displayShowListArray.forEach(item => {
      tempArray.push({
        'id': createEventId(),
        'title': item.patientName,
        'start': item.visitDate,
        'groupId': item.patientId.toString(), // using this patient Number
      })
    })
    setCalendarData(tempArray)
  }, [displayShowListArray])

  return (
    <div className={styles.root}>
      {calendarData.length > 0 &&
                <>
                  <MediaQuery minHeight={951}>
                    <FullCalendarComponent list={calendarData} calendarHeight={680} />
                  </MediaQuery>
                  <MediaQuery maxHeight={950} minHeight={801}>
                    <FullCalendarComponent list={calendarData} calendarHeight={530} />
                  </MediaQuery>
                  <MediaQuery maxHeight={800}>
                    <FullCalendarComponent list={calendarData} calendarHeight={500} />
                  </MediaQuery>
                </>
      }
      {calendarData.length <= 0 &&
                <Stack style={{ paddingTop: '70px' }} sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                  <LinearProgress color="inherit" />
                </Stack>
      }
      <div className={styles.footer}>
                © CLINICAL TRIAL MEDIA 2021
      </div>
    </div>
  )
}

export default CalendarPage

