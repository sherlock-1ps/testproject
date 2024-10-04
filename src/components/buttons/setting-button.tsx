'use client'

import { forwardRef } from 'react'

import { SettingOutlined } from '@ant-design/icons'

import type { IButtonProps } from '../base/ui/button'
import Button from '../base/ui/button'

interface ISettingButtonProps extends IButtonProps {}

const SettingButton = forwardRef<HTMLButtonElement, ISettingButtonProps>(({ type = 'primary', ...props }, ref) => {
  return <Button ref={ref} type={type} icon={<SettingOutlined />} {...props} />
})
SettingButton.displayName = 'SettingButton'

export default SettingButton
