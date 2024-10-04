import Cookies from 'js-cookie'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { IAuthActions, IAuthState } from './types'
import { STORE_KEY } from '@/constants/stores'
import type { IAuthProfile, ISignInResponse } from '@/types/auth'
import { createCookieStorage } from '@/utils/storage/cookie-storage'

export const storage = createCookieStorage({
  secureKey: STORE_KEY.auth.secureKey,
  storage: Cookies,
})

export const useAuthStore = create<IAuthState & IAuthActions>()(
  persist(
    (set, get) => ({
      // State
      signInData: null,
      accessToken: null,
      profile: null,
      prevAccessToken: null,
      isAuth: () => Boolean(get()?.accessToken),
      isSignInAs: () => Boolean(get()?.prevAccessToken),

      // Action
      setAccessToken: (token: string) => {
        set((state) => ({
          ...state,
          accessToken: token,
        }))
      },
      setPrevAccessToken: (token: string) => {
        set((state) => ({
          ...state,
          prevAccessToken: token,
        }))
      },
      setProfile: (profile: IAuthProfile) => {
        set((state) => ({
          ...state,
          profile,
        }))
      },
      setSignInData: (data: ISignInResponse) => {
        set((state) => ({
          ...state,
          signInData: data,
        }))
      },
      clearSignInData: () => {
        set((state) => ({
          ...state,
          signInData: null,
        }))
      },
      setSignInAsData: (token: string) => {
        set((state) => ({
          ...state,
          prevAccessToken: state.prevAccessToken ?? state.accessToken,
          accessToken: token,
        }))
      },
      clearAuth: () => {
        set((state) => {
          return {
            signInData: null,
            accessToken: state.prevAccessToken || null,
            profile: null,
            prevAccessToken: null,
          }
        })
      },
    }),
    {
      name: STORE_KEY.auth.key,
      storage: createJSONStorage(() => storage),
    },
  ),
)
