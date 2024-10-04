import type { Key, ReactNode } from 'react'

import type { MenuProps } from 'antd'

import type { Permission } from '@/enums/permission'

type MenuItem = Required<MenuProps>['items'][number]

export const getMenuItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  onClick?: () => void,
  children?: MenuItem[],
  type?: 'group',
  permission?: Permission,
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
    permission,
  } as MenuItem
}
