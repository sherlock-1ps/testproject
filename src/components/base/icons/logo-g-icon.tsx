'use client'

import { forwardRef } from 'react'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const Svg = () => {
  return (
    <svg viewBox="0 0 72 71" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.5714 71V60.8571H10.2857V50.7143H0V20.2857H10.2857V10.1429H20.5714V0H72V10.1429H30.8571V20.2857H20.5714V50.7143H30.8571V60.8571H51.4286V40.5714H41.1429V30.4286H72V71H20.5714Z"
        fill="currentColor"
      />
    </svg>
  )
}

const LogoGIcon = forwardRef<HTMLSpanElement, Partial<CustomIconComponentProps>>(({ ...props }, ref) => {
  return <Icon ref={ref} component={Svg} {...props} />
})
LogoGIcon.displayName = 'LogoGIcon'

export default LogoGIcon
