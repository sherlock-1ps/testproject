import type { FC, PropsWithChildren } from 'react'

import { cn } from '@/utils/cn'

interface IBackofficePageContentProps extends PropsWithChildren {
  className?: string
}

const BackofficePageContent: FC<IBackofficePageContentProps> = ({ children, className }) => {
  return <div className={cn(`[&>*]:z-0`, `p-4 lg:p-6`, `space-y-4 lg:space-y-6`, className)}>{children}</div>
}

export default BackofficePageContent
