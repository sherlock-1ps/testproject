'use client'

import Loader from '@/components/base/ui/loader'
import { cn } from '@/utils/cn'

const Loading = () => {
  return (
    <div className={cn(`flex min-h-screen w-full items-center justify-center`)}>
      <Loader />
    </div>
  )
}

export default Loading
