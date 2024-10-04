import type { DurationSpringOptions, KeyframeOptions, Variants } from 'framer-motion'

type VariantKey = 'fadeIn' | 'fadeInUp' | 'zoomIn' | 'slideInFromRight' | 'collapse'

export const MOTION_VARIANTS: Record<
  VariantKey,
  {
    variants: Variants
    transition: KeyframeOptions & DurationSpringOptions
  }
> = {
  fadeIn: {
    variants: {
      enter: {
        opacity: 1,
      },
      exit: {
        opacity: 0,
      },
    },
    transition: {
      duration: 0.15,
    },
  },

  fadeInUp: {
    variants: {
      enter: {
        y: 0,
        opacity: 1,
      },
      exit: {
        y: 10,
        opacity: 0,
      },
    },
    transition: {
      duration: 0.15,
    },
  },

  zoomIn: {
    variants: {
      enter: {
        scale: 1,
        opacity: 1,
      },
      exit: {
        scale: 0.975,
        opacity: 0,
      },
    },
    transition: {
      duration: 0.15,
    },
  },
  slideInFromRight: {
    variants: {
      enter: {
        x: 0,
      },
      exit: {
        x: '100%',
      },
    },
    transition: {
      duration: 0.15,
    },
  },
  collapse: {
    variants: {
      expanded: { opacity: 1, height: 'auto' },
      collapsed: { opacity: 0, height: 0 },
    },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}
