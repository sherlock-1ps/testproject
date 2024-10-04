import { setupI18n } from '@lingui/core'

import { Language } from '@/enums/base'
import { setI18n } from '@/i18n/locale'
import { loadCatalog } from '@/i18n/utils'

const getAntdLocale = async (lang: string) => {
  let locale = (await import('antd/locale/th_TH')).default

  switch (lang) {
    case Language.EN:
      locale = (await import('antd/locale/en_US')).default
      break

    case Language.ZH:
      locale = (await import('antd/locale/zh_CN')).default
      break

    case Language.KM:
      locale = (await import('antd/locale/km_KH')).default
      break

    case Language.ID:
      locale = (await import('antd/locale/id_ID')).default
      break

    case Language.LO:
      locale = (await import('antd/locale/en_US')).default
      break

    case Language.MS:
      locale = (await import('antd/locale/ms_MY')).default
      break

    case Language.MY:
      locale = (await import('antd/locale/my_MM')).default
      break

    case Language.FIL:
      locale = (await import('antd/locale/fi_FI')).default
      break

    case Language.VI:
      locale = (await import('antd/locale/vi_VN')).default
      break

    case Language.PT_BR:
      locale = (await import('antd/locale/pt_BR')).default
      break

    case Language.KO:
      locale = (await import('antd/locale/ko_KR')).default
      break

    case Language.JA:
      locale = (await import('antd/locale/ja_JP')).default
      break

    case Language.PT_PT:
      locale = (await import('antd/locale/pt_PT')).default
      break
  }

  return locale
}

/**
 * Get Catalog for set i18n on SSR!!!
 */
export const getCatalogI18n = async (locale: string) => {
  const catalog = await loadCatalog(locale)
  const i18nSetupData = {
    locale,
    messages: { [locale]: catalog },
  }

  const i18n = setupI18n(i18nSetupData)
  setI18n(i18n)

  const antdLocale = await getAntdLocale(locale)

  return {
    i18nSetupData,
    i18n,
    antdLocale,
  }
}
