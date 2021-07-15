import { GET_STEPPER_VISIT_DATA } from 'constants/endpoint'
import { useHistory } from 'react-router'
import baseApi from 'utils/axios'
import {handleApiError} from '../utils/api'

class StepperVisitDataService {

  
  getStepperVisitData = async (history?: any) => {
    try {
      const response = await baseApi.get(GET_STEPPER_VISIT_DATA)
      if (response.data != null) return response.data
      throw new Error('No Stepper Data')
    } catch (error: any) {
      handleApiError(error, history)
      return false
    }
  }
}

const stepperVisitDataService = new StepperVisitDataService()
export default stepperVisitDataService
