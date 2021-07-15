import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useDispatch, useSelector } from 'react-redux'
import { setStepRadioState } from 'store/actions/stepper.actions'

type Props = {
  item1: string
  item2: string
}

const RadioButtons: React.FC<Props> = ({ item1, item2 }) => {

  const dispatch = useDispatch()

  const { radioStepButtonState } = useSelector((store: any) => store.stepper)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setStepRadioState((event.target as HTMLInputElement).value))
  }

  return (
    <div>
      <RadioGroup aria-label="gender" onChange={handleChange}>
        {radioStepButtonState === '' &&
          <>
            <FormControlLabel value={item1} control={<Radio />} label={item1} />
            <FormControlLabel value={item2} control={<Radio />} label={item2} />
          </>
        }
        {radioStepButtonState === item1 &&
          <>
            <FormControlLabel value={item1} control={<Radio />} label={item1} />
          </>
        }
        {radioStepButtonState === item2 &&
          <>
            <FormControlLabel value={item2} control={<Radio />} label={item2} />
          </>
        }
      </RadioGroup>
    </div>
  )
}

export default RadioButtons