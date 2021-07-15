import { useHistory } from 'react-router'
import baseApi from 'utils/axios'
import { REACT_APP_API_HOST } from '../constants/env'
import { handleApiError } from '../utils/api'

class PatientVisitListService {

  
  getAllPatientsData = async (studies: number[], history: any) => {

    // const history = useHistory()
    try {
      const returnData: IPatientData[] = []
      for await (const studyId of studies) {
        const response = await baseApi.get(`${REACT_APP_API_HOST}retention/study/${studyId}/patients`)
        if (response.data != null) {
          returnData.push(...response.data.map((p: IPatientData) => {
            p.studyId = studyId // add study id to patient data
            return p
          }))
        }
      }
      return returnData
    } catch (error: any) {
      handleApiError(error, history)
      return error
    }
  }
}

const patientVisitListService = new PatientVisitListService()
export default patientVisitListService
