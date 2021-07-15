import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from '../types'
import authService from '../../services/authService'

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI })
}

export const logoutUser = () => (dispatch: any) => {
  dispatch({
    type: SET_UNAUTHENTICATED,
  })
  authService.logout()
}
