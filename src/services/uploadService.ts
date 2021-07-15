import { AxiosResponse } from 'axios'
import baseApi from 'utils/axios'
import { REACT_APP_API_HOST } from '../constants/env'
import { handleApiError } from '../utils/api'

class PatientUpload {
  postPatientUpload = async (studyId: number, siteId: number, mappedHeader: IMappedHeaderData, base64String: string, history: any) => {
    try {
      const response: AxiosResponse<any> = await baseApi.post(`${REACT_APP_API_HOST}retention/study/${studyId}/patients/Upload`,
        {
          'siteId': siteId,
          'mappedHeader': mappedHeader,
          'base64CSVString': base64String
        })
      if (response.data != null) {
        return response.data
      }
      throw new Error('Error Patient Upload')
    } catch (error: any) {
      handleApiError(error, history)
      return false
    }
  }
}

const patientUpload = new PatientUpload()
export default patientUpload