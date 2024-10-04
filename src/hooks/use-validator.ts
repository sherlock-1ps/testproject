import { zodParseAsync } from '@/utils/validator'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import type { Rule } from 'antd/lib/form'
import { z } from 'zod'

export const useValidator = () => {
  const { _ } = useLingui()

  // const validateUsernameSchema: Rule = {
  //   pattern: /^[a-zA-Z0-9_]*$/,
  //   message: _(msg`ต้องเป็นตัวอักษรภาษาอังกฤษ ตัวเลข และ _ ได้เท่านั้น เช่น account_01`),
  // }
  const validateUsernameSchema: Rule = {
    pattern: /^[a-zA-Z0-9]*$/,
    message: _(msg`Must be English letters or numbers, e.g., account01`),
  }

  const validatePasswordSchema: Rule = {
    pattern: /^[a-zA-Z0-9!@#$%^&*()-_+=]*$/,
    message: _(msg`Must be English letters, numbers, or special characters only`),
  }

  const validateNumberUppercaseSchema: Rule = {
    pattern: /^[A-Z0-9]*$/,
    message: _(msg`Only uppercase letters A-Z and digits 0-9 are allowed`),
  }

  const validateUppercaseSchema: Rule = {
    pattern: /^[A-Z]*$/,
    message: _(msg`Only uppercase letters A-Z are allowed`),
  }

  const validateNumberSchema: Rule = {
    pattern: /^[0-9]*$/,
    message: _(msg`Can only fill in numbers`),
  }

  const validateURLSchema: Rule = {
    async validator(_rule, value) {
      if (!value) return
      const schema = z.string().url(_(msg`Invalid URL`))
      await zodParseAsync(schema, value)
    },
  }

  return {
    validateUsernameSchema,
    validatePasswordSchema,
    validateNumberUppercaseSchema,
    validateUppercaseSchema,
    validateNumberSchema,
    validateURLSchema,
  }
}
