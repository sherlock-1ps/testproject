'use client'

import type { FC } from 'react'

import { WalletOutlined } from '@ant-design/icons'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Typography } from 'antd'

import { useAuth } from '@/hooks/auth/use-auth'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/format/number'

interface IUserCreditProps {
  className?: string
  isIcon?: boolean
  isOnlyNumber?: boolean
}

const UserCredit: FC<IUserCreditProps> = ({ isIcon = true, isOnlyNumber = false, className }) => {
  const { _ } = useLingui()
  const { profile } = useAuth()

  return (
    <div className={cn(`flex items-center space-x-2 px-3`, className)}>
      {isIcon ? <WalletOutlined className={cn(`text-h3`)} /> : null}
      <Typography>
        {isOnlyNumber ? formatPrice(profile?.agentCredit) : _(msg`Credit: ${formatPrice(profile?.agentCredit)}`)}
      </Typography>
    </div>
  )
}

export default UserCredit
