'use client'
import { useSettingStore } from '@/stores/setting'

export const useCurrentLocale = () => {
  return useSettingStore.getState().lang
}
