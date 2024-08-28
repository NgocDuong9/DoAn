import { cn } from '@/libs/utils'
import { Select, Skeleton } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'

interface DateSelectProps {
  disable?: boolean
  loading?: boolean
  value?: Date | string
  defaultDate: Date | string
  onChange: (fullDate: Date) => void
}

function DateSelect({
  defaultDate,
  value,
  onChange,
  disable,
  loading
}: DateSelectProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultDate instanceof Date ? defaultDate : new Date(defaultDate)
  )
  useEffect(() => {
    if (value) setSelectedDate(value instanceof Date ? value : new Date(value))
  }, [value])

  useEffect(() => {
    const day = new Date(selectedDate.toISOString())
    const date = day.getDate()
    day.setDate(date + 1)
    onChange(day)
  }, [selectedDate])

  const generateOptions = (field: 'day' | 'month' | 'year') => {
    const options = []
    let start: number = 0
    let end: number = 0

    if (field === 'day') {
      const daysInMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ).getDate()
      start = 1
      end = daysInMonth
    } else if (field === 'month') {
      start = 1
      end = 12
    } else if (field === 'year') {
      start = new Date().getFullYear() - 100
      end = new Date().getFullYear()
    }

    for (let i = start; i <= end; i++) {
      const label = i.toString()
      let value = i.toString()
      if (field === 'month') {
        value = (i - 1).toString()
      }
      if (field === 'day') {
        value = i.toString()
      }
      options.push({
        value: value,
        label: label
      })
    }
    return options
  }
  const styled = useMemo(
    () => 'md:w-[150px] rounded-[10px] px-2 py-1 bg-[#F8F8F8]',
    []
  )
  const styledObj = useMemo(
    () => ({
      root: 'bg-[#F8F8F880]',
      input: 'bg-transparent border-0',
      options: 'bg-[#F8F8F880] px-2',
      option: 'bg-transparent px-2 hover:bg-[#F8F8F840]'
    }),
    []
  )

  if (loading) {
    return (
      <div className="date-select flex justify-start gap-2">
        <Skeleton className={cn(styled, 'h-11')} />
        <Skeleton className={cn(styled, 'h-11')} />
        <Skeleton className={cn(styled, 'h-11')} />
      </div>
    )
  }

  return (
    <div className="date-select flex justify-start gap-2">
      <Select
        disabled={disable}
        className={styled}
        classNames={styledObj}
        data={generateOptions('day')}
        value={selectedDate.getDate().toString()}
        onChange={value =>
          value &&
          setSelectedDate(
            new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              parseInt(value, 10)
            )
          )
        }
      />

      <Select
        disabled={disable}
        className={styled}
        classNames={styledObj}
        data={generateOptions('month')}
        value={selectedDate.getMonth().toString()}
        onChange={value =>
          value &&
          setSelectedDate(
            new Date(
              selectedDate.getFullYear(),
              parseInt(value, 10),
              selectedDate.getDate()
            )
          )
        }
      />

      <Select
        disabled={disable}
        className={styled}
        classNames={styledObj}
        data={generateOptions('year')}
        value={selectedDate.getFullYear().toString()}
        onChange={value =>
          value &&
          setSelectedDate(
            new Date(
              parseInt(value, 10),
              selectedDate.getMonth(),
              selectedDate.getDate()
            )
          )
        }
      />
    </div>
  )
}

export default DateSelect
