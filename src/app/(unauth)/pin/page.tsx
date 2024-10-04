'use client'

import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useMutation } from '@tanstack/react-query'
import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { AnimatePresence, motion } from 'framer-motion'
import { range } from 'lodash-es'

import Button from '@/components/base/ui/button'
import BackButton from '@/components/buttons/back-button'
import { ERROR_CODE_MESSAGE } from '@/constants/error'
import { ErrorCode } from '@/enums/error'
import { useAuth } from '@/hooks/auth/use-auth'
import usePopup from '@/hooks/context/use-popup'
import { useFetchError } from '@/hooks/use-fetch-error'
import { useIsMounted } from '@/hooks/use-is-mounted'
import AuthService from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import type { IAuthSetPinPayload, ISignInWithPinPayload } from '@/types/auth'
import { cn } from '@/utils/cn'
import UnauthCard from '../_card'

interface IPageProps {}

interface INumPadOption {
  key: string
  label: string
  icon?: ReactNode
}

const PIN_SIZE = 6

const Page = ({}: IPageProps) => {
  const { _ } = useLingui()
  const { signInData } = useAuth()
  const { clearSignInData, setSignInData, setAccessToken, clearAuth } = useAuthStore()
  const hasPin = !signInData?.isSetPassword && !signInData?.isSetPin
  const { isMounted } = useIsMounted()
  const { message } = usePopup()
  const { showErrorMessage, getErrorCode } = useFetchError()

  // _State
  const [code, setCode] = useState<string[]>([])
  const [tempCode, setTempCode] = useState<string[]>([])
  const [validateErrorMsg, setValidateErrorMsg] = useState<string>(null)

  // _Pin
  const [state, send] = useMachine(
    pinInput.machine({
      id: `set-pin`,
      value: range(0, PIN_SIZE).map(() => ''),
      placeholder: '',
      type: 'numeric',
      mask: true,
      disabled: isMounted,
      onValueChange: (val) => {
        setCode(val.value.filter((e) => !!e))
        setValidateErrorMsg(null)
      },
    }),
  )
  const pinApi = pinInput.connect(state, send, normalizeProps)
  const { valueAsString: pinValue } = state.context

  // _Memo
  const numPadOptions: INumPadOption[] = useMemo(() => {
    return [
      ...range(1, 10).map((n) => ({
        key: String(n),
        label: String(n),
        icon: null,
      })),
      {
        key: 'reset',
        label: _(msg`Clear`),
        icon: <DeleteOutlined />,
      },
      {
        key: '0',
        label: '0',
        icon: null,
      },
      {
        key: 'remove',
        label: _(msg`Delete`),
        icon: <CloseOutlined />,
      },
    ]
  }, [_])

  // _Mutation
  const { mutate: onSetPin, isPending: isSetPinPending } = useMutation({
    mutationFn: (payload: IAuthSetPinPayload) => AuthService.setPin(payload),
    onError: showErrorMessage,
    onSuccess: () => {
      setSignInData({
        ...signInData,
        isSetPin: false,
      })
      setCode([])
      setTempCode([])
      clearValue()
      message.success(_(msg`PIN set successfully`))
    },
  })

  const { mutate: onSignIn, isPending: isSignInPending } = useMutation({
    mutationFn: (payload: ISignInWithPinPayload) => AuthService.signInWithPin(payload),
    onError: (err) => {
      const errorCode = getErrorCode(err)
      if (errorCode === ErrorCode.INVALID_PIN) {
        clearValue()
        setValidateErrorMsg(_(ERROR_CODE_MESSAGE[errorCode]))
      } else {
        showErrorMessage(err)
      }
    },
    onSuccess: () => {
      setAccessToken(signInData.token)
      setTimeout(() => {
        clearSignInData()
      }, 150)
    },
  })

  const isConfirm = tempCode.length === PIN_SIZE
  const completed = code.length === PIN_SIZE
  const isLoading = isSetPinPending || isSignInPending

  // _Event
  const clearValue = () => {
    pinApi.clearValue()
  }

  const handleNumPadChange = (key: INumPadOption['key']) => {
    const codeLength = code.length

    if (!isNaN(Number(key))) {
      if (codeLength < PIN_SIZE) pinApi.setValueAtIndex(codeLength, key)
    } else {
      if (key === 'remove') {
        const codeRemoved = code.slice(0, code.length - 1)
        pinApi.setValue([...range(0, PIN_SIZE).keys()].map((n) => codeRemoved[n] ?? ''))
      }

      if (key === 'reset') clearValue()
    }
  }

  const handleConfirmCode = () => {
    if (tempCode.toString() !== code.toString()) {
      clearValue()
      setValidateErrorMsg(_(msg`PIN confirmation incorrect, please try again`))
      return
    }

    onSetPin({
      pin: code.join(''),
      token: signInData.token,
    })
  }

  // _Callback
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleSubmit = useCallback(() => {
    if (isLoading || !completed) return

    if (isConfirm) {
      handleConfirmCode()
    } else if (!hasPin) {
      clearValue()
      setTempCode(code)
    } else {
      onSignIn({
        pin: code.join(''),
        token: signInData.token,
      })
    }
  }, [isLoading, completed, isConfirm, hasPin, code, signInData?.token])

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Enter') handleSubmit()
    },
    [handleSubmit],
  )

  // _Effect
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown, false)
    return () => {
      window.removeEventListener('keydown', handleKeydown, false)
    }
  }, [handleKeydown])

  return (
    <UnauthCard
      title={
        hasPin
          ? _(msg`Enter your PIN`)
          : isConfirm
            ? _(msg`Confirm your PIN again`)
            : _(msg`Set a PIN to access the system`)
      }
      titleLevel={hasPin ? 2 : 3}
      className={cn({
        'pointer-events-none': !isMounted,
      })}
      isDescription={false}
    >
      <form
        name="pin-form"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className={cn(`mt-6 space-y-6`)}
      >
        <input name="pincode" type="hidden" value={pinValue} />
        <div
          {...pinApi.rootProps}
          className={cn(`pin-input`, `flex gap-2`, {
            error: !!validateErrorMsg,
          })}
        >
          {range(0, PIN_SIZE).map((n) => (
            <input
              key={`pin-${n}`}
              {...pinApi.getInputProps({ index: n })}
              className={cn(`w-full flex-1 text-[40px]`, `xs:!h-16 xs:pb-1`)}
            />
          ))}
        </div>
        <AnimatePresence>
          {!!validateErrorMsg ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.3 }}
              className={cn(`!mt-2 !text-error`)}
            >
              {validateErrorMsg}
            </motion.p>
          ) : null}
        </AnimatePresence>

        <div className={cn(`grid grid-cols-3 gap-4`)}>
          {numPadOptions.map((option) => (
            <Button
              key={`numpad-${option.key}`}
              type="primary"
              className={cn(`!flex`)}
              icon={option.icon}
              variant="pin"
              size="large"
              onClick={() => {
                handleNumPadChange(option.key)
              }}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className={cn(`flex justify-end space-x-3`)}>
          {isConfirm ? (
            <BackButton
              onClick={() => {
                setTempCode([])
                setValidateErrorMsg(null)
              }}
              disabled={isLoading}
            />
          ) : (
            <Button
              type="primary"
              variant="secondary"
              onClick={() => {
                clearAuth()
              }}
              disabled={isLoading}
            >
              {_(msg`Cancel`)}
            </Button>
          )}
          <Button type="primary" variant="primary" htmlType="submit" loading={isLoading} disabled={!completed}>
            {_(msg`OK`)}
          </Button>
        </div>
      </form>
    </UnauthCard>
  )
}

export default Page
