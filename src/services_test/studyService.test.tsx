import studyService from '../services/studyService'
import mockData from '../../jsonDB/db.json'
import Study from '../types/study'
import { PeriodTypes } from '../constants/consts'
import {getArmLabel, studyGroupPatients} from '../utils/study'
import mockPatientsData1 from './studyService.test-patients1.json'
import mockPatientsData2 from './studyService.test-patients2.json'
import mockArm1Data from './studyService.test-arm1.json'
import mockArm2Data from './studyService.test-arm2.json'

// jest.mock("../services/studyService.ts", () => {
//   return {
//     getStudies: () => Promise.resolve(mockData.studies)
//   };
// });
//
//
// describe('Study Service', () => {
//   it('study service should be done', async () => {
//     const data = await studyService.getStudies(null);
//     expect(data).toContain(mockData.studies[0]);
//   })
// })

describe('Study object', () => {
  it('should get retention groups for 9 visits and follow up', async () => {
    const study = mockStudy(mockArms9)
    const l = [...[{}, {}]]
    expect(study.getRetentionGroups()).toEqual([
      'Visit 1-3',
      'Visit 4-6',
      'Visit 7-9',
      'Follow Up',
    ])
    expect(study.getRetentionGroups(mockArms9[0].studyARMId)).toEqual([
      'Visit 1-3',
      'Visit 4-6',
      'Visit 7-9',
      'Follow Up',
    ])
  })

  it('should get retention groups for 24 visits and follow up', async () => {
    const study = mockStudy(mockArms9and24)
    expect(study.getRetentionGroups()).toEqual([
      'Visit 1-8',
      'Visit 9-16',
      'Visit 17-24',
      'Follow Up',
    ])
    expect(study.getRetentionGroups(mockArms9and24[0].studyARMId)).toEqual([
      'Visit 1-3',
      'Visit 4-6',
      'Visit 7-9',
      'Follow Up',
    ])
    expect(study.getRetentionGroups(mockArms9and24[1].studyARMId)).toEqual([
      'Visit 1-8',
      'Visit 9-16',
      'Visit 17-24',
      'Follow Up',
    ])
  })

  it('should get longest study arm', async () => {
    const study = mockStudy(mockArms9and24)
    expect(study.getRetentionLongestArm()?.visits?.filter(v => v.periodTypeName === PeriodTypes.Treatment).length)
      .toEqual(24)
  })

  it('should get study group patients', async () => {
    const study = mockStudy(mockArms9and24)
    const patients = mockPatients(study)
    const groups = studyGroupPatients(study, patients)
    expect(groups[0]).toEqual([patients.find(p => p.referralId === 2170)])
    expect(groups[1]).toEqual([patients.find(p => p.referralId === 2733)])
    expect(groups[2]).toEqual([]) // no match expected
    expect(groups[3]).toEqual([patients.find(p => p.referralId === 250)]) // follow up
  })

  it('should get study group patients counts', async () => {
    const study = mockStudy(mockArms9and24)
    const patients = mockPatients2(study.id)
    const groups = studyGroupPatients(study, patients)
    expect(groups[0].length).toEqual(8) // should contain patients with empty visit list
    expect(groups[1].length).toEqual(5)
    expect(groups[2].length).toEqual(3)
    expect(groups[3].length).toEqual(3) // follow up
  })

  it('should manage study group patients across multiple arms', async () => {
    const study = mockStudy([mockArm1Data, mockArm2Data], 17)
    const patients = mockPatientsData1.map((raw: any) => {
      raw.studyId = 17
      return raw as IPatientData
    })
    const groups = studyGroupPatients(study, patients)
    expect(groups[3]).toContain(patients.find(p => p.firstName === 'Kayla' && p.lastName === 'Mitchell')) // expecting to be in follow up
    expect(groups[3]).toContain(patients.find(p => p.firstName === 'Cameron' && p.lastName === 'Harris')) // expecting to be in follow up
    expect(groups[0].length).toEqual(16) // should contain patients with empty visit list
    expect(groups[1].length).toEqual(1)
    expect(groups[2].length).toEqual(4)
    expect(groups[3].length).toEqual(5) // follow up
  })
})

