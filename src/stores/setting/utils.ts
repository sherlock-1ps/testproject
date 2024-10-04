import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import type { StorageValue } from 'zustand/middleware'

import { DEFAULT_LANG } from '@/constants/config'
import { STORE_KEY } from '@/constants/stores'
import { convertRequestCookieArrayToMap, getCookieNameByStoreKey } from '@/utils/storage'
import { decryptAESDeserialize } from '@/utils/storage/deserialize'
import type { ISettingState } from './types'

const DEFAULT_SETTING_DATA: ISettingState = {
  isCollapsed: false,
  lang: DEFAULT_LANG,
}

export const deserializeSettingSsr = (value: string): string => {
  const tokens = decryptAESDeserialize({
    value,
  })
  return tokens
}

export const getSettingSsr = (cookies: RequestCookie[]): ISettingState => {
  const mapCookies = convertRequestCookieArrayToMap(cookies)
  const key = getCookieNameByStoreKey(STORE_KEY.setting.key)
  if (!mapCookies.has(key)) return DEFAULT_SETTING_DATA
  const data = deserializeSettingSsr(mapCookies.get(key).value)
  const values = JSON.parse(data) as StorageValue<ISettingState>
  return {
    isCollapsed: values?.state?.isCollapsed ?? DEFAULT_SETTING_DATA.isCollapsed,
    lang: values?.state?.lang ?? DEFAULT_SETTING_DATA.lang,
  }
}
