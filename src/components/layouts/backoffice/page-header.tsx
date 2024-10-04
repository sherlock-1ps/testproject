'use client'

import type { FC, PropsWithChildren, ReactNode } from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import type { BreadcrumbProps } from 'antd'
import { Breadcrumb, Grid, Typography } from 'antd'
import { omit } from 'lodash-es'
import Link from 'next/link'

import Button from '@/components/base/ui/button'
import { useRouter } from '@/hooks/use-router'
import { cn } from '@/utils/cn'

export interface BackofficePageHeaderProps extends PropsWithChildren {
  title?: ReactNode
  description?: string
  descriptionClassName?: string
  className?: string
  breadcrumbProps?: BreadcrumbProps
  // NOTE: ต้องส่งมาทั้งคู่ backHref เป็นเหมือน fallback
  backHref?: string
  isHistoryBack?: boolean
}

const BackofficePageHeader: FC<BackofficePageHeaderProps> = ({
  title,
  description,
  descriptionClassName,
  className,
  breadcrumbProps = null,
  backHref,
  isHistoryBack,
  children,
}) => {
  const { xs } = Grid.useBreakpoint()
  const router = useRouter()

  // _Event
  const handleHistoryBack = () => {
    if (window.history?.length && window.history.length > 1) {
      router.back()
    } else {
      router.replace(backHref || '/')
    }
  }

  return (
    <div className={cn(`px-4 pt-8 lg:px-6 lg:pt-10`)}>
      {breadcrumbProps && (
        <Breadcrumb className={cn(`!mb-3`, breadcrumbProps?.className)} {...omit(breadcrumbProps, ['className'])} />
      )}

      <div className={className}>
        <div className={cn(`space-y-2`)}>
          <div className={cn(`inline-flex items-center space-x-2`)}>
            {backHref ? (
              isHistoryBack ? (
                <Button
                  icon={<ArrowLeftOutlined className={cn(`!text-h2`)} />}
                  type="link"
                  size="small"
                  onClick={handleHistoryBack}
                />
              ) : (
                <Link href={backHref}>
                  <Button icon={<ArrowLeftOutlined className={cn(`!text-h2`)} />} type="link" size="small" />
                </Link>
              )
            ) : null}
            <Typography.Title level={xs ? 2 : 1} className={cn(`!text-white`)}>
              {title}
            </Typography.Title>
          </div>
          {description ? (
            <Typography.Paragraph className={cn(`!text-xl`, descriptionClassName)}>{description}</Typography.Paragraph>
          ) : null}
        </div>

        {children}
      </div>
    </div>
  )
}

export default BackofficePageHeader
