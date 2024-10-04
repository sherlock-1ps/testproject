import { usePathname, useSearchParams } from 'next/navigation'
import qs from 'qs'
import { useMemo } from 'react'
import type { QueryObject } from 'ufo'

import { useRouter } from './use-router'

export const useSimpleQueryParams = <QueryType = object>(initialQuery?: QueryType) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // _Memo
  const searchParamsValues = useMemo(() => {
    return {
      ...initialQuery,
      ...qs.parse(searchParams.toString()),
    } as {
      [key in string]: any
    }
  }, [initialQuery, searchParams])

  const queryParams = useMemo(() => {
    const newParams = Object.entries({ ...searchParamsValues }).reduce((a, c) => {
      const key = c[0]
      const value = c[1]

      if (value === 'true')
        return Object.assign(a, {
          [key]: true,
        })

      if (value === 'false')
        return Object.assign(a, {
          [key]: false,
        })

      if (value || typeof value === 'boolean')
        return Object.assign(a, {
          [key]: value,
        })

      if (initialQuery?.[key])
        return Object.assign(a, {
          [key]: initialQuery[key],
        })

      return a
    }, {})

    return newParams as QueryType
  }, [initialQuery, searchParamsValues])

  // _Event
  const handleSetSearchParams = (q: QueryType) => {
    router.push(pathname + '?' + qs.stringify(q as QueryObject))
  }

  return {
    queryParams,
    handleSetSearchParams,
  }
}
