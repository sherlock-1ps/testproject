import AES from 'crypto-js/aes'
import type { CookiesStatic } from 'js-cookie'

import { decryptAESDeserialize } from './deserialize'
import { serialize as serialize_ } from './serialize'
import { DEFAULT_STORAGE_PREFIX } from '@/constants/stores'

type BaseStorage = CookiesStatic & {
  noConflict?(): CookiesStatic
}

export type ClientCookieStorage = {
  getItem<T>(key: string, defaultState?: T | null): T | null
  setItem<T>(key: string, value: T | null): void
  removeItem(key: string): void
}

export const createCookieStorage = ({
  deserialize = decryptAESDeserialize,
  key: prefix = DEFAULT_STORAGE_PREFIX,
  serialize = serialize_,
  storage,
  secureKey = null,
}: {
  deserialize?: (payload: { value: string; secureKey?: string | null; defaultState?: unknown }) => any
  key?: string
  serialize?: <T>(value: T) => string
  storage: BaseStorage
  secureKey?: string | null
}): ClientCookieStorage => {
  return {
    ...storage,
    getItem: (key, defaultState = null) => {
      const value = storage.get(`${prefix}.${key}`)
      try {
        return deserialize({
          value,
          defaultState,
          secureKey,
        })
      } catch (error) {
        console.warn(error)
        return defaultState
      }
    },
    setItem: (key, value) => {
      if (value === null) {
        storage.remove(`${prefix}.${key}`)
      } else {
        try {
          if (secureKey)
            return storage.set(`${prefix}.${key}`, AES.encrypt(serialize(value), secureKey ?? 'key').toString())
          storage.set(`${prefix}.${key}`, serialize(value))
        } catch (err) {
          console.error(err)
        }
      }
    },
    removeItem: (key) => storage.remove(`${prefix}.${key}`),
  }
}
