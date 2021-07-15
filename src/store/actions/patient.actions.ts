import {
  GET_PATIENT_CONTACT,
  GET_PATIENT_NOTE_DATA,
  POST_PATIENT_NOTE_DATA,
  GET_PATIENT_HISTORY_DATA,
  GET_PATIENT_PREQUALIFICATION_DATA,
  SET_NOTE_STATE,
} from 'store/types'

import patientContactService from 'services/patientContactService'
import patientNoteDataService from 'services/patientNoteDataService'
import patientPreQualificationService from 'services/patientPreQualificationService'
import patientHistoryService from 'services/patientHistoryService'

export const getPatientContacts = (studyId: number, patientId: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_PATIENT_CONTACT,
    payload: await patientContactService.getPatientContacts(studyId, patientId, history)
  })
}

export const getPatientNoteData = (studyId: number, patientId: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_PATIENT_NOTE_DATA,
    payload: await patientNoteDataService.getPatientNoteData(studyId, patientId, history)
  })
}

export const postPatientNoteData = (studyId: number, patientId: number, noteSubject: string, noteText: string, isPrivate: boolean, history: any) => async (dispatch: any) => {
  dispatch({
    type: POST_PATIENT_NOTE_DATA,
    payload: await patientNoteDataService.postPatientNoteData(studyId, patientId, noteSubject, noteText, isPrivate, history)
  })
}

export const getPatientPreQualificationData = (studyId: number, patientId: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_PATIENT_PREQUALIFICATION_DATA,
    payload: await patientPreQualificationService.getPatientPreQualification(studyId, patientId, history)
  })
}

export const getPatientHistoryData = (studyId: number, patientId: number, history: any) => async (dispatch: any) => {
  dispatch({
    type: GET_PATIENT_HISTORY_DATA,
    payload: await patientHistoryService.getPatientHistory(studyId, patientId, history)
  })
}

export const setNoteState = (value: string) => (dispatch: any) => {
  dispatch({
    type: SET_NOTE_STATE,
    payload: value
  })
}


