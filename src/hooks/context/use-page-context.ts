import { useContext } from 'react'

import { PageContext } from '@/providers/page-provider'

export const usePageContext = () => {
  const { isLoading, setIsLoading, queryClient } = useContext(PageContext)

  return {
    isLoading,
    setIsLoading,
    queryClient,
  }
}
