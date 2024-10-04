'use client'

import { useLingui } from '@lingui/react'
import { Card, Typography } from 'antd'
import type { TitleProps } from 'antd/es/typography/Title'
import type { FC, PropsWithChildren } from 'react'

import SwitchLanguageDropdown from '@/components/layouts/backoffice/header/switch-language-dropdown'
import { cn } from '@/utils/cn'

interface IUnauthCardProps extends PropsWithChildren {
  title?: string
  titleLevel?: TitleProps['level']
  className?: string
  isDescription?: boolean
}

const UnauthCard: FC<IUnauthCardProps> = ({
  title = 'Title',
  titleLevel = 3,
  isDescription = true,
  className,
  children,
}) => {
  const { _ } = useLingui()

  return (
    <div className={cn(`relative flex w-full max-w-96 flex-col items-center overflow-hidden`, className)}>
      <img src="/logo.png" alt="" className={cn(`w-20`)} />

      {/* TODO: */}
      {/* {isDescription ? (
        <div className={cn(`relative mt-8 w-full`)}>
          <Typography className={cn(`text-center`)}>
            {_(msg`We have been providing online gambling services for a long time`)}
          </Typography>
        </div>
      ) : null} */}

      <Card
        className={cn(`!mt-10 w-full`, {
          '!mt-8': isDescription,
        })}
      >
        <Typography.Title level={titleLevel} color="white">
          {title}
        </Typography.Title>

        {children}
      </Card>

      <SwitchLanguageDropdown className={cn(`mt-4 self-end hover:bg-transparent`)} isCaret />
    </div>
  )
}

export default UnauthCard
