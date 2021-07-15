import FullCalendar, { EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listsPlugin from '@fullcalendar/list'
import { EventInput } from '@fullcalendar/react'
import { Modal } from '@material-ui/core'
import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import Patient from 'pages/retention/trial/patient'
import { setNoteState, getPatientContacts } from 'store/actions/patient.actions'
import { useDispatch, useSelector } from 'react-redux'
import baseApi from 'utils/axios'
import { REACT_APP_API_HOST } from '../../constants/env'


// import { INITIAL_EVENTS } from "./event-utils";

type Props = {
  list: EventInput[];
  calendarHeight: number;
};

const FullCalendarComponent: React.FC<Props> = ({ list, calendarHeight }) => {

  const dispatch = useDispatch()

  const [state, setState] = React.useState<boolean>(false)
  const [open, setOpen] = React.useState<boolean>(false)
  const [empty, setEmpty] = React.useState<boolean>(false)
  const [modalTitle, setModalTitle] = React.useState(0)
  const [patientName, setPatientName] = React.useState('')
  const [randomDate, setRandomDate] = React.useState('')

  const { studyId } = useSelector((store: any) => store.study)

  const getRandomDate = async (value: number) => {
    const response: IPatientData = await baseApi.get(`${REACT_APP_API_HOST}retention/study/${studyId}/patients/${value}`)
    if (response.data !== null && response.data !== undefined) return response.data.randomizationDate
    else return ''
  }

  const handleEventClick = async (clickInfo: EventClickArg) => {
    const randomDate = await getRandomDate(Number(clickInfo.event.groupId))
    setRandomDate(randomDate)
    setModalTitle(Number(clickInfo.event.groupId))
    setPatientName(clickInfo.event.title)
    setOpen(true)
  }


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

  return (
    <div className="demo-app">
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
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listsPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,title,next',
            center: 'today',
            right: 'timeGridDay,timeGridWeek,dayGridMonth,listYear',
          }}
          buttonText={{
            month: 'MONTH',
            week: 'WEEK',
            day: 'DAY',
            list: 'YEAR',
            today: 'TODAY'
          }}
          eventClick={handleEventClick}
          selectable={false}
          editable={false}
          initialEvents={list}
          locale="en"
          height={calendarHeight}
        />
      </div>
    </div>
  )
}

export default FullCalendarComponent