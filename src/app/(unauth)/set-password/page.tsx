'use client'

import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useMutation } from '@tanstack/react-query'
import { Form, Input } from 'antd'

import Button from '@/components/base/ui/button'
import { useAuth } from '@/hooks/auth/use-auth'
import usePopup from '@/hooks/context/use-popup'
import { useFetchError } from '@/hooks/use-fetch-error'
import AuthService from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import type { IAuthSetPasswordPayload } from '@/types/auth'
import { cn } from '@/utils/cn'
import UnauthCard from '../_card'

interface IPageProps {}

interface IFormValues extends Omit<IAuthSetPasswordPayload, 'signInTokenId'> {}

const Page = ({}: IPageProps) => {
  const { _ } = useLingui()
  const { setSignInData, clearSignInData } = useAuthStore()
  const { signInData } = useAuth()
  const { message } = usePopup()
  const { showErrorMessage } = useFetchError()

  // _Mutation
  const { mutate: onSetPassword, isPending } = useMutation({
    mutationFn: (payload: IAuthSetPasswordPayload) => AuthService.setPassword(payload),
    onSuccess: () => {
      setSignInData({
        ...signInData,
        isSetPassword: false,
      })
      message.success(_(msg`Password set successfully`))
    },
    onError: (err) => {
      showErrorMessage(err)
      setSignInData(null)
    },
  })

  return (
    <UnauthCard title={_(msg`Set new password`)} isDescription={false}>
      <Form
        name="set-password-form"
        layout="vertical"
        onFinish={(values: IFormValues) => {
          onSetPassword({
            password: values.password,
            token: signInData.token,
          })
        }}
        autoComplete="off"
        className={cn(`!mt-4 flex flex-col space-y-4`, `sm:space-y-6`)}
      >
        <Form.Item<IFormValues>
          label={_(msg`Password`)}
          name="password"
          className="no-star"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password placeholder={_(msg`Enter password`)} disabled={isPending} />
        </Form.Item>

        <Form.Item<IFormValues>
          label={_(msg`Confirm password`)}
          name="confirmPassword"
          className="no-star"
          dependencies={['password']}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              async validator(_rule, value) {
                if (!value || getFieldValue('password') === value) return
                throw new Error(_(msg`The confirmation password does not match`))
              },
            }),
          ]}
        >
          <Input.Password placeholder={_(msg`Enter confirm password`)} disabled={isPending} />
        </Form.Item>

        <div className={cn(`flex justify-end space-x-3`)}>
          <Button
            type="primary"
            variant="secondary"
            onClick={() => {
              clearSignInData()
            }}
            disabled={isPending}
          >
            {_(msg`Cancel`)}
          </Button>
          <Button type="primary" htmlType="submit" className={cn(`self-end`)} loading={isPending}>
            {_(msg`Confirm`)}
          </Button>
        </div>
      </Form>
    </UnauthCard>
  )
}

export default Page