describe('study util', () => {
  it('should get correct arm label for patients', async () => {
    const patient = mockPatientLauren(17)
    const arms = mockArms9and24
    expect(getArmLabel(patient, arms)).toEqual('ARM 2') // expect selected arm to be correct
  })
})

/* eslint-disable no-console */
const mockPatientLauren = (studyId: number): IPatientData => {
  return {
    'studyId': studyId,
    'referralId': 2733,
    'siteUserId': 0,
    'firstName': 'Lauren',
    'lastName': 'Phillips',
    'careGiversName': null,
    'careGiverrsPhoneNumber': null,
    'siteId': 0,
    'randomizationDate': '2021-11-19T00:02:53.9133333',
    'eventType': 'Pre-Qualified',
    'eventStatus': 'Complete - Randomized',
    'referralStatus': 'Randomized',
    'owner': 'CTM',
    'latModifiedDate': '2021-11-19T06:02:53.9133333',
    'referralVisits': [
      {
        'referralId': 2733,
        'armVisitId': 1,
        'visitNumber': '1',
        'appointmentDate': '2021-11-21T16:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 1',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 2,
        'visitNumber': '2',
        'appointmentDate': '2021-11-22T21:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 2',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 3,
        'visitNumber': '3',
        'appointmentDate': '2021-11-23T14:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 3',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 4,
        'visitNumber': '4',
        'appointmentDate': '2021-11-24T23:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 4',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 5,
        'visitNumber': '5',
        'appointmentDate': '2021-11-25T14:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 5',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 6,
        'visitNumber': '6',
        'appointmentDate': '2021-11-26T18:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 6',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 7,
        'visitNumber': '7',
        'appointmentDate': '2021-11-27T19:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 7',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 8,
        'visitNumber': '8',
        'appointmentDate': '2021-11-28T14:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 8',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 9,
        'visitNumber': '9',
        'appointmentDate': '2021-11-29T22:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 9',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 10,
        'visitNumber': '10',
        'appointmentDate': '2021-11-30T22:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 10',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 11,
        'visitNumber': '11',
        'appointmentDate': '2021-12-01T13:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 11',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 12,
        'visitNumber': '12',
        'appointmentDate': '2021-12-02T17:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 12',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 13,
        'visitNumber': '13',
        'appointmentDate': '2021-12-03T21:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 13',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 14,
        'visitNumber': '14',
        'appointmentDate': '2021-12-04T20:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 14',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 15,
        'visitNumber': '15',
        'appointmentDate': '2021-12-05T22:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 15',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 16,
        'visitNumber': '16',
        'appointmentDate': '2021-12-06T18:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 16',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 17,
        'visitNumber': '17',
        'appointmentDate': '2021-12-07T15:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 17',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 18,
        'visitNumber': '18',
        'appointmentDate': '2021-12-08T22:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 18',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 19,
        'visitNumber': '19',
        'appointmentDate': '2021-12-09T21:00:00+00:00',
        'appointmentStatus': 'Complete',
        'notes': null,
        'visitLabel': 'Visit 19',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 20,
        'visitNumber': '20',
        'appointmentDate': '2021-12-10T19:00:00+00:00',
        'appointmentStatus': 'Scheduled',
        'notes': null,
        'visitLabel': 'Visit 20',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 21,
        'visitNumber': '21',
        'appointmentDate': '',
        'appointmentStatus': 'Pending',
        'notes': null,
        'visitLabel': 'Visit 21',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 22,
        'visitNumber': '22',
        'appointmentDate': '',
        'appointmentStatus': 'Pending',
        'notes': null,
        'visitLabel': 'Visit 22',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 23,
        'visitNumber': '23',
        'appointmentDate': '',
        'appointmentStatus': 'Pending',
        'notes': null,
        'visitLabel': 'Visit 23',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 24,
        'visitNumber': '24',
        'appointmentDate': '',
        'appointmentStatus': 'Pending',
        'notes': null,
        'visitLabel': 'Visit 24',
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 25,
        'visitNumber': '1',
        'appointmentDate': '',
        'appointmentStatus': 'Pending',
        'notes': null,
        'visitLabel': 'Follow Up',
        'periodTypeId': 3,
        'periodTypeName': 'Follow-up Period'
      },
      {
        'referralId': 2733,
        'armVisitId': 26,
        'visitNumber': '2',
        'appointmentDate': '',
        'appointmentStatus': 'Pending',
        'notes': null,
        'visitLabel': 'Follow Up 2',
        'periodTypeId': 3,
        'periodTypeName': 'Follow-up Period'
      }
    ]
  }
}
const mockPatients2 = (studyId: number): IPatientData[] => {
  return mockPatientsData2.map((p: IPatientData) => { p.studyId = studyId; return p })
}

