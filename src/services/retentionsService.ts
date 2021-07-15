import baseApi from 'utils/axios'
import { REACT_APP_API_HOST } from '../constants/env'
import { handleApiError } from '../utils/api'

class RetentionsService {
  getRetentions = async (studyId: number, history: any) => {
    try {
      const response = await baseApi.get(`${REACT_APP_API_HOST}retention/study/${studyId}/patients`)
      if (response.data != null) {
        return response.data.map((p: IPatientData) => {
          p.studyId = studyId
          return p
        })
      }
      throw new Error('No Retentions')
    } catch (error: any) {
      handleApiError(error, history)
      return error
    }
  }
}

const retentionsService = new RetentionsService()
export default retentionsService
