'use client'

import { Fragment, useEffect } from 'react'

import { Trans, msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Divider, Skeleton } from 'antd'
import nProgress from 'nprogress'

import Button from '@/components/base/ui/button'
import BackofficeLayout from '@/components/layouts/backoffice'
import MobileDropdown from '@/components/layouts/backoffice/header/mobile-dropdown'
import SwitchLanguageDropdown from '@/components/layouts/backoffice/header/switch-language-dropdown'
import UserCredit from '@/components/layouts/backoffice/header/user-credit'
import UserDropdown from '@/components/layouts/backoffice/header/user-dropdown'
import { useAuth } from '@/hooks/auth/use-auth'
import useSignOut from '@/hooks/auth/use-sign-out'
import { usePageContext } from '@/hooks/context/use-page-context'
import { useFetchProfile } from '@/hooks/fetchers/use-fetch-profile'
import { useRouter } from '@/hooks/use-router'
import { useSidebarConfig } from '@/hooks/use-sidebar-config'
import { getIsSSR } from '@/utils/base'
import { cn } from '@/utils/cn'
import { usePathname } from 'next/navigation'

const Layout = ({ children }) => {
  const { _ } = useLingui()
  const { isAuth, isSignInAs } = useAuth()
  const isSSR = getIsSSR()
  const { onSignOut, isPending: isSignOutPending } = useSignOut()
  const { isLoading: isPageLoading } = usePageContext()
  const { items, selectedKeys } = useSidebarConfig()
  const router = useRouter()
  const pathname = usePathname()

  // _Event
  const checkAuth = () => {
    if (!isAuth) router.replace('/')
  }

  // _SSR
  if (isSSR) {
    checkAuth()
  }

  // _Query
  // NOTE: should fetch profile on layout to set store
  const { data: profile, isLoading: isProfileLoading } = useFetchProfile()

  // _Effect
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    checkAuth()
  }, [isAuth])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // for fix replace
    nProgress.done()
  }, [isAuth, profile, router, pathname])

  return (
    <BackofficeLayout
      sidebarProps={{
        items,
        defaultSelectedKeys: selectedKeys,
        selectedKeys,
        defaultOpenKeys: selectedKeys.length > 1 ? [selectedKeys[0]] : [],
      }}
      headerTopComponent={
        isSignInAs ? (
          <div className={cn(`flex items-center space-x-2 whitespace-pre`)}>
            <Trans>
              Log in with{' '}
              <span className={cn(`block truncate text-white xs:max-w-[100px]`, `flex items-center`)}>
                {profile?.username ? profile.username : <Skeleton.Button className={cn(`!h-4 !w-10 !min-w-0`)} />} (
                {profile?.name ? profile.name : <Skeleton.Button className={cn(`!h-4 !w-10 !min-w-0`)} />})
              </span>
            </Trans>

            <Button
              size="small"
              // type="link"
              variant="error"
              className={cn(`!h-6`)}
              onClick={() => onSignOut(true)}
              loading={isSignOutPending}
            >
              {_(msg`Sign out`)}
            </Button>
          </div>
        ) : null
      }
      headerRightComponent={
        <Fragment>
          <div className={cn(`hidden items-center`, `lg:flex`)}>
            {/* <UserCredit />
            <Divider type="vertical" className={cn(`!h-8`)} /> */}
          </div>

          <div className={cn(`flex h-full items-center`)}>
            <SwitchLanguageDropdown />
            <Divider type="vertical" className={cn(`!h-8`)} />
            <UserDropdown className={cn(`hidden`, `lg:flex`)} />
            <MobileDropdown className={cn(`flex`, `lg:hidden`)} />
          </div>
        </Fragment>
      }
      isLoading={isProfileLoading || isPageLoading}
    >
      {children}
    </BackofficeLayout>
  )
}

export default Layout
