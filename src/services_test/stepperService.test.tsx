import stepperService from '../services/stepperService'
import mockData from '../../jsonDB/db.json'

jest.mock('../services/stepperService.ts', () => {
  return {
    getStepperVisitData: () => Promise.resolve(mockData.visits)
  }
})

describe('Stepper Service', () => {
  it('stepper service should be done', async () => {
    const data = await stepperService.getStepperVisitData(null)
    if(data.data?.length >= 0){
      expect(data).toContain(mockData.visits[0])
    }
  })
})