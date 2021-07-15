import { AxiosResponse } from 'axios'
import baseApi from 'utils/axios'
import { REACT_APP_API_HOST } from '../constants/env'
import {handleApiError} from '../utils/api'

class PatientNoteDataService {
  getPatientNoteData = async (studyId: number, patientId: number, history: any) => {
    
    try {
      const response = await baseApi.get(`${REACT_APP_API_HOST}retention/study/${studyId}/patients/${patientId}/notes`)
      if (response.data != null) return response.data
      throw new Error('No Patient Note Data')
    } catch (error: any) {
      handleApiError(error, history)
      return false
    }
  }
  postPatientNoteData = async (studyId: number, patientId: number, noteSubject: string, noteText: string, isPrivate: boolean, history: any) => {
    try {
      const response: AxiosResponse<any> = await baseApi.post(`${REACT_APP_API_HOST}retention/study/${studyId}/patients/${patientId}/notes`, { noteSubject: noteSubject, noteText: noteText, isPrivate: isPrivate })
      if (response.data != null) return response.data
      throw new Error('Error Patient Note Data')
    } catch (error: any) {
      handleApiError(error, history)
      return false
    }
  }

}

const patientNoteDataService = new PatientNoteDataService()
export default patientNoteDataService
