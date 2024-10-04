'use client'

import { forwardRef, useCallback, useMemo } from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Link from 'next/link'

import { useRouter } from '@/hooks/use-router'
import type { IButtonProps } from '../base/ui/button'
import Button from '../base/ui/button'

interface IBackButtonProps extends IButtonProps {
  // NOTE: ต้องส่งมาทั้งคู่ backHref เป็นเหมือน fallback
  backHref?: string
  isHistoryBack?: boolean
}

const BackButton = forwardRef<HTMLButtonElement, IBackButtonProps>(
  ({ onClick, backHref, isHistoryBack = false, type = 'primary', variant = 'secondary', ...props }, ref) => {
    const { _ } = useLingui()
    const router = useRouter()

    // _Callback
    const handleHistoryBack = useCallback(() => {
      if (window.history?.length && window.history.length > 1) {
        router.back()
      } else {
        router.replace(backHref || '/')
      }
    }, [backHref, router])

    // _Memo
    const renderButton = useMemo(() => {
      return (
        <Button
          ref={ref}
          type={type}
          variant={variant}
          icon={<ArrowLeftOutlined />}
          onClick={(e) => {
            onClick?.(e)

            if (isHistoryBack && backHref) handleHistoryBack()
          }}
          {...props}
        >
          {_(msg`Back`)}
        </Button>
      )
      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    }, [_, backHref, handleHistoryBack, isHistoryBack, onClick, props, ref, type, variant])

    if (backHref) {
      return (
        <Link href={backHref} passHref legacyBehavior>
          {renderButton}
        </Link>
      )
    }

    return renderButton
  },
)
BackButton.displayName = 'BackButton'

export default BackButton
