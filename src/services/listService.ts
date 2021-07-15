import { GET_LISTS } from 'constants/endpoint'
import baseApi from 'utils/axios'
import {handleApiError} from '../utils/api'

class ListService {
  getLists = async (history: any) => {
    try {
      const response = await baseApi.get(GET_LISTS)
      if (response.data != null) {
        return response.data}
      throw new Error('No List Data')
    } catch (error: any) {
      handleApiError(error, history)
      return false
    }
  }
}

const listService = new ListService()
export default listService
