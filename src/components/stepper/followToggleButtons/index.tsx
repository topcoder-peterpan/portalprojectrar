import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowStepToogleState, setStepToogleState } from 'store/actions/stepper.actions'

const FollowToggleButtons: React.FC = () => {

  const dispatch = useDispatch()

  const { toogleFollowStepButtonState } = useSelector((store: any) => store.stepper)

  const handleChange = (event: React.MouseEvent<HTMLElement>, value: string) => {
    dispatch(setFollowStepToogleState(value))
    dispatch(setStepToogleState(''))
  }

  return (
    <div>
      <ToggleButtonGroup size="small" value={toogleFollowStepButtonState} exclusive onChange={handleChange}>
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

export default FollowToggleButtons
