import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { TextField } from '@material-ui/core'
import React from 'react'
import styles from './styles.module.scss'

const Calendar: React.FC = () => {

  const today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(date),
  )

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  return (
    <div className={styles.root}>
      <div className={styles.datePickerFlap}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
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
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={styles.textFieldFlap}>
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
    </div>
  )
}

export default Calendar
