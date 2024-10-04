'use client'

import type { FC } from 'react'
import { useMemo, useState } from 'react'

import { CaretDownOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import Flag from 'react-world-flags'

import { DEFAULT_LANG } from '@/constants/config'
import { LANGUAGES } from '@/constants/language'
import { useChangeLanguage } from '@/hooks/i18n/use-change-language'
import { useCurrentLocale } from '@/hooks/i18n/use-current-locale'
import { cn } from '@/utils/cn'
import type { MenuItemType } from 'antd/es/menu/hooks/useItems'

interface ISwitchLanguageDropdownProps {
  className?: string
  isCaret?: boolean
  iconSize?: number
}

const SwitchLanguageDropdown: FC<ISwitchLanguageDropdownProps> = ({ iconSize = 28, className, isCaret = false }) => {
  const locale = useCurrentLocale()
  const { handleChange: onChangeLang } = useChangeLanguage()

  // _State
  const [open, setOpen] = useState(false)

  // _Memo
  const items = useMemo(() => {
    return LANGUAGES.map(
      (e) =>
        ({
          key: e.key,
          label: e.label,
          icon: <Avatar src={<Flag code={e.code} />} size={iconSize} />,
        }) as MenuItemType,
    )
  }, [iconSize])

  const selectedLangKey = useMemo(() => (!locale || locale === 'default' ? DEFAULT_LANG : locale), [locale])

  const langSelected = useMemo(() => {
    return items.filter((e) => e.key === selectedLangKey)[0]
  }, [items, selectedLangKey])

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [selectedLangKey],
        onClick: (e) => {
          onChangeLang(e.key)
        },
      }}
      placement="bottomRight"
      overlayStyle={{
        minWidth: 120,
      }}
      onOpenChange={setOpen}
      open={open}
    >
      <button
        className={cn(`flex h-full items-center px-3 text-base`, `transition-colors hover:bg-white/5`, className)}
        role="button"
      >
        {langSelected.icon}
        <span className={cn(`ml-2`)}>{langSelected.label}</span>

        {isCaret ? <CaretDownOutlined className={cn(`ml-1`)} /> : null}
      </button>
    </Dropdown>
  )
}

export default SwitchLanguageDropdown
