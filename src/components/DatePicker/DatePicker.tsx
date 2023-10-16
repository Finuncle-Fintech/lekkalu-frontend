import { CalendarIcon } from 'lucide-react'
import dayjs from 'dayjs'
import React from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/utils/utils'
import { Calendar, CalendarProps } from '../ui/calendar'

export type DatePickerProps = Omit<CalendarProps, 'onSelect'> & {
  className?: string
  style?: React.CSSProperties
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  defaultDate?: Date
}

export default function DatePicker({
  className,
  style,
  onChange,
  placeholder,
  defaultDate,
  ...props
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(defaultDate)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn('justify-start text-left font-normal w-full', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? dayjs(date).format('MMM DD, YYYY') : <span>{placeholder ?? 'Pick a date'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-auto p-0', className)} style={style}>
        <Calendar
          {...props}
          mode='single'
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate)
            onChange?.(selectedDate)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
