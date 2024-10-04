'use client'
import Container from '@/components/base/ui/container'
import PermissionProtect from '@/components/base/utils/permission-protect'
import CreateButton from '@/components/buttons/create-button'
import BackofficePageContent from '@/components/layouts/backoffice/page-content'
import BackofficePageHeader from '@/components/layouts/backoffice/page-header'
import { Permission } from '@/enums/permission'
import { cn } from '@/utils/cn'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Card, Typography } from 'antd'

interface IPageProps {}

const Page = ({}: IPageProps) => {
  const { _ } = useLingui()

  return (
    <Container>
      <BackofficePageHeader title={_(msg`Manage roles`)} className={cn(`flex items-center`)}>
        <PermissionProtect permission={[Permission.ROLE_CREATE]}>
          <CreateButton
            className={cn(`ml-auto`)}
            onClick={() => {
              alert('Create new role')
            }}
          >
            {_(msg`Create new role`)}
          </CreateButton>
        </PermissionProtect>
      </BackofficePageHeader>
      <BackofficePageContent>
        <Card className="min-h-screen">
          <Typography.Title level={2}>...</Typography.Title>
        </Card>
      </BackofficePageContent>
    </Container>
  )
}

export default Page
