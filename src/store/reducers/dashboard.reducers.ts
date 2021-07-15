import {
  GET_LISTS,
  GET_STUDIES,
  GET_CARDS,
  GET_PATIENT_ALL_VISITS,
  GET_PATIENT_VISITS,
  SET_USER_DATA,
  GET_STUDY_ARMS,
  GET_SITES,
  GET_SITE_STUDIES,
} from 'store/types'

const initialState = {
  allCards: [],
  cards: [],
  lists: [],
  studies: [],
  allStudies: [],
  patientAllVisits: [],
  patientVisits: [],
  userName: localStorage.getItem('userName'),
  sites: []
}

export default function (state = initialState, action: any) {
  switch (action.type) {
  case SET_USER_DATA:
    return {
      ...state,
      userName: action.payload
    }
  case GET_LISTS:
    return {
      ...state,
      lists: action.payload
    }
  case GET_CARDS:
    return {
      ...state,
      cards: action.payload,
      allCards: action.payload
    }
  case GET_PATIENT_ALL_VISITS:
    return {
      ...state,
      patientAllVisits: action.payload
    }
  case GET_PATIENT_VISITS:
    return {
      ...state,
      patientVisits: action.payload
    }
  case GET_STUDIES:
    return {
      ...state,
      studies: action.payload,
      allStudies: action.payload
    }
  case GET_STUDY_ARMS: {
    // Merge the study arms into the studies data provider
    const { studyId, arms } = action.payload
    const studies = state.studies.map((study: IStudyData) => {
      if (studyId != study.id)
        return study
      study.arms = arms
      return study
    })
    return {
      ...state,
      studies: studies
    }
  }
  case GET_SITES: {
    return {
      ...state,
      sites: action.payload
    }
  }
  case GET_SITE_STUDIES: {
    const ids = action.payload

    // filter studies at selected site
    const studies: IStudyData[] = []
    ids.forEach((id: number) => {
      const found = state.allStudies.find((study: IStudyData) => study.id === id)
      if (found) {
        studies.push(found)
      }
    })

    // filter cards
    const cards: ICardData[] = []
    studies.forEach((s: IStudyData) => {
      const found = state.allCards.find((card: ICardData) => s.studyTitle === card.study)
      if (found) {
        cards.push(found)
      }
    })
    return {
      ...state,
      cards,
      studies
    }
  }
  default:
    return state
  }
}
