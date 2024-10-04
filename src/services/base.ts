import type { AxiosRequestConfig } from 'axios'

import Axios from '@/libs/axios'
import type { IBaseResponse } from '@/types/base'

export default class BaseService {
  protected static async _post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await Axios.post<IBaseResponse>(url, data, config)
      const { ok, result, error } = res.data
      if (!ok) {
        return Promise.reject(error)
      }
      return Promise.resolve(result)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
