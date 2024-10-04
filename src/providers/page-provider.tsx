'use client'

import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import type { FC, PropsWithChildren } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { createContext, useEffect, useRef, useState } from 'react'

import { useAuthStore } from '@/stores/auth'
import { getAuthenticationSsr } from '@/stores/auth/utils'
import { useSettingStore } from '@/stores/setting'
import { getSettingSsr } from '@/stores/setting/utils'
import { getIsSSR } from '@/utils/base'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme as AntdTheme, ConfigProvider } from 'antd'
import dayjs from 'dayjs'

import { NextNProgress } from '@/components/base/ui/nprogress'
import { DEFAULT_LANG } from '@/constants/config'
import { useAuth } from '@/hooks/auth/use-auth'
import PopupProvider from '@/providers/popup-provider'
import theme from '@/theme'
import { getQueryClient } from '@/utils/react-query/get-query-client'
import type { Locale } from 'antd/es/locale'

import 'dayjs/locale/th'
import 'dayjs/locale/en'

interface IPageProviderProps extends PropsWithChildren {
  cookies: RequestCookie[]
  locale: string
  antdLocale: Locale
}

interface IPageContext {
  isLoading?: boolean
  setIsLoading?: Dispatch<SetStateAction<boolean>>
  queryClient: QueryClient
}

export const PageContext = createContext<Partial<IPageContext>>({})

const PageProvider: FC<IPageProviderProps> = ({ cookies, children, locale, antdLocale }) => {
  const isSSR = getIsSSR()
  const clientInitStateRef = useRef<boolean>(false)
  const authentication = getAuthenticationSsr(cookies)
  const queryClient = getQueryClient()
  const setting = getSettingSsr(cookies)
  const { isAuth } = useAuth()

  // Init locale
  dayjs.locale(locale)

  // _State
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // _Event
  const handleInitState = () => {
    // ...do something for client

    if (isSSR) {
      // Init store `Authentication` on SSR
      useAuthStore.getState().setAccessToken(authentication?.accessToken ?? null)
      useAuthStore.getState().setProfile(authentication?.profile ?? null)
      useAuthStore.getState().setSignInData(authentication?.signInData ?? null)
      useAuthStore.getState().setPrevAccessToken(authentication?.prevAccessToken ?? null)

      // Init store `Setting` on SSR
      useSettingStore.getState().setCollapsed(Boolean(setting?.isCollapsed))
      useSettingStore.getState().setLang(setting?.lang ?? DEFAULT_LANG)
    }
  }

  const checkViewport = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  // _Init state to stores
  if (isSSR) {
    handleInitState()
  } else if (!clientInitStateRef.current) {
    // handleInitState()
    clientInitStateRef.current = true
  }

  // _Effect
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => {
      window.removeEventListener('resize', checkViewport)
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isAuth) queryClient?.clear()
  }, [isAuth])

  return (
    <PageContext.Provider
      value={{
        isLoading,
        setIsLoading,
        queryClient,
      }}
    >
      <AntdRegistry>
        <ConfigProvider
          theme={{
            algorithm: AntdTheme.darkAlgorithm,
            ...theme,
          }}
          locale={antdLocale}
        >
          <NextNProgress />
          <PopupProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </PopupProvider>
        </ConfigProvider>
      </AntdRegistry>
    </PageContext.Provider>
  )
}

export default PageProvider
