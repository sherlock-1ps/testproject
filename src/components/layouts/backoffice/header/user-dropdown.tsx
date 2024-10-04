'use client'

import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { CaretDownOutlined } from '@ant-design/icons'
import { Dropdown, Skeleton, Typography } from 'antd'

import AvatarIcon from '@/components/base/icons/avatar-icon'
import { useAuth } from '@/hooks/auth/use-auth'
import { useUserDropdownConfig } from '@/hooks/use-user-dropdown-config'
import { cn } from '@/utils/cn'

interface IUserDropdownProps {
  className?: string
}

const UserDropdown: FC<IUserDropdownProps> = ({ className }) => {
  const { profile } = useAuth()
  const { items, modals } = useUserDropdownConfig()

  // _State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        overlayStyle={{
          minWidth: 180,
        }}
        onOpenChange={setOpen}
        open={open}
        className={cn(className)}
      >
        <button className={cn(`flex h-full items-center space-x-2 px-3 hover:bg-white/5`)} role="button">
          {!profile ? (
            <Fragment>
              <Skeleton.Avatar size={28} className={cn(`!inline-flex`)} />
              <div className={cn(`hidden flex-col justify-center gap-1 text-left`, `lg:flex`)}>
                <Skeleton.Button className={cn(`!h-4 !min-h-0`)} />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <AvatarIcon className={cn(`text-[28px]`)} />
              <div className={cn(`hidden flex-col justify-center text-left`, `lg:flex`)}>
                <Typography.Text className={cn(`!text-white`)}>{profile?.username}</Typography.Text>
                <Typography.Text type="secondary" className={cn(`!text-sm capitalize`)}>
                  {profile?.name}
                </Typography.Text>
              </div>
              <CaretDownOutlined className={cn(`hidden size-4`, `lg:block`)} />
            </Fragment>
          )}
        </button>
      </Dropdown>

      {modals}
    </Fragment>
  )
}

export default UserDropdown
