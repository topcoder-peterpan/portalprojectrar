import {
  SET_TOGGLE_STATE,
  SET_FILTER,
  SET_SORT,
  SET_ARM_FILTER,
  GET_RETENTIONS,
  SET_STUDYID,
  SET_SITEID,
  SET_CARDCLICK,
  GET_RETENTION_STUDY,
  GET_ARM_STUDY_VISIT
} from 'store/types'

import retentionsService from 'services/retentionsService'
import studyService from 'services/studyService'

export const setCardClick = (value: boolean) => (dispatch: any) => {
  dispatch({
    type: SET_CARDCLICK,
    payload: value
  })
}

export const setFilter = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_FILTER,
    payload: value
  })
}

export const setArmFilter = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_ARM_FILTER,
    payload: value
  })
}

export const setSort = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_SORT,
    payload: value
  })
}

export const setToggleState = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_TOGGLE_STATE,
    payload: value
  })
}

export const setStudyId = (value: number) => (dispatch: any) => {
  if (value !== null && value !== undefined) {
    localStorage.setItem('studyId', value.toString())
  }
  dispatch({
    type: SET_STUDYID,
    payload: value
  })
}

export const setSiteId = (siteId: number) => (dispatch: any) => {
  if (siteId) {
    localStorage.setItem('siteId', siteId.toString())
  }
  dispatch({
    type: SET_SITEID,
    payload: siteId
  })
}

export const getRetentions = (value: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_RETENTIONS,
    payload: await retentionsService.getRetentions(value, history)
  })
}

export const getStudyPatientData = (value: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_RETENTION_STUDY,
    payload: await studyService.getStudyData(value, history)
  })
}

export const getArmStudyVisit = (value: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_ARM_STUDY_VISIT,
    payload: await studyService.getStudyArmsData(value, history)
  })
}

