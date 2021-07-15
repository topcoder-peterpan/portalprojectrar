import retentionsService from '../services/retentionsService'

describe('Retention Service', () => {

  it('retention service should be done', async () => {
    const data = await retentionsService.getRetentions(17, null)
    if(data.data?.length >= 0){
      expect(data.data.length).toEqual(19)
    }
  })
})