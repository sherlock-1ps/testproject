import { useCallback, useMemo } from 'react'

import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import type { TablePaginationConfig } from 'antd'

import { formatNoRound } from '@/utils/format/number'

interface IUsePaginationProps {
  options?: false | TablePaginationConfig
}

interface IReturnType {
  showTotal?: (total: number, range: [number, number]) => string
  pagination: false | TablePaginationConfig
}

const DEFAULT: TablePaginationConfig = {
  defaultPageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50, 100, 200, 500],
  showLessItems: true,
  responsive: true,
}

const usePagination = (_options?: IUsePaginationProps): IReturnType => {
  const options = _options?.options
  const { _ } = useLingui()

  // _Events
  const showTotal: IReturnType['showTotal'] = useCallback(
    (total, range) => {
      return _(msg`Show ${formatNoRound(range[0])} - ${formatNoRound(range[1])} from ${formatNoRound(total)} items`)
    },
    [_],
  )

  // _Memo
  const pagination = useMemo(() => {
    return {
      ...DEFAULT,
      showTotal,
      ...options,
    }
  }, [showTotal, options])

  return {
    showTotal,
    pagination,
  }
}

export default usePagination
