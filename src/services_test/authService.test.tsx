import authService from '../services/authService'

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      post: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      }
    }))
  }
})

describe('Login Service', () => {
  const emailAddress = 'test@gmail.com'
  const userPassword = 'CTMstudymax21'
  it('Login should show No User', async () => {
    const data = await authService.login(emailAddress, userPassword)
    expect(data).toEqual('No user')
  })
})
