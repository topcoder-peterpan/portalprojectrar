import {
  SET_TOGGLE_STATE,
  SET_SORT,
  SET_FILTER,
  SET_ARM_FILTER,
  SET_STUDYID,
  GET_RETENTIONS,
  SET_CARDCLICK,
  GET_RETENTION_STUDY,
  GET_ARM_STUDY_VISIT
} from 'store/types'

interface IInitialState {
  toggleButtonState: string,
  sortType: string,
  filterType: string,
  studyId: number;
  retentions: IRetentionCardData[];
  cardClick: boolean;
  armFilterType: string;
  studyArmVisit: IStudyArm[];
  // studyData: IStudyData;
}
const initialState: IInitialState = {
  toggleButtonState: 'active',
  sortType: 'apptDate',
  filterType: 'all',
  armFilterType: 'all',
  studyId: Number(localStorage.getItem('studyId')),
  retentions: [],
  cardClick: false,
  studyArmVisit: []
  // studyData: {
  //   id: 1,
  //   campaignType: 1,
  //   studyTitle: '',
  //   therapeuticArea: '',
  //   indication: '',
  //   studyDrug: '',
  //   startDate: '',
  //   endDate: false,
  //   userId: 1,
  //   clientId: 1,
  //   sponsorId: 1,
  //   sponsorName: false,
  //   referralGoal: 1,
  //   enrollmentGoals: 1,
  //   studyStatus: 1,
  //   studyStatusName: '',
  //   totalRow: '',
  //   studiesProtocolDto: '',
  //   refStatus: false,
  //   referralStatus: false,
  //   ivrno: 1,
  //   isPatientMessaging: '',
  //   isWarmTransfer: false,
  //   isRiskShared: false,
  //   hasPurchasedSponsor: false,
  //   studyRoute: '', // ephemeral
  //   arms: [],
  // }
}

export default function (state: IInitialState = initialState, action: any) {
  switch (action.type) {
  case SET_SORT:
    return {
      ...state,
      sortType: action.payload
    }
  case GET_RETENTIONS:
    return {
      ...state,
      retentions: action.payload
    }
  case GET_RETENTION_STUDY:
    return {
      ...state,
      studyData: action.payload
    }
  case GET_ARM_STUDY_VISIT:
    return {
      ...state,
      studyArmVisit: action.payload
    }
  case SET_FILTER:
    return {
      ...state,
      filterType: action.payload
    }
  case SET_ARM_FILTER:
    return {
      ...state,
      armFilterType: action.payload
    }
  case SET_TOGGLE_STATE:
    return {
      ...state,
      toggleButtonState: action.payload
    }
  case SET_STUDYID:
    return {
      ...state,
      studyId: action.payload
    }
  case SET_CARDCLICK:
    return {
      ...state,
      cardClick: action.payload
    }
  default:
    return state
  }
}

