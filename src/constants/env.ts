import { unstable_noStore as noStore } from 'next/cache'

export const getENV = () => {
  noStore()

  return {
    API_URL: process.env.API_URL,
  }
}

export const ENV = getENV()
