import { LOGIN } from '../constants/endpoint'
import baseApi from '../utils/axios'
import jwt, { JwtPayload } from 'jwt-decode'
import { AxiosResponse } from 'axios'
import { REACT_APP_API_HOST } from '../constants/env'

class AuthService {
  isAuthenticated = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token)
        return false
      const payload = jwt<JwtPayload>(token)
      if (payload.exp ? payload.exp : 0 * 1000 > new Date().getTime()) {
        //get profile data
        return true
      }
      this.logout()
      return false
    } catch (error) {
      if (error !== 'No user') {
        throw error
      }
      return false
    }
  }

  login = async (emailAddress: string, userPassword: string) => {
    const response: AxiosResponse<any> = await baseApi.post(REACT_APP_API_HOST + LOGIN, { emailAddress: emailAddress, userPassword: userPassword, userType: 2 })
    console.log('test--.', REACT_APP_API_HOST + LOGIN, { emailAddress: emailAddress, userPassword: userPassword, userType: 2 })
    if (response != null) {
      const userData = {
        'userName': response.data.UserName,
        'firstName': response.data.FirstName,
        'lastName': response.data.LastName,
        'email': response.data.EmailAddress,
        'phoneNumber': response.data.PhoneNumber,
        'userId': response.data.UserId,
        'userType': response.data.UserType,
        'associatedSite': response.data.AssociatedSite
      }
      localStorage.setItem('userData', JSON.stringify(userData))
      localStorage.setItem('userName', response.data.FirstName + ' ' + response.data.LastName)
      return response.data
    }
    return 'No user'
  }

  logout = async (navigateToLogin = true) => {
    delete baseApi.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
    localStorage.clear()
    if (navigateToLogin)
      window.location.assign('/login')
  }
}

const authService = new AuthService()

export default authService
