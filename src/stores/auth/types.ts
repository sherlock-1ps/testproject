import type { IAuthProfile, ISignInResponse } from '@/types/auth'

export interface IAuthState {
  signInData: ISignInResponse
  prevAccessToken: string
  accessToken: string | null
  profile: IAuthProfile
  isAuth: () => boolean
  isSignInAs: () => boolean
}

export interface IAuthActions {
  setSignInData: (data: ISignInResponse) => void
  clearSignInData: VoidFunction
  setAccessToken: (token: string) => void
  setProfile: (profile: IAuthProfile) => void
  clearAuth: VoidFunction
  setSignInAsData: (token: string) => void
  setPrevAccessToken: (token: string) => void
}
