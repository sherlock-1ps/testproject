import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import type { StorageValue } from 'zustand/middleware'

import type { IAuthState } from './types'
import { STORE_KEY } from '@/constants/stores'
import { convertRequestCookieArrayToMap, getCookieNameByStoreKey } from '@/utils/storage'
import { decryptAESDeserialize } from '@/utils/storage/deserialize'

export interface IGetAuthentication
  extends Pick<IAuthState, 'accessToken' | 'prevAccessToken' | 'profile' | 'signInData'> {
  isAuth: boolean
  isSignInAs: boolean
}

const DEFAULT_AUTHENTICATION_DATA: IGetAuthentication = {
  isAuth: false,
  accessToken: null,
  profile: null,
  signInData: null,
  isSignInAs: false,
  prevAccessToken: null,
}

export const deserializeAuthTokenSsr = (value: string): string => {
  const tokens = decryptAESDeserialize({
    value,
    secureKey: STORE_KEY.auth.secureKey,
  })
  return tokens
}

export const getAuthenticationSsr = (cookies: RequestCookie[]): IGetAuthentication => {
  const mapCookies = convertRequestCookieArrayToMap(cookies)
  const key = getCookieNameByStoreKey(STORE_KEY.auth.key)
  if (!mapCookies.has(key)) return DEFAULT_AUTHENTICATION_DATA
  const data = deserializeAuthTokenSsr(mapCookies.get(key).value)
  const values = JSON.parse(data) as StorageValue<IGetAuthentication>

  const accessToken = values?.state?.accessToken ?? DEFAULT_AUTHENTICATION_DATA.accessToken
  const profile = values?.state?.profile ?? DEFAULT_AUTHENTICATION_DATA.profile
  const signInData = values?.state?.signInData ?? DEFAULT_AUTHENTICATION_DATA.signInData
  const prevAccessToken = values?.state?.prevAccessToken ?? DEFAULT_AUTHENTICATION_DATA.prevAccessToken
  const isSignInAs = values?.state?.isSignInAs ?? DEFAULT_AUTHENTICATION_DATA.isSignInAs
  const isAuth = Boolean(accessToken)

  return {
    isAuth,
    accessToken,
    profile,
    signInData,
    isSignInAs,
    prevAccessToken,
  }
}
