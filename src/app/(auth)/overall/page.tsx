'use client'

import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Card, Select, Typography } from 'antd'
import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, GetProps } from 'antd';

import Container from '@/components/base/ui/container'
import BackofficePageContent from '@/components/layouts/backoffice/page-content'
import BackofficePageHeader from '@/components/layouts/backoffice/page-header'
import { cn } from '@/utils/cn'

interface IPageProps { }

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;
const Option = Select.Option;

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};


const Page = ({ }: IPageProps) => {
  const { _ } = useLingui()

  return (
    <Container>
      <BackofficePageHeader title={_(msg`Overall`)} />
      <BackofficePageContent>
        <Card className={cn(` min-h-52`)}>
          <Space direction="vertical" size={6} style={{ marginRight: "10px" }}>
            <Typography.Title level={5}>Date</Typography.Title>
            <RangePicker
              // showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD"
              onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
              }}
              onOk={onOk}
            />

          </Space>

          <Space direction="vertical" size={6}>
            <Typography.Title level={5}>Provider</Typography.Title>
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={() => {
              console.log("hello");
            }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Space>

        </Card>
      </BackofficePageContent>
    </Container>
  )
}

export default Page
