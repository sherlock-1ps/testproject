'use client'

import Loader from '@/components/base/ui/loader'
import { cn } from '@/utils/cn'

const Loading = () => {
  return (
    <div className={cn(`flex min-h-screen w-full items-center justify-center`)}>
      <Loader containerClassName={cn(`size-32`)} logoClassName={cn(`size-20`)} />
    </div>
  )
}

export default Loading
