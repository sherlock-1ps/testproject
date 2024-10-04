import Cookies from 'js-cookie'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { DEFAULT_LANG } from '@/constants/config'
import { STORE_KEY } from '@/constants/stores'
import { createCookieStorage } from '@/utils/storage/cookie-storage'
import { pick } from 'lodash-es'
import type { ISettingActions, ISettingState } from './types'

export const storage = createCookieStorage({
  storage: Cookies,
})

export const useSettingStore = create<ISettingState & ISettingActions>()(
  persist(
    (set, get) => ({
      isCollapsed: Boolean(get()?.isCollapsed),
      lang: DEFAULT_LANG,
      toggleCollapsed: () => {
        set((state) => ({
          ...state,
          isCollapsed: !state.isCollapsed,
        }))
      },
      setCollapsed: (val) => {
        set((state) => ({
          ...state,
          isCollapsed: val,
        }))
      },
      setLang: (lang) => {
        set((state) => ({
          ...state,
          lang,
        }))
      },
    }),
    {
      name: STORE_KEY.setting.key,
      storage: createJSONStorage(() => storage),
      partialize: (state) => {
        return pick(state, ['isCollapsed', 'lang']) as ISettingState
      },
    },
  ),
)
