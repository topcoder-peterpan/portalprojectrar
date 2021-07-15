import {
  SET_STEP_TOGGLE_STATE,
  SET_FOLLOW_STEP_TOGGLE_STATE,
  SET_STEP_RADIO_STATE,
  GET_STEPPER_VISIT_DATA
} from 'store/types'

import stepperService from 'services/stepperService'

export const setStepToogleState = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_STEP_TOGGLE_STATE,
    payload: value
  })
}

export const setFollowStepToogleState = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_FOLLOW_STEP_TOGGLE_STATE,
    payload: value
  })
}

export const setStepRadioState = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_STEP_RADIO_STATE,
    payload: value
  })
}

export const getStepperVisitData = (history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_STEPPER_VISIT_DATA,
    payload: await stepperService.getStepperVisitData(history)
  })
}
