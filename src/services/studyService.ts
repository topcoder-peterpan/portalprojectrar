import { AxiosResponse } from 'axios'
import baseApi from 'utils/axios'
import { REACT_APP_API_HOST } from '../constants/env'
import { handleApiError } from '../utils/api'
import Study from '../types/study'
import _ from 'lodash'

class StudyService {
  getStudies = async (history: any): Promise<Study[]> => {
    try {
      const response: AxiosResponse<any> = await baseApi.get(`${REACT_APP_API_HOST}study`)
      if (_.isArray(response.data)) {
        // Add ephemeral study data
        return response.data.map((s: IStudyData) => {
          return new Study(s)
        })
      }
      throw new Error('No Studies')
    } catch (error: any) {
      handleApiError(error, history)
      return []
    }
  }
  getStudyData = async (studyId: number, history: any) => {
    const returnData: IStudyData = {
      'id': 0,
      'campaignType': 0,
      'studyTitle': '',
      'therapeuticArea': '',
      'indication': '',
      'studyDrug': '',
      'startDate': '',
      'endDate': false,
      'userId': 0,
      'clientId': 0,
      'sponsorId': 0,
      'sponsorName': false,
      'referralGoal': 0,
      'enrollmentGoals': 0,
      'studyStatus': 0,
      'studyStatusName': '',
      'totalRow': '',
      'studiesProtocolDto': '',
      'refStatus': false,
      'referralStatus': false,
      'ivrno': 0,
      'isPatientMessaging': '',
      'isWarmTransfer': false,
      'isRiskShared': false,
      'hasPurchasedSponsor': false,
      'studyRoute': '', // ephemeral (i.e. temporary field set after server fetch)
      'arms': [],
    }
    try {
      const response: AxiosResponse<any> = await baseApi.get(`${REACT_APP_API_HOST}study/${studyId}`)
      if (response.data !== null) {
        returnData.id = response.data.id
        returnData.campaignType = response.data.campaignType
        returnData.studyTitle = response.data.studyTitle
        returnData.therapeuticArea = response.data.therapeuticArea
        returnData.indication = response.data.indication
        returnData.studyDrug = response.data.studyDrug
        returnData.startDate = response.data.startDate
        returnData.endDate = response.data.endDate
        returnData.userId = response.data.userId
        returnData.clientId = response.data.clientId
        returnData.sponsorId = response.data.sponsorId
        returnData.sponsorName = response.data.sponsorName
        returnData.referralGoal = response.data.referralGoal
        returnData.enrollmentGoals = response.data.enrollmentGoals
        returnData.studyStatus = response.data.studyStatus
        returnData.studyStatusName = response.data.studyStatusName
        returnData.totalRow = response.data.totalRow
        returnData.studiesProtocolDto = response.data.studiesProtocolDto
        returnData.refStatus = response.data.refStatus
        returnData.referralStatus = response.data.referralStatus
        returnData.ivrno = response.data.ivrno
        returnData.isPatientMessaging = response.data.isPatientMessaging
        returnData.isWarmTransfer = response.data.isWarmTransfer
        returnData.isRiskShared = response.data.isRiskShared
        returnData.hasPurchasedSponsor = response.data.hasPurchasedSponsor
      }
      returnData.arms = await this.getStudyArmsData(studyId, history)
      return returnData
    } catch (error: any) {
      handleApiError(error, history)
      return []
    }
  }
  /**
   * Get all arms in a study.
   * @param studyId
   * @param history
   */
  getStudyArmsData = async (studyId: number, history: any) => {
    try {
      const response: AxiosResponse = await baseApi.get(`${REACT_APP_API_HOST}study/${studyId}/arm`)
      const returnData : IStudyArm [] = response.data
      returnData.forEach(async (item: IStudyArm) => {
        const responseVisits = await baseApi.get(`${REACT_APP_API_HOST}study/${studyId}/arm/${item.studyARMId}/visits`)
        item.visits = responseVisits.data
      })
      if(returnData !== null) return returnData
    } catch (error: any) {
      handleApiError(error, history)
      return []
    }
  }

  getStudyArms = async (studyId: number, history: any): Promise<IStudyArm[]> => {
    try {
      const response: AxiosResponse = await baseApi.get(`${REACT_APP_API_HOST}study/${studyId}/arm`)
      if (!_.isArray(response.data))
        throw new Error('Bad data')
      return response.data
    } catch (error: any) {
      handleApiError(error, history)
      return []
    }
  }

  /**
   * Get all arm visits.
   * @param studyArmId
   * @param studyId
   * @param history
   */
  getStudyArmVisits = async (studyArmId: number, studyId: number, history: any): Promise<IStudyArmVisit[]> => {
    try {
      const response: AxiosResponse = await baseApi.get(`${REACT_APP_API_HOST}study/${studyId}/arm/${studyArmId}/visits`)
      if (!_.isArray(response.data))
        throw new Error('Bad data')
      return response.data
    } catch (error: any) {
      handleApiError(error, history)
      return []
    }
  }
}

const studyService = new StudyService()
export default studyService
