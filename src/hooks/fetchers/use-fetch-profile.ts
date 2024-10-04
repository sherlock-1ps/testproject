import { useQuery } from '@tanstack/react-query'

import AuthService from '@/services/auth'
import type { IAuthProfile } from '@/types/auth'
import { useAuth } from '../auth/use-auth'

export const useFetchProfile = (initialData?: IAuthProfile) => {
  const { isAuth } = useAuth()

  return useQuery({
    queryKey: ['get-profile'],
    queryFn: ({ signal }) => AuthService.profile({ signal }),
    enabled: isAuth,
    initialData,
  })
}
