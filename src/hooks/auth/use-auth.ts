import { useCallback } from 'react'

import type { Permission } from '@/enums/permission'
import { useAuthStore } from '@/stores/auth'

/**
 * useAuth
 * - ใช้ในการ GET State และ transform ข้อมูลจาก AuthStore ง่ายๆ
 * - จะไม่มี action ใน hook ตัวนี้
 */
export const useAuth = () => {
  const { isAuth, isSignInAs } = useAuthStore()
  const _isAuth = isAuth()
  const _isSignInAs = isSignInAs()
  const { profile } = useAuthStore.getState() // ใช้งานได้ทั้ง SSR + CSR

  // _Callback
  const getMeHasPermission = useCallback(
    (permission: Permission[]) => {
      const profilePermission = profile?.permission ?? []
      return profilePermission.some((e) => permission.includes(e))
    },
    [profile],
  )

  return {
    isAuth: _isAuth,
    isSignInAs: _isSignInAs,
    profile,
    signInData: useAuthStore.getState().signInData, // ใช้งานได้ทั้ง SSR + CSR
    accessToken: useAuthStore.getState().accessToken,
    //
    getMeHasPermission,
  }
}
