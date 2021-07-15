import React, { useState } from 'react'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Button, TextField } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
import format from 'date-fns/format'

import styles from './styles.module.scss'

type Props = {
  data: IStepperData;
}
// const data = {
//   id: "abc123",
//   type: "VISITCOMPLETE",
//   label: "Was the visit completed?",
//   label_indicator: "1",
//   status: "",
//   parent_id: "abc1234",
//   data: {
//     yes: "Yes",
//     no: "No",
//     yes_radios: ["Schedule Next Visit", "No Longer Interested"],
//     no_radios: ["Reschedule", "No Longer Interested", "Unable to Contact"],
//     date_radios: ["Schedule Next Visit", "Reschedule"],
//     cancel: "Cancel",
//     submit: "Schedule"
//   }
// }

const VisitComplete: React.FC<Props> = ({ data }) => {

  const [toggleButtonState, setToggleButtonState] = useState('')
  const [radioButtonState, setRadioButtonState] = useState('')

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

  const handleToggleButtonChange = (event: React.MouseEvent<HTMLElement>, value: string) => {
    if (value !== null) {
      if (toggleButtonState === '') {
        setToggleButtonState(value)
      }
      else if (toggleButtonState !== value) {
        setToggleButtonState(value)
        setRadioButtonState('')
      }
    }
  }

  const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioButtonState((event.target as HTMLInputElement).value.toString())
  }

  const cancelClick = () => {
    setToggleButtonState('')
    setRadioButtonState('')
  }

  return (
    <div className={styles.root}>
      <div className={styles.label}>
        {data.label}
      </div>
      <div className={styles.toggleButtonFlap}>
        <ToggleButtonGroup size="small" value={toggleButtonState} exclusive onChange={handleToggleButtonChange}>
          <ToggleButton value="yes">
            {data.data?.yes}
          </ToggleButton>
          <ToggleButton value="no">
            {data.data?.no}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {toggleButtonState === 'yes' &&
        <div className={styles.radioButtonFlap}>
          <RadioGroup value={radioButtonState} onChange={handleRadioButtonChange}>
            {data.data?.yes_radios.map((item: string, index: number) => (
              <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
            ))}
          </RadioGroup>
        </div>
      }
      {toggleButtonState === 'no' &&
        <div className={styles.radioButtonFlap}>
          <RadioGroup value={radioButtonState} onChange={handleRadioButtonChange}>
            {data.data?.no_radios.map((item: string, index: number) => (
              <FormControlLabel key={index} value={item} control={<Radio />} label={item} />
            ))}
          </RadioGroup>
        </div>
      }
      {radioButtonState !== '' &&
        <div className={styles.inputDataField}>
          {
            (radioButtonState === data.data?.date_radios[0] || radioButtonState === data.data?.date_radios[1]) ?
              <>
                <div className={styles.datePickerFlap}>
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
                <div className={styles.timePickerFlap}>
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
                <div className={styles.noteTextFlap}>
                  <TextField
                    id="outlined-helperText"
                    placeholder="NOTES (OPTIONAL)"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={6}
                    maxRows={6}
                  />
                </div>
                <div className={styles.bottomButton}>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: '110px', height: '40px' }}
                    //onClick={onClick}
                    >
                      {
                        radioButtonState === data.data?.date_radios[0] ? 'SCEHDULE' : 'RESCHEDULE'
                      }
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ width: '110px', height: '40px' }}
                      onClick={cancelClick}
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
              </>
              : <>
                <div className={styles.noteTextFlap}>
                  <TextField
                    id="outlined-helperText"
                    placeholder="NOTES (OPTIONAL)"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={6}
                    maxRows={6}
                  />
                </div>
                <div className={styles.bottomButton}>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: '110px', height: '40px' }}
                    //onClick={onClick}
                    >
                      SAVE
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ width: '110px', height: '40px' }}
                      onClick={cancelClick}
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
              </>
          }
        </div>
      }
    </div>
  )
}

export default VisitComplete


