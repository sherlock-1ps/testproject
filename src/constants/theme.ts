const TYPOGRAPHY = {
  h1: ['30px', '1.2'],
  h2: ['24px', '1.2'],
  h3: ['20px', '1.4'],
  h4: ['18px', '1.4'],
  h5: ['16px', '1.5'],
  xl: ['18px', '1.5'],
  lg: ['16px', '1.5'],
  base: ['14px', '1.5'],
  sm: ['12px', '1.5'],
}

const COLORS = {
  primary: '#dd6e2d',
  'primary-hover': '#e17e2d',

  secondary: '#8A8D93',
  'secondary-hover': '#777B82',

  info: '#16B1FF',
  'info-hover': '#139CE0',

  success: '#56CA00',
  'success-hover': '#4CB200',

  warning: '#FFB400',
  'warning-hover': '#E09E00',

  error: '#FF4C51',
  'error-hover': '#E04347',

  // Form
  'text-body': '#9ca3af',
  'text-caption': '#6b7280', // '#74788D'

  field: '#374151',
  'field-border': '#374151',
  'field-disabled': '#424349', // TODO:
  placeholder: '#79808b',

  // Layout
  background: '#111827',
  header: '#172135',
  // sidebar: '#141c2e',
  sidebar: '#1b2231',

  card: '#1f2937',
  border: '#2e3844',

  popup: '#1f2937',
  'popup-border': '#2e3844',

  white: '#ffffff',
  black: '#111217',

  // Others...
  // red: '#F5222D',
  // volcano: '#FA541C',
  // gold: '#FAAD14',
  // yellow: '#FADB14',
  // lime: '#A0D911',
  // green: '#52C41A',
  // cyan: '#13C2C2',
  // blue: '#1890ff',
  // geekblue: '#2F54EB',
  // purple: '#722ED1',
  // magenta: '#EB2F96',
  // grey: '#A5A5A5',
  // pink: '#eb2f96',
  // orange: '#FA8C16',
}

const BREAKPOINT_SIZE = {
  xs: { max: 575 },
  sm: { min: 576 },
  md: { min: 768 },
  lg: { min: 992 },
  xl: { min: 1200 },
  xxl: { min: 1600 },
}

const BREAKPOINT = Object.entries(BREAKPOINT_SIZE).reduce(
  (a, [key, value]) => {
    const k = Object.keys(value)[0] as unknown as string
    const v = value[k]

    return Object.assign(a, {
      [key]: `(${k}-width: ${v}px)`,
    })
  },
  {} as {
    [key in keyof typeof BREAKPOINT_SIZE]: string
  },
)

const BOX_SHADOW = {
  none: 'none',
  DEFAULT: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
  card: '0px 4px 8px 0px rgba(0, 0, 0, 0.02)',
  //
  secondary: '0px 2px 8px 0px rgba(0, 0, 0, 0)',
  tertiary: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
  //
  dept1: '1px 4px 11px 0px #00000040',
}

export const THEME_CONFIG = {
  typography: TYPOGRAPHY,
  colors: COLORS,
  breakpoint: BREAKPOINT,
  breakpointSize: BREAKPOINT_SIZE,
  boxShadow: BOX_SHADOW,
}

export const BREAKPOINT_SIZE_KEYS = Object.keys(BREAKPOINT_SIZE)
