import { ErrorCode } from '@/enums/error'
import { msg } from '@lingui/macro'

export const ERROR_CODE_MESSAGE = {
  // Base
  [ErrorCode.UNKNOWN]: msg`Something wrong`,

  // Auth
  [ErrorCode.INVALID_AUTHORIZATION]: msg`Invalid authorization`,
  [ErrorCode.UNAUTHORIZED]: msg`Unauthorized`,
  [ErrorCode.FORBIDDEN]: msg`Unauthorized`,
  [ErrorCode.INVALID_CREDENTIALS]: msg`Incorrect information`,
  [ErrorCode.SUSPENDED_TOO_MANY_ATTEMPTS]: msg`Account suspended due to excessive requests`,
  [ErrorCode.INVALID_USERNAME_OR_PASSWORD]: msg`Username or password is incorrect`,
  [ErrorCode.MISSING_AUTHORIZATION]: msg`Unauthorized`,
  [ErrorCode.INVALID_PIN]: msg`You entered an incorrect PIN`,
  [ErrorCode.ACCOUNT_SUSPENDED]: msg`Account suspended`,
  [ErrorCode.OLD_PASSWORD_NOT_CORRECT]: msg`The original password is incorrect.`,
}
