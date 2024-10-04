import { useCallback } from 'react'

import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter as useNextRouter, usePathname } from 'next/navigation'
import nProgress from 'nprogress'

export const useRouter = () => {
  const router = useNextRouter()
  const pathname = usePathname()

  const replace = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (href !== pathname) nProgress.start()
      router.replace(href, options)
    },
    [router, pathname],
  )

  const push = useCallback(
    (href: string, options?: NavigateOptions) => {
      if (href !== pathname) nProgress.start()
      router.push(href, options)
    },
    [router, pathname],
  )

  return {
    ...router,
    replace,
    push,
  }
}
