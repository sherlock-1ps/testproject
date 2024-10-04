import type { ThemeConfig } from 'antd'

import { rgba } from '@/utils/color'
import { THEME_CONFIG } from '../constants/theme'

const { colors, typography, boxShadow } = THEME_CONFIG

const convertPxToNumber = (n: string) => Number(n.replace('px', ''))

const theme: ThemeConfig = {
  token: {
    borderRadius: 6,

    // COLORS
    colorPrimary: colors.primary,
    colorPrimaryHover: colors['primary-hover'],

    colorInfo: colors.info,
    colorInfoHover: colors['info-hover'],

    colorSuccess: colors.success,
    colorSuccessHover: colors['success-hover'],

    colorError: colors.error,
    colorErrorHover: colors['error-hover'],

    colorWarning: colors.warning,
    colorWarningBgHover: colors['warning-hover'],

    colorText: colors['text-body'],
    colorTextBase: colors['text-body'],
    colorTextPlaceholder: colors['text-body'],
    colorBgBase: colors.background,

    colorTextTertiary: colors.secondary,
    colorLink: colors.primary,
    colorLinkHover: colors['primary-hover'],

    // FONT
    fontFamily: 'var(--font-en, Arial), var(--font-th, Arial), sans-serif',

    // SHADOW
    boxShadow: boxShadow.DEFAULT,
    boxShadowSecondary: boxShadow.secondary,
    boxShadowTertiary: boxShadow.tertiary,

    // FORM INPUT & OTHER...
    colorBorder: colors.border,
    controlHeight: 38,
    controlHeightLG: 40,
    controlHeightSM: 32,
  },
  components: {
    Layout: {
      headerBg: colors.sidebar,
      lightSiderBg: colors.sidebar,
      siderBg: colors.sidebar,
      colorText: colors['text-body'],
      bodyBg: 'transparent',
      // Sidebar Trigger
      lightTriggerBg: rgba(colors.white, 0.03),
      lightTriggerColor: colors.white,
    },

    Menu: {
      itemBg: colors.sidebar,
      itemSelectedBg: rgba(colors.primary, 0.1),
      itemSelectedColor: colors.primary,
      groupTitleColor: colors.white,
      groupTitleFontSize: 14,
      // fontSize: 16,
      itemHeight: 38,
      subMenuItemBg: colors.sidebar,
    },

    Typography: {
      titleMarginBottom: '0',
      titleMarginTop: '0',

      // Font size
      fontSizeHeading1: convertPxToNumber(typography.h1[0]),
      fontSizeHeading2: convertPxToNumber(typography.h2[0]),
      fontSizeHeading3: convertPxToNumber(typography.h3[0]),
      fontSizeHeading4: convertPxToNumber(typography.h4[0]),
      fontSizeHeading5: convertPxToNumber(typography.h5[0]),
      fontSize: convertPxToNumber(typography.base[0]),

      // Line height
      lineHeightHeading1: convertPxToNumber(typography.h1[1]),
      lineHeightHeading2: convertPxToNumber(typography.h2[1]),
      lineHeightHeading3: convertPxToNumber(typography.h3[1]),
      lineHeightHeading4: convertPxToNumber(typography.h4[1]),
      lineHeightHeading5: convertPxToNumber(typography.h5[1]),
      lineHeight: convertPxToNumber(typography.base[1]),

      colorTextHeading: colors.white,
    },

    Card: {
      colorBgContainer: colors.card,
      colorBorderSecondary: colors.border,

      colorTextHeading: colors.white,
      colorBorder: 'red',
    },

    // NOTE: button and input should the same height!!!
    Button: {
      defaultShadow: 'none',
      primaryShadow: 'none',
      dangerShadow: 'none',

      defaultBg: 'transparent',

      colorLink: colors.primary,
      colorLinkHover: colors['primary-hover'],
    },

    Input: {
      colorBgContainer: colors.field,
      // colorBgContainerDisabled: colors['field-disabled'],
      colorTextPlaceholder: colors.placeholder,
      // activeShadow: 'none',
      // errorActiveShadow: 'none',
      addonBg: colors.border,
      colorBorder: colors['field-border'],
      colorText: colors.white,
      fontWeightStrong: 400,
    },

    InputNumber: {
      colorBgContainer: colors.field,
      // colorBgContainerDisabled: colors['field-disabled'],
      colorTextPlaceholder: colors.placeholder,
      activeShadow: 'none',
      errorActiveShadow: 'none',
      addonBg: colors.border,
      colorText: colors.white,
    },

    Select: {
      colorBgContainer: colors.field,
      // colorBgContainerDisabled: colors['field-disabled'],
      colorTextPlaceholder: colors.placeholder,
      controlOutline: 'none',
      optionSelectedBg: rgba(colors.background, 0.4),
      optionActiveBg: rgba(colors.background, 0.4),
      colorIcon: 'red',
      colorIconHover: 'red',

      multipleItemHeight: 30,

      colorBgElevated: colors.popup,
      controlItemBgHover: rgba(colors.background, 0.4),
      colorBorder: colors['field-border'],
      colorText: colors.white,
    },

    DatePicker: {
      colorBgContainer: colors.field,
      // colorBgContainerDisabled: colors['field-disabled'],
      colorTextPlaceholder: colors.placeholder,
      activeShadow: 'none',
      errorActiveShadow: 'none',
      addonBg: colors.border,

      colorLink: colors.primary,
      cellHoverWithRangeBg: colors.header,
      // cellHoverBg: 'red',

      colorBgElevated: colors.popup,
      colorSplit: colors.border,
    },

    ColorPicker: {
      colorBgContainer: colors.field,
      // colorBgContainerDisabled: colors['field-disabled'],
      controlOutline: 'none',
      controlHeight: 36,
      controlHeightSM: 28,
      controlHeightLG: 44,
    },

    Popover: {
      colorBgElevated: colors.popup,
    },

    Dropdown: {
      colorPrimary: 'white', // NOTE: for change text active color
      controlItemBgActive: rgba(colors.background, 0.4),
      controlItemBgActiveHover: rgba(colors.background, 0.4),

      colorBgElevated: colors.popup,
      controlItemBgHover: rgba(colors.background, 0.4),

      colorSplit: colors.border,
    },

    Divider: {
      colorSplit: colors.border,
    },

    Progress: {
      defaultColor: colors.primary,
      remainingColor: colors.background,
    },

    Tag: {
      // borderRadiusSM: 8,
    },

    Radio: {
      buttonCheckedBg: 'transparent',
      buttonBg: 'transparent',
    },

    Modal: {
      titleColor: colors.white,
      padding: 10,

      headerBg: colors.popup,
      contentBg: colors.popup,
    },

    Table: {
      headerBorderRadius: 0,

      // TODO:
      // ตอนแรกว่าจะใช้เป็น transparent แต่พอเวลาเอาไปใช้กับ fixed columns ด้วยทำให้ต้องกำหนดสีพื้นหลัง
      // เลยใช้สี card เป็นพื้นหลังไปก่อน เพราะตารางส่วนใหญ่ตอนนี้อยู่บน component Card อยู่แล้ว
      // headerBg: 'transparent',
      // colorBgContainer: 'transparent',
      headerBg: colors.card,
      colorBgContainer: colors.card,

      headerColor: colors.white,
      borderColor: colors.border,

      headerSplitColor: colors.border,
    },

    Pagination: {
      // borderRadius: 999,
    },

    Empty: {
      colorTextDescription: colors['text-caption'],
    },

    Tooltip: {
      colorBgSpotlight: colors.background,
    },

    Checkbox: {
      colorBgContainer: colors.field,
    },

    Tabs: {
      colorBorderSecondary: colors.border,
    },

    Collapse: {
      contentBg: colors.card,
    },

    Segmented: {
      itemSelectedBg: colors.primary,
      colorText: colors.white,
    },
  },
}

export default theme
