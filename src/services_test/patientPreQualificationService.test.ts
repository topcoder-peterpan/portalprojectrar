import PatientPreQualificationService from '../services/patientPreQualificationService'

describe('PatientPreQualification Service', () => {

  it('PatientPreQualificationS Service should be done', async () => {
    const data = await PatientPreQualificationService.getPatientPreQualification(17, 2736, null)
    if(data.data?.length >= 0){
      expect(data.data.length).toEqual(0)
    }
  })

  it('PatientPreQualificationS Service should be done', async () => {
    const data = await PatientPreQualificationService.getPatientPreQualification(17, 2741, null)
    if(data.data?.length >= 0){
      expect(data.data.length).toEqual(0)
    }
  })

})