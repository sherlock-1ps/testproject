import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'

export const DATE_RANGE_PRESETS: {
  today: RangeValueType<Dayjs>
  yesterday: RangeValueType<Dayjs>
  thisWeek: RangeValueType<Dayjs>
  lastWeek: RangeValueType<Dayjs>
  thisMonth: RangeValueType<Dayjs>
  lastMonth: RangeValueType<Dayjs>
} = {
  today: [dayjs().startOf('day'), dayjs().endOf('day')],
  yesterday: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')],
  thisWeek: [dayjs().startOf('week').startOf('day'), dayjs().endOf('day')],
  lastWeek: [
    dayjs().subtract(1, 'week').startOf('week').startOf('day'),
    dayjs().subtract(1, 'week').endOf('week').endOf('day'),
  ],
  thisMonth: [dayjs().startOf('month').startOf('day'), dayjs().endOf('day')],
  lastMonth: [
    dayjs().subtract(1, 'month').startOf('month').startOf('day'),
    dayjs().subtract(1, 'month').endOf('month').endOf('day'),
  ],
}
