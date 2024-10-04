'use client'

import type { FC, PropsWithChildren } from 'react'

import { cn } from '@/utils/cn'

interface IContainerProps extends PropsWithChildren {
  size?: 'fluid' | 'contain'
  className?: string
}

const Container: FC<IContainerProps> = ({ size = 'contain', className, children }) => {
  return (
    <div
      className={cn(
        {
          'mx-auto max-w-7xl': size === 'contain',
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Container
