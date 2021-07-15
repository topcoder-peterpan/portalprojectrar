import Study from '../types/study'
import {PeriodTypes} from '../constants/consts'

const isVisitDateValid = (dt: string) => !/^(?:\s+)|(?:null)$/g.test(dt) && !/^\s*$/g.test(dt)

/**
 * Returns patients grouped by their treatment and follow up periods. The array structure
 * is: [ IPatientData[], IPatientData[], IPatientData[], IPatientData[] ]
 * The [0] index contains all patients in the first group (e.g. Visit 1-8)
 * The [1] index contains all patients in the second group (e.g. Visit 9-16)
 * The [2] index contains all patients in the third group (e.g. Visit 17-24)
 * The [3] index contains all patients in the follow up or fourth group (e.g. Follow Up)
 * The method always returns this data structure even if there are no patients in a
 * group, in which case an empty array is returned. This is what the data structure
 * looks like if no patients match any groups: [ [], [], [], [] ] where [0,1,2,3] = []
 * @param study
 * @param patients
 * @param armId
 */
export function studyGroupPatients(study: Study, patients: IPatientData[], armId = -1): Array<IPatientData[]> {
  const filteredPatients = patients.filter(p => p.studyId === study.id && p.referralVisits)
  const patientGroups: Array<IPatientData[]> = [[], [], [], []] // group 1, group 2, group 3, group 4 (follow up)
  let studyArm: IStudyArm | null
  if (armId >= 0)
    studyArm = study.getRetentionArmById(armId)
  else
    studyArm = study.getRetentionLongestArm()
  if (!studyArm || !studyArm.visits)
    return patientGroups

  const armVisitLookup = new Map<number, IStudyArmVisit>()
  // If the arm is specified then we filter on that arm id
  if (armId >= 0) {
    studyArm.visits.forEach(v => {
      armVisitLookup.set(v.armVisitId, v)
    })
  } else { // if arm is not specified we allow lookups across all arms in the study
    if (!study.arms)
      return patientGroups
    for (const arm of study.arms) {
      if (!arm.visits)
        continue
      for (const v of arm.visits)
        armVisitLookup.set(v.armVisitId, v)
    }
  }


  // Follow up (the last group)
  // We find all patients with a follow up visit scheduled and count
  // them in the follow up group, which is the 4th group.
  for (const patient of filteredPatients) {
    if (!patient.referralVisits || patient.referralVisits.length === 0)
      continue
    // Filter patient referral visits to armId if required
    const visits = armId < 0 ? patient.referralVisits
      : patient.referralVisits.filter((v: IReferralVisitsData) => {
        const armVisit = armVisitLookup.get(v.armVisitId)
        return armVisit && armVisit.studyARMId === armId
      })
    for (let i = 0; i < visits.length; i++) {
      const visit = visits[i]
      const armVisit = armVisitLookup.get(visit.armVisitId)
      if (!armVisit)
        continue
      // Must be a follow up visit and have a follow up appointment (visit) scheduled
      const isFollowUp = armVisit.periodTypeName === PeriodTypes.FollowUp
      const isValidDate = isVisitDateValid(visit.appointmentDate)
      if (isFollowUp && isValidDate) {
        patientGroups[3].push(patient)
        break
      }
    }
  }

  // Groups (e.g. 1-8, 9-16, 17-24)
  // The purpose here is to group all patients with their respective groups. The
  // grouping is based on the visits associated at the study level. The patient's
  // current visit number is used to determine which group they're in. If they
  // have a follow up visit scheduled, they are excluded from this logic.
  const groups = 3
  const totalVisits = studyArm.visits.filter(patient => patient.periodTypeName === PeriodTypes.Treatment).length
  for (const patient of filteredPatients) {
    // To calculate group: current_group = ceil(current_visit / total_visits * total_groups)
    const sortedAndFilteredVisits = patient.referralVisits.sort((a, b) => {
      return parseInt(b.visitNumber) - parseInt(a.visitNumber) // descending
    }).filter(v => isVisitDateValid(v.appointmentDate))
    if (!sortedAndFilteredVisits)
      continue // skip if no visits pass criteria
    // If randomized and empty visits add to first group
    if (sortedAndFilteredVisits.length < 1) {
      patientGroups[0].push(patient)
      continue
    }
    const latestVisit = sortedAndFilteredVisits[0]
    const visitNumber = parseInt(latestVisit.visitNumber)
    const group = Math.ceil(visitNumber / totalVisits * groups) - 1 // subtract one for array index e.g. [0]
    if (group < 0 || group >= patientGroups.length)
      continue // skip, failed bounds check
    if (!patientGroups[3].find(p => p.referralId === patient.referralId)) // exclude follow up patients
      patientGroups[group].push(patient)
  }

  return patientGroups
}

/**
 * Find most recent scheduled referral visit, get arm for it. If no visits return ''
 * If no scheduled visits return the arm label for the first referral visit found.
 * @param value
 * @param arms
 */
export function getArmLabel(value: IPatientData, arms: IStudyArm[]): string {
  let armVisitId = 0
  let armLabel = ''
  const sorted = [...value.referralVisits]
  sorted.sort((a, b) => {
    const dateA = new Date(a.appointmentDate)
    const dateB = new Date(b.appointmentDate)
    const dateABad = !(dateA instanceof Date && !isNaN(dateA.valueOf()))
    const dateBBad = !(dateB instanceof Date && !isNaN(dateB.valueOf()))
    if (dateABad || dateBBad)
      return -1 // put on back of list
    return dateB.getTime() - dateA.getTime() // descending
  })
  let existElem1 = sorted.findIndex(
    (item: IReferralVisitsData) =>
      item.appointmentStatus === 'Scheduled'
  )
  // If no scheduled visits found pick the first available visit
  if (existElem1 < 0 && value.referralVisits && value.referralVisits.length > 0)
    existElem1 = 0
  if (existElem1 >= 0)
    armVisitId = sorted[existElem1].armVisitId
  for (let i = 0; i < arms.length; i ++) {
    const existElem2 = arms[i].visits?.findIndex(
      (item: IStudyArmVisit) =>
        item.armVisitId === armVisitId
    )
    if (existElem2 !== undefined && existElem2 >= 0) {
      armLabel = arms[i].armLabel
    }
  }
  return armLabel
}
