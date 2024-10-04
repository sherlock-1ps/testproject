'use client'

import type { FC } from 'react'

import { cn } from '@/utils/cn'

interface ILoaderProps {
  className?: string
  containerClassName?: string
  logoClassName?: string
}

const Loader: FC<ILoaderProps> = ({ className, containerClassName, logoClassName }) => {
  return (
    <div
      className={cn(
        `relative inline-block`,
        `before:-left-0.5 before:-top-0.5 before:absolute before:h-[calc(100%_+_4px)] before:w-[calc(100%_+_4px)]`,
        `before:animate-loader before:rounded-full before:bg-[length:300%] before:bg-loader-gradient`,
        `after:-left-0.5 after:-top-0.5 after:absolute after:h-[calc(100%_+_4px)] after:w-[calc(100%_+_4px)]`,
        `after:animate-loader after:rounded-full after:bg-[length:300%] after:bg-loader-gradient`,
        `after:blur-xl`,
        className,
      )}
    >
      <div
        className={cn(
          `relative z-10 size-24 rounded-full bg-background shadow`,
          `flex items-center justify-center`,
          containerClassName,
        )}
      >
        <img src="/logo.png" alt="" className={cn(`size-14`, logoClassName)} />
      </div>
    </div>
  )
}

export default Loader
