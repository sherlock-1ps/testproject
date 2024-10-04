'use client'

import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'

import type { Permission } from '@/enums/permission'
import { useAuth } from '@/hooks/auth/use-auth'

interface IPermissionProtectProps extends PropsWithChildren {
  permission: Permission[]
}

const PermissionProtect: FC<IPermissionProtectProps> = ({ permission, children }) => {
  const { getMeHasPermission } = useAuth()

  // _Memo
  const renderComp = useMemo(() => {
    const hasPermission = getMeHasPermission(permission)
    if (hasPermission) return children
    return null
  }, [children, getMeHasPermission, permission])

  return renderComp
}

export default PermissionProtect
