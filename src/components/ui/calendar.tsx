import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker, DropdownProps } from 'react-day-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/utils/utils'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center',
        caption_label: props.mode === 'range' ? 'block' : 'hidden',
        dropdowns: 'flex justify-center gap-1',
        nav: 'space-x-1 flex items-center',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'h-9 w-10 bg-transparent p-0 opacity-50 hover:opacity-100 absolute top-9 sm:left-7 sm:top-5 z-10',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'h-9 w-10 bg-transparent p-0 opacity-50 hover:opacity-100 absolute top-9 right-3 sm:top-5 z-10',
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full',
        ),
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full',
        today: 'bg-accent text-accent-foreground rounded-full',
        outside: 'text-muted-foreground opacity-50',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, options }: DropdownProps) => {
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>
            onChange?.(changeEvent)
          }
          const current_label = options?.findIndex((each) => each.value === value) as number
          const _selectedValue = options?.length === 12 ? options[current_label]?.label : value
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value)
              }}
            >
              <SelectTrigger className='pr-1.5 focus:ring-0' value={value}>
                <SelectValue>{_selectedValue}</SelectValue>
              </SelectTrigger>
              <SelectContent position='popper'>
                <ScrollArea className='h-80'>
                  {options?.map((option, id: number) => (
                    <SelectItem key={`${option.value}-${id}`} value={option.value?.toString() ?? ''}>
                      {option.label}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          )
        },
        Chevron: (props) => {
          if (props.orientation === 'left') {
            return <ChevronLeft className='h-4 w-4' {...props} />
          }
          if (props.orientation === 'right') {
            return <ChevronRight className='h-4 w-4' {...props} />
          }
          return <></>
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
