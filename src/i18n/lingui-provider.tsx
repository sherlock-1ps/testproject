'use client'

import type { PropsWithChildren } from 'react'

import { setupI18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

export function LinguiProvider({ children, messages, locale }: PropsWithChildren<{ messages: any; locale: string }>) {
  return (
    <I18nProvider
      i18n={setupI18n({
        messages,
        locale,
      })}
    >
      {children}
    </I18nProvider>
  )
}
