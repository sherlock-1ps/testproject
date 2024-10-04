'use client'

import { forwardRef } from 'react'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const Svg = () => {
  return (
    <svg viewBox="0 0 197 71" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.571 71V60.857H10.286V50.714H0V20.286h10.286V10.143H20.57V0H72v10.143H30.857v10.143H20.571v30.428h10.286v10.143H51.43V40.571H41.143V30.43H72V71H20.571ZM91.75 38.25V33.5H87V5h9.5v19h4.75V5H106v19h4.75V5h9.5v28.5h-4.75v4.75h-4.75V33.5H106v-4.75h-4.75v4.75H96.5v4.75h-4.75ZM125.15 38.25V14.5h4.75V9.75h4.75V5h14.25v4.75h4.75v4.75h4.75v23.75h-9.5v-9.5h-14.25v9.5h-9.5Zm9.5-14.25h14.25v-9.5h-4.75V9.75h-4.75v4.75h-4.75V24ZM177.55 38.25V24h-4.75v-4.75h-4.75V5h9.5v14.25h9.5V5h9.5v14.25h-4.75V24h-4.75v14.25h-9.5ZM91.5 64.75V62.5h-2.25v-2.25H87V53.5h2.25v-2.25h2.25V49h11.25v2.25h-9v2.25H91.5v6.75h2.25v2.25h4.5V58H96v-2.25h6.75v9H91.5ZM111.9 55.75h2.25V58h-2.25v6.75h-4.5V53.5h4.5v2.25Zm9-2.25v2.25h-6.75V53.5h6.75ZM125.55 64.75V62.5h-2.25v-6.75h2.25V53.5h11.25v2.25h2.25v6.75h-2.25v2.25h-11.25Zm2.25-2.25h6.75v-6.75h-6.75v6.75ZM143.7 64.75V62.5h-2.25v-9h4.5v9h6.75v-9h4.5v11.25h-13.5ZM159.6 67V53.5h13.5v2.25h2.25v4.5h-2.25v2.25h-9V67h-4.5Zm4.5-6.75h6.75v-4.5h-6.75v4.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

const LogoIcon = forwardRef<HTMLSpanElement, Partial<CustomIconComponentProps>>(({ ...props }, ref) => {
  return <Icon ref={ref} component={Svg} {...props} />
})
LogoIcon.displayName = 'LogoIcon'

export default LogoIcon
