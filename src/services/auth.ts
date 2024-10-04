import { Permission } from '@/enums/permission'
import { useAuthStore } from '@/stores/auth'
import type {
  IAuthProfile,
  IAuthSetPasswordPayload,
  IAuthSetPinPayload,
  ISignInAsData,
  ISignInPayload,
  ISignInResponse,
  ISignInWithPinPayload,
} from '@/types/auth'
import type { AxiosRequestConfig } from 'axios'
import BaseService from './base'

export default class AuthService extends BaseService {
  /**
   * Sign In
   */
  static async signIn(payload: ISignInPayload) {
    // return await this._post<ISignInResponse>('/auth.signIn', payload)
    // TODO: mockup
    return await new Promise<ISignInResponse>((resolve) => {
      resolve({
        token: 'hvAjG81Fujiq0FTOSPkC6f7ZaaDS3ptSI1O4Wm0fI4E',
        isSetPassword: false,
        isSetPin: false,
      })
    })
  }

  /**
   * Set new password
   */
  static async setPassword(payload: IAuthSetPasswordPayload) {
    return await this._post<void>(
      '/auth.setPassword',
      {
        password: payload.password,
      },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    )
  }

  /**
   * Create pin
   */
  static async setPin(payload: IAuthSetPinPayload) {
    // return await this._post<void>(
    //   '/auth.setPin',
    //   {
    //     pin: payload.pin,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${payload.token}`,
    //     },
    //   },
    // )

    // TODO: mockup
    return await new Promise<void>((resolve) => {
      resolve()
    })
  }

  /**
   * Sign in with Pin
   */
  static async signInWithPin(payload: ISignInWithPinPayload) {
    // return await this._post<void>(
    //   '/auth.pinSignIn',
    //   {
    //     pin: payload.pin,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${payload.token}`,
    //     },
    //   },
    // )
    // TODO: mockup
    return await new Promise<void>((resolve) => {
      resolve()
    })
  }

  /**
   * Sign in as [AGENT]
   */
  static async signInAs(agentId: string) {
    const res = await this._post<ISignInAsData>('/agent.signInAs', {
      agentId,
    })
    useAuthStore.getState().setSignInAsData(res.token)
    return res
  }

  /**
   * Sign out
   */
  static async signOut() {
    // return await this._post<void>('/auth.signOut', {})
    // TODO: mockup
    return await new Promise<void>((resolve) => {
      resolve()
    })
  }

  /**
   * Get profile
   */
  static async profile(config?: AxiosRequestConfig) {
    // const profile = await this._post<IAuthProfile>('/auth.profile', {}, config)

    const profile: IAuthProfile = {
      id: '00000000-0000-0000-0000-000000000001',
      username: 'admin',
      name: 'admin',
      permission: [Permission.ROLE_CREATE, Permission.ROLE_VIEW, Permission.ROLE_DELETE, Permission.ROLE_UPDATE],
      agentId: '00000000-0000-0000-0000-000000000001',
      agentCredit: '9970767.53',
    }

    useAuthStore.getState().setProfile(profile)
    return profile
  }
}
