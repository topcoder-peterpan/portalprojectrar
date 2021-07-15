import PatientNoteDataService from '../services/patientNoteDataService'

describe('PatientNoteData Service', () => {

  it('PatientNoteData Service should be done', async () => {
    const data = await PatientNoteDataService.getPatientNoteData(17, 250, null)
    if(data.data?.length >= 0 ){
      expect(data.data.lengh).toEqual(0)
    }
  })
  
  it('PatientNoteData Service should be done', async () => {
    const data = await PatientNoteDataService.getPatientNoteData(17, 2736, null)
    if(data.data?.length >= 0){
      expect(data.data.lengh).toEqual(0)
    }
  })

})

describe('PatientNoteData Service', () => {

  it('PatientNoteData Service should be done', async () => {
    const data = await PatientNoteDataService.postPatientNoteData(1, 2736, 'test1', 'test2', true, null)
    if(data.data?.length >= 0 ){
      expect(data.data.referralId).toEqual(2736)
      expect(data.data.noteSubject).toEqual('test1')
      expect(data.data.noteText).toEqual('test2')
      expect(data.data.isPrivate).toEqual(true)
    }
  })
})
