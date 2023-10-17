import axios from 'axios'
import { QueryClient } from '@tanstack/react-query'
import { getCookie } from './cookie'

/**
 * This is general api client which will be used for most of the stuff
 */
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient?.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getCookie('access')}`

  return config
})

/**
 * This is for user specific requests
 */
export const userClient = axios.create({
  baseURL: process.env.REACT_APP_USER_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })
