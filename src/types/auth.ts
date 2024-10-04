import type { Permission } from '@/enums/permission'

export interface ISignInPayload {
  username: string
  password: string
}

export interface ISignInResponse {
  isSetPassword: boolean
  isSetPin: boolean
  token: string
}

export interface IAuthSetPasswordPayload {
  confirmPassword?: string
  password: string
  token: string
}

export interface IAuthSetPinPayload {
  pin: string
  token: string
}

export interface ISignInWithPinPayload extends IAuthSetPinPayload {}

export interface IAuthProfile {
  agentCredit: string
  agentId: string
  id: string
  name: string
  username: string
  permission: Permission[]
}

export interface ISignInAsData {
  agentName: string
  agentPrefix: string
  token: string
}
