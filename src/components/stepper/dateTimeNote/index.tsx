import React, { useState } from 'react'

import { Button, TextField } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
import format from 'date-fns/format'

import styles from './styles.module.scss'

const data = {
  id: 'abc123',
  type: 'DATETIMENOTE',
  label: 'Enter Randomization Date',
  label_indicator: '1',
  status: '',//complete
  parent_id: 'abc1234',
  data: {
    cancel: 'Cancel',
    submit: 'Schedule'
  }
}

const DateTimeNote: React.FC = () => {

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

  const onClick = () => {

  }

  const cancelClick = () => {

  }

  return (
    <div className={styles.root}>
      <div className={styles.label}>
        {data.label}
      </div>
      <div className={styles.datePickerFlap}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            style={{ paddingTop: '5px' }}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={styles.timePickerFlap}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            style={{ paddingTop: '5px' }}
            value={selectedTime}
            onChange={handleTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={styles.noteTextFlap}>
        <TextField
          id="outlined-helperText"
          placeholder="NOTES (OPTIONAL)"
          variant="outlined"
          fullWidth
          multiline
          minRows={4}
          maxRows={4}
        />
      </div>
      {/* <div className={styles.bottomButton}>
        <div>
          <Button
            variant="outlined"
            color="primary"
            style={{ width: "110px" }}
            onClick={cancelClick}
          >
            {data.data.cancel}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "110px" }}
            onClick={onClick}
          >
            {data.data.submit}
          </Button>
        </div>
      </div> */}
    </div>
  )
}

export default DateTimeNote


