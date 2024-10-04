'use client'

import { forwardRef } from 'react'

import { EyeOutlined } from '@ant-design/icons'

import type { IButtonProps } from '../base/ui/button'
import Button from '../base/ui/button'

interface IViewButtonProps extends IButtonProps {}

const ViewButton = forwardRef<HTMLButtonElement, IViewButtonProps>(
  ({ type = 'primary', variant = 'secondary', ...props }, ref) => {
    return <Button ref={ref} type={type} variant={variant} icon={<EyeOutlined />} {...props} />
  },
)
ViewButton.displayName = 'ViewButton'

export default ViewButton
