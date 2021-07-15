import {
  SET_STEP_TOGGLE_STATE,
  SET_STEP_RADIO_STATE,
  SET_FOLLOW_STEP_TOGGLE_STATE,
  GET_STEPPER_VISIT_DATA
} from 'store/types'

interface IInitialState {
  toogleStepButtonState: string,
  toogleFollowStepButtonState: string,
  radioStepButtonState: string,
  stepperVisitData: [],
  stepNowState: number
}

const initialState: IInitialState = {
  toogleStepButtonState: '',
  radioStepButtonState: '',
  toogleFollowStepButtonState: '',
  stepperVisitData: [],
  stepNowState: 10
}

export default function (state: IInitialState = initialState, action: any) {
  switch (action.type) {
  case SET_STEP_TOGGLE_STATE:
    return {
      ...state,
      toogleStepButtonState: action.payload
    }
  case SET_FOLLOW_STEP_TOGGLE_STATE:
    return {
      ...state,
      toogleFollowStepButtonState: action.payload
    }
  case SET_STEP_RADIO_STATE:
    return {
      ...state,
      radioStepButtonState: action.payload
    }
  case GET_STEPPER_VISIT_DATA:
    return {
      ...state,
      stepperVisitData: action.payload
    }
  default:
    return state
  }
}

