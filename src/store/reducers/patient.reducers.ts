import {
  GET_PATIENT_CONTACT,
  GET_PATIENT_NOTE_DATA,
  SET_NOTE_STATE,
  GET_PATIENT_HISTORY_DATA,
  GET_PATIENT_PREQUALIFICATION_DATA,
} from 'store/types'

const initialState = {
  patientcontacts: [],
  patientNoteData: [],
  patientPreQualificationData: [],
  patientHistoryData: [],
  patientNoteState: 'table',
}

export default function (state = initialState, action: any) {
  switch (action.type) {
  case GET_PATIENT_CONTACT:
    return {
      ...state,
      patientcontacts: action.payload
    }
  case GET_PATIENT_NOTE_DATA:
    return {
      ...state,
      patientNoteData: action.payload
    }
  case GET_PATIENT_PREQUALIFICATION_DATA:
    return {
      ...state,
      patientPreQualificationData: action.payload
    }
  case GET_PATIENT_HISTORY_DATA:
    return {
      ...state,
      patientHistoryData: action.payload
    }
  case SET_NOTE_STATE:
    return {
      ...state,
      patientNoteState: action.payload
    }
  default:
    return state
  }
}
