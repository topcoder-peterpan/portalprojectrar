import patientVisitListService from '../services/patientVisitListService'
import { useHistory } from 'react-router'

const patientList : any [] = [
  {
    address : null,
    applicableProtocolNo : null,
    armLabel: '',
    careGiverEmailAddress: null,
    careGiverrsPhoneNumber: null,
    careGiversName: null,
    cellPhoneNumber: null,
    city: null,
    country: null,
    emailAddress: null,
    eventStatus: 'Complete - Randomized',
    eventType: 'Visit Complete',
    firstName: 'Test',
    homePhoneNumber: null,
    ivrno: '19',
    lastName: 'Test',
    latModifiedDate: '2021-07-13T17:46:57.01',
    middleName: null,
    owner: 'CTM',
    permissionLeaveMessage: null,
    preferredCallBackTime: null,
    randomizationDate: '2021-07-15T04:00:00',
    referralId: 250,
    referralStatus: 'Randomized',
    referralVisits: [],
    siteId: 0,
    siteUserId: 0,
    state: null,
    studyId: 17,
    timeZone: null,
    uploadUserId: null,
    zip: null
  },
  {
    address: null,
    applicableProtocolNo: null,
    armLabel: '',
    careGiverEmailAddress: null,
    careGiverrsPhoneNumber: null,
    careGiversName: null,
    cellPhoneNumber: null,
    city: null,
    country: null,
    emailAddress: null,
    eventStatus: 'Complete - Randomized',
    eventType: 'Visit Complete',
    firstName: 'Test_LastName',
    homePhoneNumber: null,
    ivrno: '158',
    lastName: 'LastName',
    latModifiedDate: '2021-08-23T17:37:26.4266667',
    middleName: null,
    owner: 'CTM',
    permissionLeaveMessage: null,
    preferredCallBackTime: null,
    randomizationDate: '2021-08-31T04:00:00',
    referralId: 2170,
    referralStatus: 'Randomized',
    referralVisits: [],
    siteId: 0,
    siteUserId: 0,
    state: null,
    studyId: 17,
    timeZone: null,
    uploadUserId: null,
    zip: null,
  }
]

describe('PatientVisitList Service', () => {
  const studies : number [] = [13,14,16,17,18,19,20,21,22,23,24,25,27]

  it('PatientVisitList service should be done', async () => {
    const data = await patientVisitListService.getAllPatientsData(studies, null)
    if(data.data?.length >= 0){
      expect(data.data.length).toEqual(18)
    }
  })

  it('PatientVisitList service should be done', async () => {
    const data = await patientVisitListService.getAllPatientsData(studies, null)
    if(data.data?.length >= 0) {
      expect(data.data[0]).toEqual([patientList.find(p => p.referralId === 250)])
      expect(data.data[0]).toEqual([patientList.find(p => p.referralId === 2170)])
    }
  })

})