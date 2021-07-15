import baseApi from 'utils/axios'
import { REACT_APP_API_HOST } from '../constants/env'
import {handleApiError} from '../utils/api'

class CardService {
  getCards = async (history: any) => {
    try {
      const response = await baseApi.get(`${REACT_APP_API_HOST}study/trialdata`)
      if (response.data != null)  return response.data
      throw new Error('No Cards Data')
    } catch (error: any) {
      handleApiError(error, history)
      return false
    }
  }
}

const cardService = new CardService()
export default cardService
