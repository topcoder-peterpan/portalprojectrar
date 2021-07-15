import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { useDispatch, useSelector } from 'react-redux'
import { setStepRadioState, setStepToogleState } from 'store/actions/stepper.actions'

const ToggleButtons: React.FC = () => {

  const dispatch = useDispatch()

  const { toogleStepButtonState } = useSelector((store: any) => store.stepper)

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    // ssetAlignment(newAlignment);
    dispatch(setStepRadioState(''))
    dispatch(setStepToogleState(newAlignment))
  }

  return (
    <div>
      <ToggleButtonGroup size="small" value={toogleStepButtonState} exclusive onChange={handleChange}>
        <ToggleButton value="yes">
          yes
        </ToggleButton>
        <ToggleButton value="no">
          no
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default ToggleButtons
