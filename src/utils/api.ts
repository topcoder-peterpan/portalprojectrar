import authService from '../services/authService'

export const requestSuccess = (type: string) => `${type}/success`

export const requestPending = (type: string) => `${type}/pending`

export const requestFail = (type: string) => `${type}/fail`

export const isActionTypeFail = (actionType: unknown) => {
  if (actionType && typeof actionType === 'string') {
    return actionType.endsWith('/fail')
  }
  return true
}

export const handleApiError = async (error: any, history: any) => {
  if (!error || !error.response || !error.response.status)
    return
  if (error.response.status === 403 || error.response.status === 401) { // auth error
    if (history)
      history.push('/login')
    try {
      await authService.logout()
      localStorage.setItem('sessionEnded', 'true')
    } catch (e) { /* ignore error */ }
  }
}
