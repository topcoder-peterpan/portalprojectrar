import listService from '../services/listService'
import mockData from '../../jsonDB/db.json'

jest.mock('../services/listService.ts', () => {
  return {
    getLists: () => Promise.resolve(mockData.lists)
  }
})

describe('List Service', () => {
  it('list service should be done', async () => {
    const data = await listService.getLists(null)
    if(data.data?.length > 0 ) {
      expect(data.data).toContain(mockData.lists[0])
    }
  })
})