import patientHistoryService from '../services/patientHistoryService'

describe('PatientHistory Service', () => {
  
  it('PatientHistory service should be done', async () => {
    const data = await patientHistoryService.getPatientHistory(17, 2170, null)
    if(data.data?.length >= 0){
      expect(data.data.length).toEqual(4)
    }
  })

  it('PatientHistory service should be done', async () => {
    const data = await patientHistoryService.getPatientHistory(17, 2734, null)
    if(data.data?.length >= 0){
      expect(data.data.length).toEqual(4)
    }
  })

})