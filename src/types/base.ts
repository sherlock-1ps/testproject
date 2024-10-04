import type { ErrorCode } from '@/enums/error'
import type { InternalNamePath } from 'antd/es/form/interface'
import type { Dayjs } from 'dayjs'
import type { RequestInit } from 'next/dist/server/web/spec-extension/request'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'

export interface IRequestConfig<ParamsType = any> extends Omit<RequestInit, 'method'> {
  params?: ParamsType
}

export interface IBaseResponseError {
  code: ErrorCode
  message?: string
}

export interface IBaseResponse<Result = never> {
  ok: boolean
  result?: Result
  error?: IBaseResponseError
}

export interface IFormValidatorRule {
  field: string
  fullField: string
  type: string
}

export interface ISelectItem {
  id: number
  name: string
}

export interface IBaseCreateResponse {
  id: number
}

export type DateRangeValue = RangeValueType<Date> | RangeValueType<Dayjs>

export interface ValidateErrorEntity<Values = any> {
  values: Values
  errorFields: {
    name: InternalNamePath
    errors: string[]
  }[]
  outOfDate: boolean
}
