import { AxiosResponse } from 'axios'
import { createApiClient } from 'utils/axios'
import { isArray } from 'lodash'

import { REACT_APP_API_HOST } from 'constants/env'
import { handleApiError } from 'utils/api'

class SiteService {
  getSites = async (userId: number, history: any): Promise<ISite[]> => {
    try {
      const baseApi = createApiClient()
      const response: AxiosResponse<any> = await baseApi.get(`${REACT_APP_API_HOST}user/GetUserSites/${userId}`)
      const { data } = response
      if (isArray(data)) {
        return data as ISite[]
      }
      return [] as ISite[]
    } catch (error) {
      handleApiError(error, history)
      return [] as ISite[]
    }
  }

  getSiteStudies = async (siteId: number, history: any): Promise<number[]> => {
    try {
      const baseApi = createApiClient()
      const response: AxiosResponse<any> = await baseApi.get(`${REACT_APP_API_HOST}site/GetStudiesBySite?SiteId=${siteId}&search=&from=1&to=1000`)
      const { data } = response
      if (data && isArray(data)) {
        return data.map((s: any) => {
          return s.Id
        })
      }
      return [] as number[]
    } catch (error) {
      handleApiError(error, history)
      return []
    }
  }
}

const siteService = new SiteService()
export default siteService
