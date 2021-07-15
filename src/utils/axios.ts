import axios, { AxiosInstance } from 'axios'

//export const baseURL = REACT_APP_API_HOST;
const baseURL = ''

const baseApi = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const createAxiosRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, (error) => {
    throw error
  })
}

const createAxiosResponseInterceptor = (axiosInstance: AxiosInstance) => {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error)
      }

      /**
       * When response status is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axiosInstance.interceptors.response.eject(interceptor)

      return axiosInstance.post('/pauth/login/refresh', {
        refresh_token: localStorage.getItem('refreshToken'),
      })
        .then((response) => {
          localStorage.setItem('token', response.data.access_token)
          error.response.config.headers.Authorization =
            response.data.access_token

          return axiosInstance(error.response.config)
        })
        .catch((err) => {
          localStorage.clear()
          window.location.href = '/login'

          return Promise.reject(err)
        })
        .finally(() => createAxiosResponseInterceptor(axiosInstance))
    }
  )
}

createAxiosRequestInterceptor(baseApi)
createAxiosResponseInterceptor(baseApi)

export const createApiClient = () => {
  const api = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  createAxiosRequestInterceptor(api)
  createAxiosResponseInterceptor(api)

  return api
}

export default baseApi
