import axios from 'axios'
import { QueryClient } from '@tanstack/react-query'
import { getCookie } from './cookie'

const BASIC_HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

/**
 * This is general api client which will be used for most of the stuff
 */
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: BASIC_HEADER,
})

apiClient?.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${getCookie('access')}`
  }

  return config
})

/**
 * This is for user specific requests
 */
export const userClient = axios.create({
  baseURL: process.env.REACT_APP_USER_BASE_URL,
  headers: BASIC_HEADER,
})

/**
 * This is for token specific requests
 */
export const tokenClient = axios.create({
  baseURL: process.env.REACT_APP_TOKEN_BASE_URL,
  headers: BASIC_HEADER,
})

/**
 * Api client for v1 where NO token is required
 */

export const v1ApiClientWithoutToken = axios.create({
  baseURL: process.env.REACT_APP_V1_API_URL,
  headers: BASIC_HEADER,
})

/**
 * Api client for v1 where token is required (below end point have interceptor with token)
 */

export const v1ApiClient = axios.create({
  baseURL: process.env.REACT_APP_V1_API_URL,
  headers: BASIC_HEADER,
})
v1ApiClient?.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${getCookie('access')}`
  }

  return config
})

export const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })
