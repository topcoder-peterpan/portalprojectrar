import patientContactService from '../services/patientContactService'


describe('PatientContacts Service', () => {

  it('PatientContacts service should be done', async () => {
    const data = await patientContactService.getPatientContacts(17, 2747, null)
    if(data !== null && data.data?.length >= 0) {
      expect(data.data.referralId).toEqual(2747)
      expect(data.data.firstName).toEqual('Ian')
      expect(data.data.lastName).toEqual('Johnson')
    }

  })

  it('PatientContacts service should be done', async () => {
    const data = await patientContactService.getPatientContacts(17, 2735, null)
    if(data !== null && data.data?.length >= 0) {
      expect(data.data.referralId).toEqual(2735)
      expect(data.data.firstName).toEqual('Kaylee')
      expect(data.data.lastName).toEqual('Rodriguez')
    }
  })

})