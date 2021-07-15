import {
  GET_CARDS,
  GET_LISTS,
  GET_PATIENT_ALL_VISITS,
  GET_PATIENT_VISITS,
  GET_SITES,
  GET_SITE_STUDIES,
  GET_STUDIES,
  GET_STUDY_ARMS,
  SET_USER_DATA,
} from 'store/types'

import cardsService from 'services/cardsService'
import listService from 'services/listService'
import studyService from 'services/studyService'
import patientVisitListService from 'services/patientVisitListService'
import patientListService from 'services/patientListService'
import siteService from 'services/siteService'

export const setUserName = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_USER_DATA,
    payload: value
  })
}

export const getCards = (history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_CARDS,
    payload: await cardsService.getCards(history)
  })
}

export const getLists = (history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_LISTS,
    payload: await listService.getLists(history)
  })
}

export const getPatientAllVisitList = (studies: number[], history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_PATIENT_ALL_VISITS,
    payload: await patientVisitListService.getAllPatientsData(studies, history)
  })
}

export const getPatientVisitList = (studyId: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_PATIENT_VISITS,
    payload: await patientListService.getPatientsData(studyId, history)
  })
}

export const getStudies = (history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_STUDIES,
    payload: await studyService.getStudies(history)
  })
}

export const getSites = (userId: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_SITES,
    payload: await siteService.getSites(userId, history)
  })
}

export const getSiteStudies = (siteId: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_SITE_STUDIES,
    payload: await siteService.getSiteStudies(siteId, history)
  })
}

export const getStudyArms = (studyId: number, history: any) => async (dispatch: any) => {
  const arms = await studyService.getStudyArms(studyId, history)
  // Merge the study arm visits into the studies data provider
  for (let i = 0; i < arms.length; i++) {
    const arm = arms[i]
    arm.visits = await studyService.getStudyArmVisits(arm.studyARMId, studyId, history)
  }
  dispatch({
    type: GET_STUDY_ARMS,
    payload: { studyId, arms }
  })
}
