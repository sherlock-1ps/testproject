'use client'

import { createContext, useEffect, useState } from 'react'
import type { FC, PropsWithChildren } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Grid, Layout, Menu } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import Button from '@/components/base/ui/button'
import Loader from '@/components/base/ui/loader'
import { APP_NAME, HOME_PATH } from '@/constants/config'
import { MOTION_VARIANTS } from '@/constants/motion'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { useSettingStore } from '@/stores/setting'
import { cn } from '@/utils/cn'
import type { IBackofficeHeaderProps } from './header'
import BackofficeHeader from './header'

export interface IBackofficeLayoutProps extends PropsWithChildren {
  sidebarProps?: Omit<MenuProps, 'theme' | 'mode' | 'className'>
  headerTopComponent?: IBackofficeHeaderProps['topComponent']
  headerRightComponent?: IBackofficeHeaderProps['rightComponent']
  isLoading?: boolean
  mainLayoutClassName?: string
}

interface IBackofficeLayoutContext {
  openSidebarMobile: boolean
  toggleSidebarMobile: VoidFunction
  closeSidebarMobile: VoidFunction
}

const { Sider } = Layout
const LayoutMotion = motion(Layout)

export const BackofficeLayoutContext = createContext<Partial<IBackofficeLayoutContext>>({})

const sidebarW = 250
const sidebarCollapedW = 60

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

