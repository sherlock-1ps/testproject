import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import type { MenuProps } from 'antd'
import { Fragment, useMemo } from 'react'
import useSignOut from './auth/use-sign-out'

export const useUserDropdownConfig = () => {
  const { onSignOut } = useSignOut()
  const { _ } = useLingui()

  // _Memo
  const items = useMemo(() => {
    return [
      {
        key: 'logout',
        label: _(msg`Sign out`),
        danger: true,
        onClick: () => onSignOut(true),
      },
    ] as MenuProps['items']
  }, [_, onSignOut])

  return {
    items,
    modals: <Fragment>{/* // TODO:  */}</Fragment>,
  }
}
