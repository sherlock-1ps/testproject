'use client'

import { HOME_PATH } from '@/constants/config'
import { Permission } from '@/enums/permission'
import { cn } from '@/utils/cn'
import { getMenuItem } from '@/utils/menu'
import { DesktopOutlined, KeyOutlined } from '@ant-design/icons'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { type MenuProps, Skeleton } from 'antd'
import { flattenDeep, range } from 'lodash-es'
import { usePathname } from 'next/navigation'
import type { Key, ReactNode } from 'react'
import { useMemo } from 'react'
import { useAuth } from './auth/use-auth'
import { useRouter } from './use-router'

interface IMenuItem {
  children?: IMenuItem[]
  icon?: ReactNode
  key?: Key
  label?: string
  onClick?: VoidFunction
  permission?: Permission
  type?: 'group'
}

export const useSidebarConfig = () => {
  const { _ } = useLingui()
  const router = useRouter()
  const pathname = usePathname()
  const { profile } = useAuth()

  // _Memo
  const items: MenuProps['items'] = useMemo(() => {
    return [
      getMenuItem(
        _(msg`Reports`),
        'group-reports',
        null,
        null,
        [
          getMenuItem(
            _(msg`Overall`),
            HOME_PATH.replace('/', ''),
            <DesktopOutlined />,
            () => {
              router.push(HOME_PATH)
            },
            null,
            null,
          ),
        ],
        'group',
      ),
      getMenuItem(
        _(msg`Admin`),
        'group-admin',
        null,
        null,
        [
          getMenuItem(
            _(msg`Manage roles`),
            'role',
            <KeyOutlined />,
            () => {
              router.push(`/role`)
            },
            null,
            null,
            Permission.ROLE_VIEW,
          ),
        ],
        'group',
      ),
    ]
  }, [_, router])

  const filterItemsWithPermission = useMemo(() => {
    return items
      .map((item: any) => {
        if (item.children) {
          return {
            ...item,
            children: item.children
              .map((e) => {
                if (e.children) {
                  return {
                    ...e,
                    children: e.children.filter(
                      (x) => typeof x.permission === 'undefined' || profile?.permission?.includes(x.permission),
                    ),
                  }
                }
                return e
              })
              .filter((e) => {
                return typeof e.permission === 'undefined' || profile?.permission?.includes(e.permission)
              }),
          }
        }
        return item
      })
      .map((e) => {
        return {
          ...e,
          children: e.children.filter((x) => {
            if (x.children !== null) return x.children?.length > 0
            else return true
          }),
        }
      })
      .filter((e) => e.children?.length > 0)
  }, [items, profile?.permission])

  const selectedKeys = useMemo(() => {
    return flattenDeep(
      items.map((e: any) => {
        if (e.children)
          return e.children.map((c) => {
            if (c.children) return [c.key, ...c.children.map((cc) => cc.key)]
            return c.key
          })
        return e.key as string
      }),
    ).filter((e) => {
      const pathnameSplit = pathname.split('/')
      const keySplit = e.split('/')

      const firstPathname = pathnameSplit?.[1]
      const firstKey = keySplit?.[0]

      if (firstPathname === firstKey) {
        return pathname.includes(e)
      }
    })
  }, [items, pathname])

  const selectedItem: IMenuItem = useMemo(() => {
    let item = null
    filterItemsWithPermission.forEach((permission) => {
      permission.children.forEach((itemPermission) => {
        if (itemPermission.children?.length > 0) {
          const subMenuSelected = itemPermission.children.find((e) => selectedKeys.includes(e.key))
          if (subMenuSelected) item = subMenuSelected
        }

        if (selectedKeys.includes(itemPermission.key) && !item) {
          item = itemPermission
        }
      })
    })
    return item
  }, [filterItemsWithPermission, selectedKeys])

  const itemsSkeleton: MenuProps['items'] = useMemo(() => {
    return range(0, 4).map((r) =>
      getMenuItem(
        <Skeleton.Input active className={cn(`!h-5 !min-h-0 !w-14 !min-w-0`)} />,
        `sk-group-${r}`,
        null,
        null,
        range(0, 3).map((n) =>
          getMenuItem(
            <div className={cn(`flex h-full items-center`)}>
              <Skeleton.Input active className={cn(`!h-6 !min-h-0 !w-full !min-w-0`)} />
            </div>,
            `sk-item-${r}-${n}`,
            <Skeleton.Avatar size={18} />,
            null,
            null,
            null,
          ),
        ),
        'group',
      ),
    )
  }, [])

  return {
    items: !profile ? itemsSkeleton : filterItemsWithPermission,
    selectedKeys,
    selectedItem,
  }
}
