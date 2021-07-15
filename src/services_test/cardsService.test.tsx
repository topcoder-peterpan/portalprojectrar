import cardsService from '../services/cardsService'

const cardData : string[] = [ 'NSCLC','Teva Migraine Pregnancy Registry','Tech Ops Test Study','ASPECT™' ]

describe('Card Service', () => {
  
  it('card service should be done', async () => {
    const data = await cardsService.getCards(null)
    if( data.data?.length >= 0 ) {
      expect(data.data.length).toEqual(4)
      expect(data.data[0].study).toEqual(cardData[0])
      expect(data.data[1].study).toEqual(cardData[1])
      expect(data.data[2].study).toEqual(cardData[2])
      expect(data.data[3].study).toEqual(cardData[3])
    }
  })
})