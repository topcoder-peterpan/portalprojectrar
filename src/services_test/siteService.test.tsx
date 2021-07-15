import { AxiosResponse } from 'axios'

import siteService from 'services/siteService'
import { createApiClient } from 'utils/axios'

// mock data
const multiSiteData = [
  { id: 45, value: 'Tech Ops Test' },
  { id: 395, value: 'Tech Ops Test Canada Site' },
  { id: 396, value: 'Tech Ops Test Austrailia Site' },
  { id: 398, value: 'Tech Ops Test Canada Site 2' },
  { id: 399, value: 'Tech Ops Test Puerto Rico Site' },
]

const singleSiteData = [
  { id: 45, value: 'Tech Ops Test' },
]

const noSiteData: any = []

const multiStudyData = [
  { Id: 1 },
  { Id: 2},
  { Id: 3},
  { Id: 4},
  { Id: 255},
]

const singleStudyData = [
  { Id: 1 }
]

// mock responses
const multiResponse: AxiosResponse = {
  data: multiSiteData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
}

const singleResponse: AxiosResponse = {
  data: singleSiteData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
}

const emptyResponse: AxiosResponse = {
  data: noSiteData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
}

const multiStudyResponse: AxiosResponse = {
  data: multiStudyData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
}

const singleStudyResponse: AxiosResponse = {
  data: singleStudyData,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
}

const baseUrl = 'http://retention.studymax.ctmuat.com/api'

jest.mock('utils/axios', () => {
  const originalModule = jest.requireActual('utils/axios')
  // eslint-disable-next-line no-unused-labels
  const mockAxios = jest.fn(() => { get: jest.fn() })
  return {
    ...originalModule,
    createApiClient: () => mockAxios,
  }
})


describe('Site service', () => {
  it('[siteService.getSites] should return a single record when one site is returned', async () => {
    const mockedAxios = createApiClient()
    mockedAxios.get = jest.fn().mockResolvedValue(singleResponse)
    const testData = await siteService.getSites(1, null)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/user/GetUserSites/1`)
    expect(testData.length).toEqual(1)
    expect(testData).toEqual(singleSiteData)
  })

  it('[siteService.getSites] should return an empty array when no data returned', async () => {
    const mockedAxios = createApiClient()
    mockedAxios.get = jest.fn().mockResolvedValueOnce(emptyResponse)
    const testData = await siteService.getSites(1, null)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/user/GetUserSites/1`)
    expect(testData.length).toEqual(0)
    expect(testData).toEqual(noSiteData)
  })

  it('[siteService.getSites] should return multiple records when user has multiple sites assigned', async () => {
    const mockedAxios = createApiClient()
    mockedAxios.get = jest.fn().mockResolvedValueOnce(multiResponse)
    const testData = await siteService.getSites(1, null)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/user/GetUserSites/1`)
    expect(testData.length).toEqual(5)
    expect(testData).toEqual(multiSiteData)
  })

  it('[siteService.getSiteStudies] should return a single record when one study is returned from the api', async () => {
    const mockedAxios = createApiClient()
    mockedAxios.get = jest.fn().mockResolvedValueOnce(singleStudyResponse)
    const testData = await siteService.getSiteStudies(35, null)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/site/GetStudiesBySite?SiteId=35&search=&from=1&to=1000`)
    expect(testData.length).toEqual(1)
    expect(testData).toEqual([1])
  })

  it('[siteService.getSiteStudies] should return an empty array when no data returned', async () => {
    const mockedAxios = createApiClient()
    mockedAxios.get = jest.fn().mockResolvedValueOnce(emptyResponse)
    const testData = await siteService.getSiteStudies(35, null)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/site/GetStudiesBySite?SiteId=35&search=&from=1&to=1000`)
    expect(testData.length).toEqual(0)
    expect(testData).toEqual(noSiteData)
  })

  it('[siteService.getSiteStudies] should return multiple records when multiple studies are returned from the api', async () => {
    const mockedAxios = createApiClient()
    mockedAxios.get = jest.fn().mockResolvedValueOnce(multiStudyResponse)
    const testData = await siteService.getSiteStudies(35, null)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}/site/GetStudiesBySite?SiteId=35&search=&from=1&to=1000`)
    expect(testData.length).toEqual(5)
    expect(testData).toEqual([1, 2, 3, 4, 255])
  })
})
