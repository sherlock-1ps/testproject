'use client'

import { useEffect } from 'react'

import nProgress from 'nprogress'

import { HOME_PATH } from '@/constants/config'
import { useAuth } from '@/hooks/auth/use-auth'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { useRouter } from '@/hooks/use-router'
import { cn } from '@/utils/cn'
import { usePathname } from 'next/navigation'

const Layout = ({ children }) => {
  const { isAuth, signInData } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const { isMounted } = useIsMounted()

  // _Event
  const checkAuth = () => {
    if (isAuth) router.replace(HOME_PATH)

    nProgress.done()
  }

  const handlePinRoute = () => {
    if (!isAuth) {
      if (!signInData) {
        // Redirect to sign in page
        if (pathname !== '/') {
          router.replace('/')
        }
      } else {
        // Redirect to input pin page
        if (
          ((!signInData.isSetPassword && !signInData.isSetPin) || (!signInData.isSetPassword && signInData.isSetPin)) &&
          pathname !== '/pin'
        ) {
          router.replace('/pin')
        }

        // Redirect to set password page
        if (signInData.isSetPassword && pathname !== '/set-password') {
          router.replace('/set-password')
        }
      }
    }

    nProgress.done()
  }

  // _Effect
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    checkAuth()
  }, [isAuth])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handlePinRoute()
  }, [signInData])

  return (
    <div
      className={cn(`flex flex-1 items-center justify-center p-4`, `transition-opacity duration-300 ease-in-out`, {
        'opacity-0': !isMounted || isAuth,
      })}
    >
      {children}
    </div>
  )
}

export default Layout
