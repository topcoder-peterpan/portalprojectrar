import baseApi from 'utils/axios'
import { REACT_APP_API_HOST } from '../constants/env'
import {handleApiError} from '../utils/api'

class PatientContactService {
  getPatientContacts = async (studyId: number, patientId: number, history: any) => {
    try {
      const response = await baseApi.get(`${REACT_APP_API_HOST}retention/study/${studyId}/patients/${patientId}`)
      if (response.data != null) {
        const patient = response.data
        patient.studyId = studyId
        return patient
      }
      throw new Error('No Patient Contact Data')
    } catch (error: any) {
      handleApiError(error, history)
      return null
    }
  }
}

const patientContactService = new PatientContactService()
export default patientContactService
