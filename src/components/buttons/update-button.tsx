'use client'

import { forwardRef } from 'react'

import { CheckOutlined } from '@ant-design/icons'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import type { IButtonProps } from '../base/ui/button'
import Button from '../base/ui/button'

interface IUpdateButtonProps extends IButtonProps {}

const UpdateButton = forwardRef<HTMLButtonElement, IUpdateButtonProps>(
  ({ type = 'primary', icon, children, ...props }, ref) => {
    const { _ } = useLingui()

    return (
      <Button ref={ref} type={type} icon={icon ?? <CheckOutlined />} {...props}>
        {children ?? _(msg`Save`)}
      </Button>
    )
  },
)
UpdateButton.displayName = 'UpdateButton'

export default UpdateButton
