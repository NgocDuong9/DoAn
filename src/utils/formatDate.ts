import dayjs from 'dayjs'

export function formatTimes(timestamp: string | undefined): string {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}/${month}/${year}`
}

export interface OptionSelect<T = string | number> {
  value: T
  label: string
  disabled?: boolean
  color?: string
  placeholder?: string
}

export const enum IDaysWeekType {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

const DaysOfWeek: Array<OptionSelect<IDaysWeekType>> = [
  { value: IDaysWeekType.SUNDAY, label: 'Chủ nhật' },
  { value: IDaysWeekType.MONDAY, label: 'Thứ hai' },
  { value: IDaysWeekType.TUESDAY, label: 'Thứ ba' },
  { value: IDaysWeekType.WEDNESDAY, label: 'Thứ tư' },
  { value: IDaysWeekType.THURSDAY, label: 'Thứ năm' },
  { value: IDaysWeekType.FRIDAY, label: 'Thứ sáu' },
  { value: IDaysWeekType.SATURDAY, label: 'Thứ bảy' }
]

export const formatDate = (dateString: string) => {
  const date = dayjs(new Date(dateString))
  const d = dayjs(date).format('d')

  return {
    hours: date.format('HH:mm'),
    hourOnly: date.format('HH'),
    minOnly: date.format('mm'),
    day: DaysOfWeek[+d]?.label,
    fullTime: date.format('DD/MM/YYYY'),
    month: date.format('MM'),
    date: date.format('DD'),
    year: date.format('YYYY')
  }
}