const mockArms9: IStudyArm[] = [
  {
    studyARMId: 0,
    studyId: 17,
    armName: 'UnitTest1-ARMName-1',
    armLabel: 'ARM 1',
    armDesc: 'Test ARM 1',
    visits: [
      {
        'armVisitId': 0,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit001',
        'sequence': 1,
        'week': 2,
        'day': 7,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 1,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit002',
        'sequence': 2,
        'week': 2,
        'day': 8,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 2,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit003',
        'sequence': 3,
        'week': 2,
        'day': 9,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 3,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit004',
        'sequence': 4,
        'week': 2,
        'day': 10,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 4,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit005',
        'sequence': 5,
        'week': 2,
        'day': 11,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 5,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit006',
        'sequence': 6,
        'week': 2,
        'day': 12,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 6,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit007',
        'sequence': 7,
        'week': 2,
        'day': 13,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 7,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit008',
        'sequence': 8,
        'week': 3,
        'day': 14,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 8,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit009',
        'sequence': 9,
        'week': 3,
        'day': 15,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      }
    ],
  },
  {
    studyARMId: 1,
    studyId: 17,
    armName: 'UnitTest1-ARMName-1',
    armLabel: 'ARM 2',
    armDesc: 'Test ARM 2',
    visits: [],
  }
]
const mockArms9and24: IStudyArm[] = [
  {
    studyARMId: 0,
    studyId: 17,
    armName: 'UnitTest1-ARMName-1',
    armLabel: 'ARM 1',
    armDesc: 'Test ARM 1',
    visits: [
      {
        'armVisitId': 0,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit001',
        'sequence': 1,
        'week': 2,
        'day': 7,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 1,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit002',
        'sequence': 2,
        'week': 2,
        'day': 8,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 2,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit003',
        'sequence': 3,
        'week': 2,
        'day': 9,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 3,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit004',
        'sequence': 4,
        'week': 2,
        'day': 10,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 4,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit005',
        'sequence': 5,
        'week': 2,
        'day': 11,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 5,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit006',
        'sequence': 6,
        'week': 2,
        'day': 12,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 6,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit007',
        'sequence': 7,
        'week': 2,
        'day': 13,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 7,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit008',
        'sequence': 8,
        'week': 3,
        'day': 14,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 8,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit009',
        'sequence': 9,
        'week': 3,
        'day': 15,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      }
    ],
  },
  {
    studyARMId: 1,
    studyId: 17,
    armName: 'UnitTest1-ARMName-1',
    armLabel: 'ARM 2',
    armDesc: 'Test ARM 2',
    visits: [
      {
        'armVisitId': 0,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit001',
        'sequence': 1,
        'week': 2,
        'day': 7,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 1,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit002',
        'sequence': 2,
        'week': 2,
        'day': 8,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 2,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit003',
        'sequence': 3,
        'week': 2,
        'day': 9,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 3,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit004',
        'sequence': 4,
        'week': 2,
        'day': 10,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 4,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit005',
        'sequence': 5,
        'week': 2,
        'day': 11,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 5,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit006',
        'sequence': 6,
        'week': 2,
        'day': 12,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 6,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit007',
        'sequence': 7,
        'week': 2,
        'day': 13,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 7,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit008',
        'sequence': 8,
        'week': 3,
        'day': 14,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 8,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit009',
        'sequence': 9,
        'week': 3,
        'day': 15,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 9,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0010',
        'sequence': 10,
        'week': 3,
        'day': 16,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 10,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0011',
        'sequence': 11,
        'week': 3,
        'day': 17,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 11,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0012',
        'sequence': 12,
        'week': 3,
        'day': 18,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 12,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0013',
        'sequence': 13,
        'week': 3,
        'day': 19,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 13,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0014',
        'sequence': 14,
        'week': 3,
        'day': 20,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 14,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0015',
        'sequence': 15,
        'week': 4,
        'day': 21,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 15,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0016',
        'sequence': 16,
        'week': 4,
        'day': 22,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 16,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0017',
        'sequence': 17,
        'week': 4,
        'day': 23,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 17,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0018',
        'sequence': 18,
        'week': 4,
        'day': 24,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 18,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0019',
        'sequence': 19,
        'week': 4,
        'day': 25,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 19,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0020',
        'sequence': 20,
        'week': 4,
        'day': 26,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 20,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0021',
        'sequence': 21,
        'week': 4,
        'day': 27,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 21,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0022',
        'sequence': 22,
        'week': 5,
        'day': 28,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 22,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0023',
        'sequence': 23,
        'week': 5,
        'day': 29,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 23,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'Visit0024',
        'sequence': 24,
        'week': 5,
        'day': 30,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 2,
        'periodTypeName': 'Treatment Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 24,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'FollowUp25',
        'sequence': 25,
        'week': 5,
        'day': 31,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 3,
        'periodTypeName': 'Follow-up Period',
        'messageOverride': false,
        'active': false
      },
      {
        'armVisitId': 25,
        'studyARMId': 0,
        'studyARMName': 'UnitTest1-ARMName-1',
        'visitNumber': 'FollowUp26',
        'sequence': 26,
        'week': 5,
        'day': 32,
        'minTolerence': -3,
        'maxTolerence': 5,
        'periodTypeId': 3,
        'periodTypeName': 'Follow-up Period',
        'messageOverride': false,
        'active': false
      }
    ]
  }
]
const mockStudy = (arms: IStudyArm[], id = 0): Study => {
  return new Study({
    id: id,
    campaignType: 0,
    studyTitle: 'studyTitle',
    therapeuticArea: 'therapeuticArea',
    indication: 'indication',
    studyDrug: 'studyDrug',
    startDate: 'startDate',
    endDate: true,
    userId: 0,
    clientId: 0,
    sponsorId: 0,
    sponsorName: false,
    referralGoal: 0,
    enrollmentGoals: 0,
    studyStatus: 0,
    studyStatusName: 'studyStatusName',
    totalRow: 'totalRow',
    studiesProtocolDto: 'studiesProtocolDto',
    refStatus: true,
    referralStatus: true,
    ivrno: 0,
    isPatientMessaging: 'isPatientMessaging',
    isWarmTransfer: false,
    isRiskShared: false,
    hasPurchasedSponsor: false,
    studyRoute: 'studyRoute',
    arms: arms,
  })
}
const mockPatients = (study: Study): IPatientData[] => {
  // Assign study id
  return [
    {
      'referralId': 250,
      'siteUserId': 0,
      'firstName': 'Test',
      'middleName': '',
      'lastName': 'Test',
      'emailAddress': '',
      'homePhoneNumber': '',
      'cellPhoneNumber': '',
      'address': '',
      'city': '',
      'zip': '',
      'state': '',
      'country': '',
      'careGiverEmailAddress': '',
      'preferredCallBackTime': '',
      'timeZone': '',
      'permissionLeaveMessage': true,
      'ivrno': '19',
      'applicableProtocolNo': '',
      'siteId': 0,
      'randomizationDate': '2021-07-15T04:00:00',
      'eventType': 'Visit Complete',
      'eventStatus': 'Complete - Randomized',
      'referralStatus': 'Randomized',
      'owner': 'CTM',
      'uploadUserId': 0,
      'referralVisits': [
        {
          'referralId': 250,
          'armVisitId': 0,
          'visitNumber': '1',
          'appointmentDate': '2021-11-25T13:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 1',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 1,
          'visitNumber': '2',
          'appointmentDate': '2021-11-26T20:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 2',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 2,
          'visitNumber': '3',
          'appointmentDate': '2021-11-27T23:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 3',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 3,
          'visitNumber': '4',
          'appointmentDate': '2021-11-28T14:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 4',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 4,
          'visitNumber': '5',
          'appointmentDate': '2021-11-29T18:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 5',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 5,
          'visitNumber': '6',
          'appointmentDate': '2021-11-30T23:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 6',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 6,
          'visitNumber': '7',
          'appointmentDate': '2021-12-01T17:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 7',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 7,
          'visitNumber': '8',
          'appointmentDate': '2021-12-02T15:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 8',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 8,
          'visitNumber': '9',
          'appointmentDate': '2021-12-03T15:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 9',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 9,
          'visitNumber': '10',
          'appointmentDate': '2021-12-04T23:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 10',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 10,
          'visitNumber': '11',
          'appointmentDate': '2021-12-05T14:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 11',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 11,
          'visitNumber': '12',
          'appointmentDate': '2021-12-06T22:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 12',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 12,
          'visitNumber': '13',
          'appointmentDate': '2021-12-07T13:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 13',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 13,
          'visitNumber': '14',
          'appointmentDate': '2021-12-08T22:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 14',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 14,
          'visitNumber': '15',
          'appointmentDate': '2021-12-09T22:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 15',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 15,
          'visitNumber': '16',
          'appointmentDate': '2021-12-10T14:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 16',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 16,
          'visitNumber': '17',
          'appointmentDate': '2021-12-11T22:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 17',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 17,
          'visitNumber': '18',
          'appointmentDate': '2021-12-12T23:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 18',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 18,
          'visitNumber': '19',
          'appointmentDate': '2021-12-13T16:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 19',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 19,
          'visitNumber': '20',
          'appointmentDate': '2021-12-14T17:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 20',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 20,
          'visitNumber': '21',
          'appointmentDate': '2021-12-15T18:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 21',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 21,
          'visitNumber': '22',
          'appointmentDate': '2021-12-16T19:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 22',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 22,
          'visitNumber': '23',
          'appointmentDate': '2021-12-17T15:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 23',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 23,
          'visitNumber': '24',
          'appointmentDate': '2021-12-18T15:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 24',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 250,
          'armVisitId': 24,
          'visitNumber': '1',
          'appointmentDate': '2021-12-19T15:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Follow Up',
          'periodTypeId': '3',
          'periodTypeName': 'Follow-up Period'
        },
        {
          'referralId': 250,
          'armVisitId': 25,
          'visitNumber': '2',
          'appointmentDate': '2021-12-20T18:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Follow Up 2',
          'periodTypeId': '3',
          'periodTypeName': 'Follow-up Period'
        }
      ]
    },
    {
      'referralId': 2170,
      'siteUserId': 0,
      'firstName': 'Test_LastName',
      'middleName': '',
      'lastName': 'LastName',
      'emailAddress': '',
      'homePhoneNumber': '',
      'cellPhoneNumber': '',
      'address': '',
      'city': '',
      'zip': '',
      'state': '',
      'country': '',
      'careGiverEmailAddress': '',
      'preferredCallBackTime': '',
      'timeZone': '',
      'permissionLeaveMessage': true,
      'ivrno': '158',
      'applicableProtocolNo': '',
      'siteId': 0,
      'randomizationDate': '2021-08-31T04:00:00',
      'eventType': 'Visit Complete',
      'eventStatus': 'Complete - Randomized',
      'referralStatus': 'Randomized',
      'owner': 'CTM',
      'uploadUserId': 0,
      'referralVisits': [
        {
          'referralId': 2170,
          'armVisitId': 0,
          'visitNumber': '1',
          'appointmentDate': '2021-11-13T19:00:00+00:00',
          'appointmentStatus': 'Completed',
          'notes': '',
          'visitLabel': 'Visit 1',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 1,
          'visitNumber': '2',
          'appointmentDate': '2021-11-14T14:00:00+00:00',
          'appointmentStatus': 'Completed',
          'notes': '',
          'visitLabel': 'Visit 2',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 2,
          'visitNumber': '3',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 3',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 3,
          'visitNumber': '4',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 4',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 4,
          'visitNumber': '5',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 5',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 5,
          'visitNumber': '6',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 6',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 6,
          'visitNumber': '7',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 7',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 7,
          'visitNumber': '8',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 8',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 8,
          'visitNumber': '9',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 9',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 9,
          'visitNumber': '10',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 10',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 10,
          'visitNumber': '11',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 11',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 11,
          'visitNumber': '12',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 12',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 12,
          'visitNumber': '13',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 13',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 13,
          'visitNumber': '14',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 14',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 14,
          'visitNumber': '15',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 15',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 15,
          'visitNumber': '16',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 16',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 16,
          'visitNumber': '17',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 17',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 17,
          'visitNumber': '18',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 18',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 18,
          'visitNumber': '19',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 19',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 19,
          'visitNumber': '20',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 20',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 20,
          'visitNumber': '21',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 21',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 21,
          'visitNumber': '22',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 22',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 22,
          'visitNumber': '23',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 23',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 23,
          'visitNumber': '24',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 24',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 24,
          'visitNumber': '1',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Follow Up',
          'periodTypeId': '3',
          'periodTypeName': 'Follow-up Period'
        },
        {
          'referralId': 2170,
          'armVisitId': 25,
          'visitNumber': '2',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Follow Up 2',
          'periodTypeId': '3',
          'periodTypeName': 'Follow-up Period'
        }
      ]
    },
    {
      'referralId': 2733,
      'siteUserId': 0,
      'firstName': 'Evelyn',
      'middleName': '',
      'lastName': 'Roberts',
      'emailAddress': '',
      'homePhoneNumber': '',
      'cellPhoneNumber': '',
      'address': '',
      'city': '',
      'zip': '',
      'state': '',
      'country': '',
      'careGiverEmailAddress': '',
      'preferredCallBackTime': '',
      'timeZone': '',
      'permissionLeaveMessage': true,
      'ivrno': '',
      'applicableProtocolNo': '',
      'siteId': 0,
      'randomizationDate': '2021-11-16T13:58:00.2133333',
      'eventType': 'Pre-Qualified',
      'eventStatus': 'Complete - Randomized',
      'referralStatus': 'Randomized',
      'owner': 'CTM',
      'uploadUserId': 0,
      'referralVisits': [
        {
          'referralId': 2733,
          'armVisitId': 0,
          'visitNumber': '1',
          'appointmentDate': '2021-11-17T15:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 1',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 1,
          'visitNumber': '2',
          'appointmentDate': '2021-11-18T20:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 2',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 2,
          'visitNumber': '3',
          'appointmentDate': '2021-11-19T15:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 3',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 3,
          'visitNumber': '4',
          'appointmentDate': '2021-11-20T18:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 4',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 4,
          'visitNumber': '5',
          'appointmentDate': '2021-11-21T15:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 5',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 5,
          'visitNumber': '6',
          'appointmentDate': '2021-11-22T14:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 6',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 6,
          'visitNumber': '7',
          'appointmentDate': '2021-11-23T16:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 7',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 7,
          'visitNumber': '8',
          'appointmentDate': '2021-11-24T21:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 8',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 8,
          'visitNumber': '9',
          'appointmentDate': '2021-11-25T21:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 9',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 9,
          'visitNumber': '10',
          'appointmentDate': '2021-11-26T23:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 10',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 10,
          'visitNumber': '11',
          'appointmentDate': '2021-11-27T17:00:00+00:00',
          'appointmentStatus': 'Scheduled',
          'notes': '',
          'visitLabel': 'Visit 11',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 11,
          'visitNumber': '12',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 12',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 12,
          'visitNumber': '13',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 13',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 13,
          'visitNumber': '14',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 14',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 14,
          'visitNumber': '15',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 15',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 15,
          'visitNumber': '16',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 16',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 16,
          'visitNumber': '17',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 17',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 17,
          'visitNumber': '18',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 18',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 18,
          'visitNumber': '19',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 19',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 19,
          'visitNumber': '20',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 20',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 20,
          'visitNumber': '21',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 21',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 21,
          'visitNumber': '22',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 22',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 22,
          'visitNumber': '23',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 23',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 23,
          'visitNumber': '24',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Visit 24',
          'periodTypeId': '2',
          'periodTypeName': 'Treatment Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 24,
          'visitNumber': '1',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Follow Up',
          'periodTypeId': '3',
          'periodTypeName': 'Follow-up Period'
        },
        {
          'referralId': 2733,
          'armVisitId': 25,
          'visitNumber': '2',
          'appointmentDate': '',
          'appointmentStatus': 'Pending',
          'notes': '',
          'visitLabel': 'Follow Up 2',
          'periodTypeId': '3',
          'periodTypeName': 'Follow-up Period'
        }
      ]
    }
  ].map(p => {
    const pp: IPatientData = p
    pp.studyId = study.id
    return pp
  })
}
