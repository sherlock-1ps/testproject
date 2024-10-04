import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { DEFAULT_STORAGE_PREFIX } from '@/constants/stores'

/**
 * For Store
 */
export const getCookieNameByStoreKey = (key: string) => {
  return DEFAULT_STORAGE_PREFIX + '.' + key
}

/**
 * For Store
 */
export const convertRequestCookieArrayToMap = (cookies: RequestCookie[]): Map<string, RequestCookie> => {
  const mapCookies = new Map()
  cookies.forEach((cookie) => {
    mapCookies.set(cookie.name, cookie)
  })
  return mapCookies
}
