import baseApi from 'utils/axios'
import { REACT_APP_API_HOST } from '../constants/env'
import {handleApiError} from '../utils/api'

class PatientHistoryService {
  getPatientHistory = async (studyId: number, patientId: number, history: any) => {
    
    try {
      const response = await baseApi.get(`${REACT_APP_API_HOST}retention/study/${studyId}/patients/${patientId}/history`)
      if (response.data != null)  return response.data
      throw new Error('No Patient History Data')
    } catch (error: any) {
      handleApiError(error, history)
      return false
    }
  }
}

const patientHistoryService = new PatientHistoryService()
export default patientHistoryService
