import type { SortOrder } from 'antd/lib/table/interface'
import type { RcFile } from 'antd/lib/upload'
import type { UploadRequestOption } from 'rc-upload/lib/interface'

import type { PaginateOrder } from '@/types/pagination'

export const getIsSSR = () => typeof window === 'undefined'

/**
 * Convert sort order form table of ant design to [enum Order]
 */
export const getSortOrder = (value: SortOrder): PaginateOrder => {
  switch (value) {
    case 'ascend':
      return 'asc'
    case 'descend':
      return 'desc'
    default:
      return undefined
  }
}

/**
 * Convert [enum Order] to sort order
 */
export const getAntdSortOrder = (value: PaginateOrder): SortOrder => {
  switch (value) {
    case 'asc':
      return 'ascend'
    case 'desc':
      return 'descend'
    default:
      return undefined
  }
}

/**
 * Get default sort order by query params
 */
// export const getDefaultSortOrder = <KeyType = string>(queryParams: IPaginationQuery<any>, key: KeyType): SortOrder => {
//   const sort = queryParams?.sort as IPaginateSortable<any>[]
//   if (sort?.length > 0) {
//     const findSort = sort.find((e) => e.sort === key)
//     return findSort ? getAntdSortOrder(findSort.order) : null
//   }
//   const sortObj = queryParams?.sort as IPaginateSortable<any>
//   return sortObj?.sort === key ? getAntdSortOrder(sortObj.order) : null
// }

/**
 * Get Base64 for file
 */
export const getBase64 = (img: RcFile | File, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

/**
 * For make dummy request for antd upload component
 */
export const dummyRequest = (options: UploadRequestOption<any>) => options?.onSuccess('ok')

/**
 * Get Offset Top by HTML Element
 */
export const getOffsetTop = (el: HTMLElement) =>
  el.offsetTop + (el.offsetParent && getOffsetTop(el.offsetParent as HTMLElement))
