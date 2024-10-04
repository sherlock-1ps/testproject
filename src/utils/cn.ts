import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

import { THEME_CONFIG } from '@/constants/theme'

const { typography } = THEME_CONFIG

const customTwMerge = extendTailwindMerge({
  override: {
    classGroups: {
      'font-size': [
        {
          text: Object.keys(typography),
        },
      ],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs))
}
