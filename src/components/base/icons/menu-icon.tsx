'use client'

import type { FC } from 'react'

import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const Svg = () => {
  return (
    <svg width="1em" height="1em" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M15.28 4.5H4.72C3.772 4.5 3 5.06 3 5.75S3.772 7 4.72 7h10.56C16.228 7 17 6.44 17 5.75s-.772-1.25-1.72-1.25Z"
        opacity="0.32"
      ></path>
      <path
        fill="currentColor"
        d="M19.28 10.75H8.72C7.772 10.75 7 11.31 7 12s.772 1.25 1.72 1.25h10.56c.948 0 1.72-.56 1.72-1.25s-.772-1.25-1.72-1.25ZM15.28 17H4.72C3.772 17 3 17.56 3 18.25s.772 1.25 1.72 1.25h10.56c.948 0 1.72-.56 1.72-1.25S16.228 17 15.28 17Z"
      ></path>
    </svg>
  )
}
const MenuIcon: FC<Partial<CustomIconComponentProps>> = ({ ...props }) => {
  return <Icon component={Svg} {...props} />
}

export default MenuIcon
