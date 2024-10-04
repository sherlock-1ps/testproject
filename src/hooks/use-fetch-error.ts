import { useLingui } from '@lingui/react'

import { ERROR_CODE_MESSAGE } from '@/constants/error'
import { ErrorCode } from '@/enums/error'
import usePopup from './context/use-popup'

export const useFetchError = () => {
  const { _ } = useLingui()
  const { message } = usePopup()

  const getErrorCode = (error: any): ErrorCode => {
    let errorCode = ErrorCode.UNKNOWN

    // NOTE: ถ้าพบ code ให้ใช้ code จาก error แต่ต้องทำการ set ให้ทั้ง enum และ constant ด้วย
    if (Object.values(ErrorCode).includes(error?.code)) errorCode = error.code

    return errorCode
  }

  const getErrorMessage = (error: any): { code: ErrorCode; message: string } => {
    const errorCode = getErrorCode(error)

    if (errorCode === ErrorCode.UNKNOWN && Boolean(error?.message))
      return {
        code: errorCode,
        message: error.message ?? 'no set error message',
      }
    return {
      code: errorCode,
      message: _(ERROR_CODE_MESSAGE[getErrorCode(error)]),
    }
  }

  const showErrorMessage = (error: any): void => {
    message.error(getErrorMessage(error).message)
  }

  return {
    getErrorCode,
    getErrorMessage,
    showErrorMessage,
  }
}
