import { withTV } from 'tailwind-variants/transformer'
import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

import { THEME_CONFIG } from './src/constants/theme'

const { breakpointSize, colors, typography, boxShadow } = THEME_CONFIG

const config: Config = withTV({
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    // NOTE: you can't use default colors, becuase should use `antd` token config
    colors: {
      ...colors,

      //
      transparent: 'transparent',
    },

    fontSize: {
      ...(typography as { [key in keyof typeof typography]: [string, string] }),
    },

    screens: Object.entries(breakpointSize).reduce(
      (a, [key, value]) => {
        const k = Object.keys(value)[0] as unknown as string
        const v = value[k]

        return {
          ...a,
          ...{
            [key]: { [k]: `${v}px` },
          },
        }
      },
      {} as {
        [key in keyof typeof breakpointSize]: string
      },
    ),

    // NOTE: you can't use default `box shadow`, becuase should use `antd` token config
    boxShadow,

    extend: {
      fontFamily: {
        sans: ['var(--font-en, Arial)', 'var(--font-th, Arial)', ...fontFamily.sans],
        th: ['var(--font-th, Arial)', ...fontFamily.sans],
        en: ['var(--font-en, Arial)', ...fontFamily.sans],
      },

      maxWidth: {
        form: '776px',
      },

      spacing: {
        'header-top-h': 'var(--header-top-h)',
      },

      keyframes: {
        'animation-loader': {
          '0%': {
            backgroundPosition: '0px 0px',
          },
          '50%': {
            backgroundPosition: '400% 0%',
          },
          '100%': {
            backgroundPosition: '0px 0px',
          },
        },
      },

      animation: {
        loader: '20s linear 0s infinite normal none running animation-loader',
      },

      backgroundImage: {
        'loader-gradient': `linear-gradient(45deg, rgb(235 119 48), rgb(221 110 45))`,
      },

      backgroundSize: {
        '10%': '10%',
      },
    },
  },

  corePlugins: {
    preflight: false,
  },

  plugins: [
    require('tailwindcss-animate'),

    plugin(({ addUtilities, addComponents, theme }) => {
      addComponents({
        // formatter JSON
        '.formatter-json': {
          backgroundColor: '#28253a',
          color: 'white',
          padding: theme('spacing.2'),
          borderRadius: theme('spacing.2'),

          '.string': {
            color: '#CE9178',
          },

          '.key': {
            color: '#569CD6',
          },

          '.number': {
            color: '#4EC9B0',
          },
        },

        // Form.Item
        '.no-star': {
          '&.ant-form-item .ant-form-item-label >label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before':
            {
              display: 'none',
            },
        },

        // Pin Input
        '.pin-input': {
          display: 'flex',

          '&>input': {
            background: 'transparent',
            border: `1px solid ${theme('colors.border')}`,
            textAlign: 'center',
            color: theme('colors.white'),
            borderRadius: '8px',

            '&:focus': {
              outline: 'none',
              borderColor: theme('colors.primary'),
            },

            '&:not(:placeholder-shown)': {
              borderColor: theme('colors.success'),
            },
          },

          '&.error': {
            '&>input': {
              borderColor: theme('colors.error'),
            },
          },
        },

        // Link
        '.link': {
          color: theme('colors.primary'),

          '&:hover': {
            color: theme('colors.primary-hover'),
            textDecoration: 'underline',
          },
        },

        // Dropdown
        '.dropdown-item-success': {
          color: `${theme('colors.success')} !important`,

          '&:hover': {
            color: `${theme('colors.white')} !important`,
            backgroundColor: `${theme('colors.success')} !important`,
          },
        },
      })

      addUtilities({
        '.min-h-screen': {
          minHeight: 'calc((var(--vh, 1vh) * 100))',
        },
        '.h-screen': {
          height: 'calc((var(--vh, 1vh) * 100))',
        },
        '.min-h-content': {
          minHeight: `calc((var(--vh, 1vh) * 100) - 120px)`,
        },
      })
    }),
  ],
})

export default config
