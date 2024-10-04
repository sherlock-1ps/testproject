'use client'

import { type FC, Fragment } from 'react'

import { useIsMounted } from '@/hooks/use-is-mounted'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import { nanoid } from 'nanoid'

const Svg = () => {
  const { isMounted } = useIsMounted()
  const id = nanoid()

  return (
    <svg viewBox="0 0 80 80" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
      {isMounted ? (
        <Fragment>
          <mask id={`${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
            <rect width="80" height="80" rx="160" fill="#FFFFFF"></rect>
          </mask>
          <g mask={`url(#${id})`}>
            <rect width="80" height="80" fill="#ff7d10"></rect>
            <path
              filter={`url(#filter_${id})`}
              d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
              fill="#ffb238"
              transform="translate(-2 2) rotate(-266 40 40) scale(1.5)"
            ></path>
            <path
              filter={`url(#filter_${id})`}
              d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
              fill="#0a0310"
              transform="translate(7 7) rotate(39 40 40) scale(1.5)"
              style={{
                mixBlendMode: 'overlay',
              }}
            ></path>
          </g>
          <defs>
            <filter id={`filter_${id}`} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
              <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur"></feGaussianBlur>
            </filter>
          </defs>
        </Fragment>
      ) : null}
    </svg>
  )
}

const AvatarIcon: FC<Partial<CustomIconComponentProps>> = ({ ...props }) => {
  return <Icon component={Svg} {...props} />
}

export default AvatarIcon
