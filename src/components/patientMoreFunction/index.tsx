import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@material-ui/core'
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import format from 'date-fns/format'

type Props = {
  type: string;
  modalClose: any;
}

const PatientMoreFunction: React.FC<Props> = ({ type, modalClose }) => {

  let hours = ''
  let minute = ''
  let second = ''
  const today = new Date()

  let time = ''
  if (today.getHours() < 10) hours = '0' + today.getHours()
  else hours = today.getHours().toString()
  if (today.getMinutes() < 10) minute = '0' + today.getMinutes()
  else minute = today.getMinutes().toString()
  if (today.getSeconds() < 10) second = '0' + today.getSeconds()
  else second = today.getSeconds().toString()

  time = format(new Date(today), 'yyyy-MM-dd') + 'T' + hours + ':' + minute + ':' + second

  const [show, setShow] = useState<boolean>(false)

  const onYesClick = () => {
    if (type === 'reschedule') modalClose()
    else setShow(true)
  }

  const onNoClick = () => {
    if (type === 'reschedule') setShow(true)
    else modalClose()
  }

  const onSaveClick = () => {
    modalClose()
  }

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(format(new Date(today), 'yyyy-MM-dd')),
  )

  const [selectedTime, setSelectedTime] = React.useState<Date | null>(
    new Date(time),
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const handleTimeChange = (date: Date | null) => {
    setSelectedTime(date)
  }
  
  return (
    <div className={styles.root}>
      {
        !show &&
        <div className={styles.home}>
          <div className={styles.title}>
            Was this visit complete ?
          </div>
          <div className={styles.button}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '110px', height: '40px', fontSize: '16px', letterSpacing: '1.5px', fontWeight: 500 }}
              onClick={onYesClick}
            >
              YES
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ width: '110px', height: '40px', fontSize: '16px', letterSpacing: '1.5px', fontWeight: 500 }}
              onClick={onNoClick}
            >
              NO
            </Button>
          </div>
        </div>
      }
      {
        show &&
        <div className={styles.content}>
          <div className={styles.title}>
            CHOOSE DATE AND TIME
          </div>
          <div className={styles.dateTimePicker}>
            <div className={styles.datePicker}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  style={{ paddingTop: '5px', fontSize: '12px', fontFamily: 'Roboto', fontWeight: 500 }}
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={styles.timePicker}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  style={{ paddingTop: '5px', fontSize: '12px', fontFamily: 'Roboto', fontWeight: 500 }}
                  value={selectedTime}
                  onChange={handleTimeChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: '100px', height: '40px', fontSize: '16px', letterSpacing: '1.5px', fontWeight: 500 }}
              onClick={onSaveClick}
            >
              SAVE
            </Button>
            <Button
              variant="outlined"
              color="primary"

              style={{ width: '100px', height: '40px', fontSize: '16px', letterSpacing: '1.5px', fontWeight: 500 }}
              onClick={onNoClick}
            >
              CANCEL
            </Button>
          </div>
        </div>
      }
    </div>
  )
}

export default PatientMoreFunction