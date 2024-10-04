import { forwardRef } from 'react'

import type { ButtonProps } from 'antd'
import { Button as AntdButton } from 'antd'
import { omit } from 'lodash-es'

import { cn } from '@/utils/cn'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'dark'
  | 'light'
  | 'warning'
  | 'success'
  | 'error'
  | 'info'
  | 'pin'

export interface IButtonProps extends Omit<ButtonProps, 'danger' | 'ghost'> {
  variant?: ButtonVariant
  isMinW?: boolean
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ variant = 'primary', isMinW, className, ...props }, ref) => {
    const _props = omit(props, ['danger', 'ghost'])
    return (
      <AntdButton
        ref={ref}
        className={cn(
          `button-${variant}`,
          {
            'min-w-[96px]': isMinW,
          },
          className,
        )}
        {..._props}
      />
    )
  },
)
Button.displayName = 'Button'

export default Button
