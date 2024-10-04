export interface IPaginate {
  firstPage: boolean
  lastPage: boolean
  limit: number
  page: number
  totalItems: number
  totalPages: number
}

export type PaginateOrder = 'asc' | 'desc' | null

export interface IPaginateSortable<T> {
  column: keyof T
  order: PaginateOrder
}

export interface IPaginationQuery<T> {
  search?: string
  from?: Date | string | number
  to?: Date | string | number
  paginate?: Pick<IPaginate, 'page' | 'limit'>
  sort?: IPaginateSortable<T>[] | IPaginateSortable<T>
}

export interface IPaginatedResponse<T> {
  items: T[]
  paginate: IPaginate
}
