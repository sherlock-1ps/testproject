'use client'

import { forwardRef } from 'react'

import { PlusOutlined } from '@ant-design/icons'

import type { IButtonProps } from '../base/ui/button'
import Button from '../base/ui/button'

interface ICreateButtonProps extends Omit<IButtonProps, 'icon'> {}

const CreateButton = forwardRef<HTMLButtonElement, ICreateButtonProps>(({ type = 'primary', ...props }, ref) => {
  return <Button ref={ref} type={type} icon={<PlusOutlined />} {...props} />
})
CreateButton.displayName = 'CreateButton'

export default CreateButton
