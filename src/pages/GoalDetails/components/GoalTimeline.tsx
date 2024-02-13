import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import dayjs from 'dayjs'
import { DateRange } from 'react-day-picker'
import { GOALS } from '@/utils/query-keys'
import { fetchGoalTimeline } from '@/queries/goals'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/utils'
import DatePickerWithRange from '@/components/DatePickerWithRange'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getDataByMonth, getDataByWeek, getDataByYear } from '../utils/dateTime'
import { Timeline } from '@/types/goals'

type GoalTimelineProps = {
  className?: string
  style?: React.CSSProperties
  goalId: number
}

const dropdownOptions = [
  {
    name: 'Day',
    value: 'day',
  },
  {
    name: 'Week',
    value: 'week',
  },
  {
    name: 'Month',
    value: 'month',
  },
  {
    name: 'Year',
    value: 'year',
  },
]

type ChartView = 'day' | 'week' | 'month' | 'year'

export default function GoalTimeline({ className, style, goalId }: GoalTimelineProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: dayjs().add(1, 'month').toDate(),
  })

  const [viewAs, setViewAs] = useState<ChartView>('day')

  const timelineQuery = useQuery([GOALS.TIMELINE, goalId], () => fetchGoalTimeline(goalId))

  const dataToRender = useMemo(() => {
    if (!timelineQuery.data) {
      return []
    }

    const validDates = timelineQuery.data.filter(
      (item) => dayjs(item.time).isAfter(dateRange?.from) && dayjs(item.time).isBefore(dateRange?.to),
    )

    return aggregatedDates(validDates)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange?.from, dateRange?.to, timelineQuery.data, viewAs])

  function aggregatedDates(dates: Timeline[]) {
    switch (viewAs) {
      case 'day':
        return dates
      case 'month':
        return getDataByMonth(dates)
      case 'week':
        return getDataByWeek(dates)
      case 'year':
        return getDataByYear(dates)
      default:
        return dates
    }
  }

  return (
    <Card className={cn('h-[600px] sm:h-96 pb-20 sm:pb-0 shadow-sm', className)} style={style}>
      <CardHeader className='flex flex-start flex-col sm:flex-row'>
        <CardTitle>Timeline</CardTitle>
        <div className='flex flex-col sm:flex-row sm:ml-auto gap-5 pt-5 sm:pt-0'>
          <DatePickerWithRange
            dateRange={dateRange}
            onChange={(range) => {
              setDateRange(range)
            }}
          />

          <Select onValueChange={(value: ChartView) => setViewAs(value)} value={viewAs}>
            <SelectTrigger className='text-sm focus:ring-transparent w-full md:w-[100px]' placeholder='View as'>
              <span className='flex items-center'>
                <SelectValue placeholder='Select' />
              </span>
            </SelectTrigger>
            <SelectContent className='max-h-60'>
              {dropdownOptions.map(({ name, value }) => (
                <SelectItem value={value} key={`${name}_${value}`} className='text-sm'>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className='w-full h-full'>
        <ResponsiveContainer width='100%' height='75%'>
          <LineChart data={dataToRender} width={730} height={250} margin={{ top: 5, right: 0, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray='3 1' />
            <XAxis dataKey='time' tickFormatter={(date) => dayjs(date).format('MMM YYYY')} />
            <YAxis dataKey={'kpi_value'} />
            <Tooltip labelFormatter={(date) => dayjs(date).format('DD MMM YYYY')} />
            <Line dataKey={'kpi_value'} name='Kpi Value' />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