const BackofficeLayout: FC<IBackofficeLayoutProps> = ({
  headerRightComponent,
  headerTopComponent,
  sidebarProps,
  children,
  isLoading = false,
  mainLayoutClassName,
}) => {
  const { isCollapsed } = useSettingStore.getState()
  const { toggleCollapsed } = useSettingStore()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const asPath = `${pathname}?${searchParams}`
  const { lg: isLG } = Grid.useBreakpoint()
  const { isMounted } = useIsMounted()
  const isHeaderTopComponent = Boolean(headerTopComponent)

  // _State
  const [openSidebarMobile, setOpenSidebarMobile] = useState(false)
  const [tempPathname, setTempPathname] = useState(pathname)

  // _Event
  const toggleSidebarMobile = () => {
    setOpenSidebarMobile((e) => !e)
  }

  const closeSidebarMobile = () => {
    setOpenSidebarMobile(false)
  }

  // _Effect
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // When route changed, will close sidebar menu
    if (tempPathname !== pathname) {
      closeSidebarMobile()
      setTempPathname(asPath)
    }
  }, [asPath, pathname, tempPathname])

  const collapsed = isMounted ? isCollapsed && isLG : isCollapsed

  return (
    <BackofficeLayoutContext.Provider value={{ openSidebarMobile, toggleSidebarMobile, closeSidebarMobile }}>
      <Layout
        hasSider
        className={cn(`h-full transition-all duration-300 ease-linear`, {
          'pt-header-top-h': isHeaderTopComponent,
        })}
      >
        <div
          style={{
            width: collapsed ? sidebarCollapedW : sidebarW,
          }}
          className={cn(`fixed inset-0 z-0 transition-all lg:relative`, {
            'pointer-events-none': !openSidebarMobile,
          })}
          onClick={closeSidebarMobile}
        ></div>
        <div
          className={cn(`fixed inset-0 z-50 transition-all lg:relative`, {
            'pointer-events-none': !openSidebarMobile,
            'bg-background/50 backdrop-blur-sm': openSidebarMobile,
          })}
          onClick={closeSidebarMobile}
        ></div>
        <Sider
          theme={'light'}
          width={sidebarW}
          collapsedWidth={sidebarCollapedW}
          collapsible={isMounted && isLG}
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          className={cn(
            `!transition-[height_,top,_transform] !duration-150 !ease-linear`,
            '!fixed top-0 left-0 z-50 h-full shadow',
            `[&>.ant-layout-sider-children]:overflow-y-auto`,
            `[&>.ant-layout-sider-trigger]:!text-foreground`,
            `lg:translate-x-0`,
            {
              '-translate-x-full': !openSidebarMobile,
              'translate-x-0': openSidebarMobile,
              'top-10 h-[calc(100%_-_var(--header-top-h))]': isHeaderTopComponent,
            },
          )}
        >
          <div
            className={cn(`flex h-[76px] items-center justify-between px-4`, `lg:justify-center`, {
              'px-2': collapsed,
            })}
          >
            <Link
              href={HOME_PATH}
              title={APP_NAME}
              className={cn(`text-center lg:hover:opacity-70`)}
              onClick={closeSidebarMobile}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  variants={MOTION_VARIANTS.fadeIn.variants}
                  initial="exit"
                  animate="enter"
                  exit="exit"
                  transition={MOTION_VARIANTS.fadeIn.transition}
                  className={cn(`size-11`)}
                >
                  <img src="/logo.png" alt="" />
                </motion.div>
              </AnimatePresence>
            </Link>

            <Button
              type="link"
              icon={<CloseOutlined className={cn(`!text-h1 !text-white`)} />}
              className={cn(`lg:!hidden`)}
              onClick={closeSidebarMobile}
            />
          </div>

          <Menu
            theme="light"
            mode="inline"
            className={cn(
              // .ant-menu-item
              `!border-r-0`,
              `[&_.ant-menu-item]:!mx-0 [&_.ant-menu-item]:!w-full`,
              `[&_.ant-menu-submenu>.ant-menu-submenu-title]:!mx-0`,
              `[&_.ant-menu-submenu>.ant-menu-submenu-title]:!w-full`,
              `[&_.ant-menu-submenu>.ant-menu-sub>.ant-menu-item]:!pl-14`,
              `[&_.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item]:!mx-0`,
              `[&_.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item]:!w-full`,
              `[&_.ant-menu-item-group_.ant-menu-item-group-title]:!px-0`,
              `[&_.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item_.anticon]:text-xl`,
              `[&_.ant-menu-submenu>.ant-menu-submenu-title_.anticon]:text-xl`,
              //
              `[&_.ant-menu-submenu>.ant-menu-sub>.ant-menu-item>.ant-menu-title-content]:before:absolute`,
              `[&_.ant-menu-submenu>.ant-menu-sub>.ant-menu-item>.ant-menu-title-content]:before:left-7`,
              `[&_.ant-menu-submenu>.ant-menu-sub>.ant-menu-item>.ant-menu-title-content]:before:top-1/2`,
              `[&_.ant-menu-submenu>.ant-menu-sub>.ant-menu-item>.ant-menu-title-content]:before:-translate-y-1/2`,
              `[&_.ant-menu-submenu>.ant-menu-sub>.ant-menu-item>.ant-menu-title-content]:before:size-1`,
              `[&_.ant-menu-submenu>.ant-menu-sub>.ant-menu-item>.ant-menu-title-content]:before:rounded`,
              `[&_.ant-menu-submenu>.ant-menu-sub>.ant-menu-item>.ant-menu-title-content]:before:bg-text-body`,
              {
                '[&_.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item]:!pl-[14px] [&_.ant-menu-item]:!pl-[14px] [&_.ant-menu-submenu>.ant-menu-submenu-title]:!pl-[14px]':
                  collapsed,
                '[&_.ant-menu-item-group>.ant-menu-item-group-title]:hidden': collapsed,
                'divide-y': collapsed,
                // for `.anticon-text`
                '[&.ant-menu-inline.ant-menu-root_.ant-menu-item_.anticon-text]:hidden': !collapsed,
                '[&.ant-menu_.ant-menu-item_.ant-menu-item-icon.anticon-text_+_span]:ms-0': !collapsed,
                '!p-4': !collapsed,
                '!p-2': collapsed,
              },
            )}
            {...sidebarProps}
          />
        </Sider>

        <Layout className={cn(`relative`)}>
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.div
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ easings: ['easeIn', 'easeOut'], duration: 0.3 }}
                className={cn(
                  `absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm`,
                )}
              >
                <Loader />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <BackofficeHeader topComponent={headerTopComponent} rightComponent={headerRightComponent} />

          <LayoutMotion
            key={pathname}
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ easings: ['easeIn', 'easeOut'], duration: 0.3 }}
          >
            <main className={cn(mainLayoutClassName)}>
              {children}
              <div className={cn(`h-10`)}></div>
            </main>
          </LayoutMotion>
        </Layout>
      </Layout>
    </BackofficeLayoutContext.Provider>
  )
}

export default BackofficeLayout
