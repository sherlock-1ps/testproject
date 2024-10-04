'use client'

import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useMutation } from '@tanstack/react-query'
import { Form, Input } from 'antd'

import Button from '@/components/base/ui/button'
import usePopup from '@/hooks/context/use-popup'
import { useFetchError } from '@/hooks/use-fetch-error'
import AuthService from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import type { ISignInPayload } from '@/types/auth'
import { cn } from '@/utils/cn'
import UnauthCard from './_card'

interface IPageProps { }

interface IFormValues {
  username: string
  password: string
}

const Page = ({ }: IPageProps) => {
  const { _ } = useLingui()
  const { showErrorMessage } = useFetchError()
  const { setSignInData } = useAuthStore()
  const { modal } = usePopup()

  // _Mutation
  const { mutate: onSignIn, isPending } = useMutation({
    mutationFn: (payload: ISignInPayload) => AuthService.signIn(payload),
    onSuccess: (res) => {
      setSignInData(res)
    },
    onError: showErrorMessage,
  })

  return (
    <UnauthCard title={_(msg`Login`)}>
      <Form
        name="sign-in-form"
        layout="vertical"
        onFinish={(values: IFormValues) => {
          onSignIn({
            username: values.username,
            password: values.password,
          })
        }}
        autoComplete="off"
        className={cn(`!mt-4 flex flex-col`)}
      >
        <div className={cn(`space-y-4`)}>
          <Form.Item<IFormValues>
            name="username"
            label={_(msg`Username`)}
            className="no-star"
            rules={[{ required: true }]}
          >
            <Input placeholder={_(msg`Enter username`)} disabled={isPending} autoComplete="username" />
          </Form.Item>

          <Form.Item<IFormValues>
            name="password"
            label={_(msg`Password`)}
            className="no-star"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder={_(msg`Enter password`)} disabled={isPending} autoComplete="password" />
          </Form.Item>
        </div>

        <Button
          type="link"
          className={cn(`!h-auto !p-0 mt-2 self-end`)}
          onClick={() => {
            modal.info({
              title: _(msg`Forgot password?`),
              content: _(
                msg`Please contact the administrator to reset your password or contact the service backoffice if you need assistance`,
              ),
            })
          }}
        >
          {_(msg`Forgot password?`)}
        </Button>

        <Button type="primary" htmlType="submit" loading={isPending} block className={cn(`mt-4`)}>
          {_(msg`Login`)}
        </Button>
      </Form>
    </UnauthCard>
  )
}

export default Page
