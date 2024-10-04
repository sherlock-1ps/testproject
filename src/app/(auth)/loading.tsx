'use client'

import Loader from '@/components/base/ui/loader'
import { cn } from '@/utils/cn'

const Loading = () => {
  return (
    <div className={cn(`flex min-h-content w-full flex-1 items-center justify-center`)}>
      <Loader />
    </div>
  )
}

export default Loading
