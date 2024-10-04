import { useSettingStore } from '@/stores/setting'
import { useRouter } from '../use-router'
import { useCurrentLocale } from './use-current-locale'

export const useChangeLanguage = () => {
  const router = useRouter()
  const currentLocale = useCurrentLocale()
  const { setLang } = useSettingStore()

  const handleChange = (lang: string) => {
    if (currentLocale === lang) return

    setLang(lang)
    router.refresh()
  }

  return { handleChange }
}
