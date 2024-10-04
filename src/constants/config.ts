import { Language } from '@/enums/base'
import type { Metadata } from 'next'

export const APP_NAME = '1ps-scraping'

// SEO
export const DEFAULT_METADATA: Metadata = {
  title: APP_NAME,
  // description: `Some description...`,
}

// Default home path
export const HOME_PATH = '/overall'

export const DEFAULT_LANG = Language.EN
