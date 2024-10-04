import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useMutation } from '@tanstack/react-query'

import AuthService from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { usePageContext } from '../context/use-page-context'
import usePopup from '../context/use-popup'
import { useFetchError } from '../use-fetch-error'

const useSignOut = () => {
  const { _ } = useLingui()
  const { clearAuth } = useAuthStore()
  const { showErrorMessage } = useFetchError()
  const { modal } = usePopup()
  const { queryClient } = usePageContext()

  // _Mutation
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: () => AuthService.signOut(),
    onSuccess: () => {
      clearAuth()
      queryClient?.clear()

      // For clear cookies
      window.location.href = '/'
    },
    onError: showErrorMessage,
  })

  // _Event
  const onSignOut = (showConfirm?: boolean) => {
    if (showConfirm) {
      modal.confirm({
        title: _(msg`Confirm sign out`),
        content: _(msg`Do you want to sign out?`),
        onOk: mutateAsync,
      })
      return
    }

    mutate()
  }

  return {
    onSignOut,
    isPending,
  }
}

export default useSignOut
