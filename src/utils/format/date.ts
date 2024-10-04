import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

export const DATE_FORMAT = {
  date: 'DD/MM/YYYY',
  dateTime: 'DD/MM/YYYY, HH:mm:ss',
  time: 'HH:mm:ss',
}

const isInvalidDate = (d: Date | string | number | Dayjs) => {
  return d?.toString() === 'Invalid Date' || !Boolean(d)
}

export const formatDate = (d: Date | string | number | Dayjs, f: string = DATE_FORMAT.date): string => {
  if (isInvalidDate(d)) return ''
  return dayjs(d).format(f)
}

export const formatTime = (d: Date | string | number | Dayjs, f: string = DATE_FORMAT.time): string => {
  if (isInvalidDate(d)) return ''
  return dayjs(d).format(f)
}

export const formatDateTime = (d: Date | string | number | Dayjs, f: string = DATE_FORMAT.dateTime): string => {
  if (isInvalidDate(d)) return ''
  return dayjs(d).format(f)
}
