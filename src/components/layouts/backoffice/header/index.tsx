import type { FC, ReactNode } from 'react'
import { Fragment, useContext } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import { Layout } from 'antd'

import MenuIcon from '@/components/base/icons/menu-icon'
import { cn } from '@/utils/cn'
import { BackofficeLayoutContext } from '..'

const { Header } = Layout

export interface IBackofficeHeaderProps {
  topComponent?: ReactNode
  rightComponent?: ReactNode
}

const BackofficeHeader: FC<IBackofficeHeaderProps> = ({ topComponent, rightComponent }) => {
  const { openSidebarMobile, toggleSidebarMobile } = useContext(BackofficeLayoutContext)
  const isTopComponent = Boolean(topComponent)

  return (
    <Fragment>
      <div
        className={cn(
          `fixed top-0 left-0 z-[41] h-0 w-full bg-popup transition-all duration-300 ease-linear`,
          `flex items-center justify-center`,
          {
            'h-header-top-h': isTopComponent,
          },
        )}
      >
        {topComponent}
      </div>

      <Header className={cn(`opacity-0`)}></Header>
      <Header
        className={cn(
          `!fixed top-0 left-0 z-40 w-full transition-all duration-300 ease-linear`,
          `!px-4 flex items-center`,
          {
            'top-header-top-h': isTopComponent,
          },
        )}
      >
        <button type="button" className="mr-3 text-[24px] lg:hidden" onClick={toggleSidebarMobile}>
          {openSidebarMobile ? <CloseOutlined /> : <MenuIcon className="text-h1" />}
        </button>

        <div className={cn(`ml-auto flex h-full items-center`)}>{rightComponent}</div>
      </Header>
    </Fragment>
  )
}

export default BackofficeHeader
