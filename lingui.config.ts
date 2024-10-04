import type { LinguiConfig } from '@lingui/conf'

import i18nConfig from './i18n-config'

const config: LinguiConfig = {
  locales: i18nConfig.locales,
  sourceLocale: i18nConfig.defaultLocale,
  fallbackLocales: {
    default: i18nConfig.fallbackLocale,
  },
  catalogs: [
    {
      path: 'src/locales/{locale}',
      include: ['src'],
    },
  ],
}

export default config
