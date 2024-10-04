import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { ErrorCode } from '@/enums/error'
import { useAuthStore } from '@/stores/auth'
import type { IBaseResponse } from '@/types/base'

/**
 * Create axios instance.
 */
const Axios: AxiosInstance = axios.create({
  baseURL: '/api',
})

/**
 * Axios also provides a request interceptor, allows changes to the request data before it is sent to the server
 * This is only applicable for request methods 'POST', 'PUT', 'PATCH' and 'DELETE'
 * The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
 * FormData or Stream
 * You may modify the headers object.
 */
Axios.interceptors.request.use(
  async (reqConfig) => {
    const config = reqConfig
    const { accessToken } = useAuthStore.getState()

    if (config.headers) {
      if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

Axios.interceptors.response.use(
  (res) => {
    const { error } = res.data as IBaseResponse
    if (error) console.log(`AXIOS INTERCEPTOR :`, error)
    if (error?.code === ErrorCode.UNAUTHORIZED || error?.code === ErrorCode.INVALID_AUTHORIZATION) {
      useAuthStore.getState().clearAuth()

      if (typeof window !== 'undefined') {
        // For clear cookies
        window.location.href = '/'
      }
    }

    return res
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default Axios
