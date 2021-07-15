import { PeriodTypes } from '../constants/consts'

/**
 * Study model.
 */
export default class Study implements IStudyData {
  id = 1
  campaignType = 1
  studyTitle = ''
  therapeuticArea = ''
  indication = ''
  studyDrug = ''
  startDate = ''
  endDate = false
  userId = 1
  clientId = 1
  sponsorId = 1
  sponsorName = false
  referralGoal = 1
  enrollmentGoals = 1
  studyStatus = 1
  studyStatusName = ''
  totalRow = ''
  studiesProtocolDto = ''
  refStatus = false
  referralStatus = false
  ivrno = 1
  isPatientMessaging = ''
  isWarmTransfer = false
  isRiskShared = false
  hasPurchasedSponsor = false
  studyRoute?: string // ephemeral
  arms?: IStudyArm[] // ephemeral

  constructor(data: IStudyData) {
    if (data !== null && data !== undefined) {
      this.id = data.id
      this.campaignType = data.campaignType
      this.studyTitle = data.studyTitle
      this.therapeuticArea = data.therapeuticArea
      this.indication = data.indication
      this.studyDrug = data.studyDrug
      this.startDate = data.startDate
      this.endDate = data.endDate
      this.userId = data.userId
      this.clientId = data.clientId
      this.sponsorId = data.sponsorId
      this.sponsorName = data.sponsorName
      this.referralGoal = data.referralGoal
      this.enrollmentGoals = data.enrollmentGoals
      this.studyStatus = data.studyStatus
      this.studyStatusName = data.studyStatusName
      this.totalRow = data.totalRow
      this.studiesProtocolDto = data.studiesProtocolDto
      this.refStatus = data.refStatus
      this.referralStatus = data.referralStatus
      this.ivrno = data.ivrno
      this.isPatientMessaging = data.isPatientMessaging
      this.isWarmTransfer = data.isWarmTransfer
      this.isRiskShared = data.isRiskShared
      this.hasPurchasedSponsor = data.hasPurchasedSponsor
      this.studyRoute = (this.studyTitle !== null && this.studyTitle !== undefined) ? this.studyTitle.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase() : ''
      this.arms = data.arms
    }
  }

  /**
   * Return the retention groups for this study.
   */
  getRetentionGroups(armId = -1): string[] {

    if (armId === null || armId === undefined) armId = -1

    const r: string[] = []
    if (!this.arms)
      return r

    const groups = 3
    const label = (mostVisits: number, group: number) => {
      if (group > 3)
        group = 3
      const pergrp = Math.floor(mostVisits / 3)
      const min = Math.floor(pergrp * group - pergrp) + 1
      const max = group === 3 ? mostVisits : min + pergrp - 1
      return `Visit ${min}-${max}`
    }
    let totalVisits
    if (armId < 0)
      totalVisits = this.getRetentionLongestArm()?.visits?.filter(v => v.periodTypeName === PeriodTypes.Treatment).length || 0
    else
      totalVisits = this.getRetentionArmById(armId)?.visits?.filter(v => v.periodTypeName === PeriodTypes.Treatment).length || 0
    for (let group = 1; group <= groups; group++) {
      r.push(label(totalVisits, group))
    }
    r.push('Follow Up')
    return r
  }

  /**
   * Return the longest arm.
   */
  getRetentionLongestArm(): IStudyArm | null {
    let r: IStudyArm | null = null
    if (!this.arms)
      return null

    for (const arm of this.arms) {
      let armVisits = 0
      if (!arm.visits)
        continue
      for (const visit of arm.visits) {
        if (visit.periodTypeName === PeriodTypes.Treatment)
          armVisits++
      }
      if (!r || !r.visits || r.visits.length < armVisits)
        r = arm
    }

    return r || null
  }

  /**
   * Get study arm by id.
   * @param armId
   */
  getRetentionArmById(armId: number): IStudyArm | null {
    if (!this.arms)
      return null

    const arm = this.arms.find(arm => arm.studyARMId === armId)
    if (!arm)
      return null
    return arm
  }
}
