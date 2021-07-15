import uploadService from '../services/uploadService'

const uploadData  = {
  studyId: 17,
  siteId: 45,
  headerData: {
    cellPhone: 'mobile_phone',
    emailAddress: 'email',
    firstname: 'first_name',
    lastname: 'last_name',
    randomizationDate: 'randomDate',
    zip: 'zip',
  },
  base64String : 'bm8sZmlyc3RfbmFtZSxsYXN0X25hbWUsYWRkcmVzcyxjaXR5LHN0YXRlLHppcCx0aW1lem9uZSxwZXJtaXNzaW9uLGhvbWVfcGhvbmUsbW9iaWxlX3Bob25lLGVtYWlsLGNhbGxiYWNrX3RpbWUscHJvdG9jb2wsY2FyZWdpdmVyX25hbWUsY2FyZWdpdmVyX251bWJlcixjYXJlZ2l2ZXJfZW1haWwscmFuZG9tRGF0ZQ0KMSxNaXJhY2xlLFN0YW50b24sMTIzNCBUeXNvbnMgQmx2ZCxNY0xlYW4sVkEsMjI5MDgsKEdNVCAtNTowMCkgRWFzdGVybiBUaW1lIChVUyAmIENhbmFkYSksWWVzLCgxMTEpIDIyMi0zMzMzLCgxMTEpIDIyMi0zMzMzLGpzbWl0aEBnbWFpbC5jb20sRXZlbmluZywxMjM0NTYsTWlyYWNsZSBTdGFudG9uLCgxMTEpIDIyMi0zMzMzLGpzbWl0aDEyM0BnbWFpbC5jb20sMTIvMi8yMDIxDQoyLEphbmEsQ2h1cmNoLDIzNDUgVHlzb25zIEJsdmQsTWNMZWFuLFZBLDIyMTgwLChHTVQgLTU6MDApIEVhc3Rlcm4gVGltZSAoVVMgJiBDYW5hZGEpLFllcywoMTExKSAyMjItMzMzMywsanN0ZWh5QGdtYWlsLmNvbSxFdmVuaW5nLDIzNDU2NyxKYW5hIENodXJjaCwoMTExKSAyMjItMzMzMyxqc21pdGgyMzRAZ21haWwuY29tLDEyLzMvMjAyMQ0KMyxMZW8sQm90aG1hbiwzNDU2IFR5c29ucyBCbHZkLE1jTGVhbixWQSwxMjAzMSwoR01UIC01OjAwKSBFYXN0ZXJuIFRpbWUgKFVTICYgQ2FuYWRhKSxZZXMsKDExMSkgMjIyLTMzMzMsKDExMSkgMjIyLTMzMzMsanNtaXRoZ21haWwuY29tLEV2ZW5pbmcsMzQ1Njc4LExlbyBCb3RobWFuLCgxMTEpIDIyMi0zMzMzLGpzbWl0aDM0NUBnbWFpbC5jb20sMTIvNC8yMDIxDQo0LE5vbGFuLEFtaW5vZmYsNDU2NyBUeXNvbnMgQmx2ZCxNY0xlYW4sVkEsMTkwMjIsKEdNVCAtNTowMCkgRWFzdGVybiBUaW1lIChVUyAmIENhbmFkYSksWWVzLCgxMTEpIDIyMi0zMzMzLCgxMTEpIDIyMi0zMzMzLCxFdmVuaW5nLDQ1Njc4OSxOb2xhbiBBbWlub2ZmLCgxMTEpIDIyMi0zMzMzLGpzbWl0aDQ1NkBnbWFpbC5jb20sMTIvNS8yMDIxDQo='
}

const expectedResult = [
  {
    emailAddress: 'jsmithgmail.com',
    firstname: 'Leo',
    lastname: 'Bothman',
    result: 'The EmailAddress field is not a valid e-mail address.'
  },
  {
    emailAddress: '',
    firstname: 'Nolan',
    lastname: 'Aminoff',
    result: 'The EmailAddress field is required.',
  }
]

describe('PatientUpload Service', () => {

  it('PatientUpload service should be done', async () => {
    const data = await uploadService.postPatientUpload( uploadData.studyId, uploadData.siteId,  uploadData.headerData, uploadData.base64String, null)
    
    if(data.data?.length >= 0) {
      expect(data.data.length).toEqual(3)
      expect(data.data[0].length).toEqual(2)
      expect(data.data[1].length).toEqual(0)
      expect(data.data[2].length).toEqual(2)
      expect(data.data[2][0]).toEqual(expectedResult[0])
      expect(data.data[2][1]).toEqual(expectedResult[1])
    }
  })
})