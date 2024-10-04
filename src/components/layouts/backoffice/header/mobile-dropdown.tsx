'use client'
import { Divider, Dropdown, Skeleton, Typography } from 'antd'
import type { FC, ReactElement } from 'react'
import { Fragment, cloneElement, useState } from 'react'

import AvatarIcon from '@/components/base/icons/avatar-icon'
import { useAuth } from '@/hooks/auth/use-auth'
import { useUserDropdownConfig } from '@/hooks/use-user-dropdown-config'
import { cn } from '@/utils/cn'
import { CaretDownOutlined } from '@ant-design/icons'
import UserCredit from './user-credit'

interface IMobileDropdownProps {
  className?: string
}

const MobileDropdown: FC<IMobileDropdownProps> = ({ className }) => {
  const { profile } = useAuth()
  const { items, modals } = useUserDropdownConfig()

  // _State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        overlayStyle={{
          minWidth: 180,
        }}
        onOpenChange={setOpen}
        open={open}
        className={cn(className)}
        dropdownRender={(menu) => (
          <div
            className={cn(
              `rounded border bg-popup`,
              '[&>.ant-dropdown-menu]:!border-0',
              '[&>.ant-dropdown-menu]:!rounded-none',
            )}
          >
            <div className={cn(`flex flex-col`)}>
              {/* User Info like `user-dropdown.tsx` */}
              <div className={cn(`p-1`)}>
                <div className={cn(`flex items-center gap-2`, `px-3 py-2`)}>
                  <AvatarIcon className={cn(`overflow-hidden rounded-full text-[28px]`)} />
                  <div className={cn(`flex max-w-56 flex-1 flex-col truncate`)}>
                    <Typography.Text className={cn(`!text-white`, `truncate`)}>{profile?.username}</Typography.Text>
                    <Typography.Text type="secondary" className={cn(`!text-sm capitalize`, `truncate`)}>
                      {profile?.name}
                    </Typography.Text>
                  </div>
                </div>
              </div>

              <Divider style={{ margin: 0 }} />

              <div className={cn(`p-1`)}>
                <UserCredit className={cn(`px-3 py-2`)} isIcon={false} />
              </div>
            </div>
            <Divider className={cn(`!m-0`)} />
            {cloneElement(menu as ReactElement)}
          </div>
        )}
      >
        <button className={cn(`flex h-full items-center space-x-2 px-3 hover:bg-white/5`)} role="button">
          {!profile ? (
            <Skeleton.Avatar size={28} className={cn(`!inline-flex`)} />
          ) : (
            <AvatarIcon className={cn(`overflow-hidden rounded-full text-[28px]`)} />
          )}
          <CaretDownOutlined className={cn(`size-4`)} />
        </button>
      </Dropdown>

      {modals}
    </Fragment>
  )
}

export default MobileDropdown
