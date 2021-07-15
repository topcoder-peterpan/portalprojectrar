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
  type: 'DATE',
  label: 'Enter Randomization Date',
  label_indicator: '1',
  status: 'complete',//complete
  parent_id: 'abc1234',
  data: null
}

const DateWidget: React.FC = () => {

  const today = new Date()

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(format(new Date(today), 'yyyy-MM-dd')),
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
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
      <div className={styles.bottomButton}>
        <div>
          <Button
            variant="outlined"
            color="primary"
            style={{ width: '110px' }}
            onClick={cancelClick}
          >
            CANCEL
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ width: '110px' }}
            onClick={onClick}
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DateWidget


