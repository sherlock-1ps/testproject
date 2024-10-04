import { cache } from 'react'

import type { I18n } from '@lingui/core'

export function setI18n(locale: I18n) {
  getLocaleCtx().current = locale
}

export function getI18n(): I18n | undefined {
  return getLocaleCtx().current
}

const getLocaleCtx = cache((): { current: I18n | undefined } => {
  return { current: undefined }
})
