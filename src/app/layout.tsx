import { LinguiProvider } from '@/i18n/lingui-provider'
import PageProvider from '@/providers/page-provider'
import { cn } from '@/utils/cn'
import { getCatalogI18n } from '@/utils/i18n'
import { Inter, Noto_Sans_Thai } from 'next/font/google'
import { cookies } from 'next/headers'
import type { PropsWithChildren } from 'react'

import '@/styles/globals.scss'
import { getSettingSsr } from '@/stores/setting/utils'

interface IRootLayoutProps extends PropsWithChildren {}

const fontTh = Noto_Sans_Thai({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-th',
})

const fontEn = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-en',
})

const RootLayout = async ({ children }: IRootLayoutProps) => {
  const allCookies = cookies().getAll()
  const setting = getSettingSsr(allCookies)
  const { i18nSetupData, antdLocale } = await getCatalogI18n(setting.lang)

  return (
    <html className={cn(fontTh.variable, fontEn.variable)}>
      <body className={cn(`bg-background text-text-body`)}>
        <div id="__root">
          <LinguiProvider {...i18nSetupData}>
            <PageProvider cookies={allCookies} locale={setting.lang} antdLocale={antdLocale}>
              {children}
            </PageProvider>
          </LinguiProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
