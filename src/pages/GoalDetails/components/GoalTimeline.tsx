import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import dayjs from 'dayjs'
import { DateRange } from 'react-day-picker'
import { GOALS } from '@/utils/query-keys'
import { fetchGoalTimeline } from '@/queries/goals'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/utils'
import DatePickerWithRange from '@/components/DatePickerWithRange'

type GoalTimelineProps = {
  className?: string
  style?: React.CSSProperties
  goalId: number
}

export default function GoalTimeline({ className, style, goalId }: GoalTimelineProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: dayjs().add(1, 'month').toDate(),
  })

  const timelineQuery = useQuery([GOALS.TIMELINE, goalId], () => fetchGoalTimeline(goalId))

  const dataToRender = useMemo(() => {
    if (!timelineQuery.data) {
      return []
    }

    return timelineQuery.data.filter(
      (item) => dayjs(item.time).isAfter(dateRange?.from) && dayjs(item.time).isBefore(dateRange?.to),
    )
  }, [dateRange?.from, dateRange?.to, timelineQuery.data])

  return (
    <Card className={cn('h-96 shadow-sm', className)} style={style}>
      <CardHeader className='flex justify-between flex-row'>
        <CardTitle>Timeline</CardTitle>

        <DatePickerWithRange
          dateRange={dateRange}
          onChange={(range) => {
            setDateRange(range)
          }}
        />
      </CardHeader>

      <CardContent className='w-full h-full'>
        <ResponsiveContainer width='100%' height='75%'>
          <BarChart data={dataToRender}>
            <Bar dataKey='kpi_value' fill={colors.indigo['500']} background>
              {dataToRender.map((_, index) => (
                <Cell key={`cell-${index}`} radius={10} />
              ))}
            </Bar>
            <XAxis
              dataKey='time'
              tickLine={false}
              axisLine={false}
              tickFormatter={(item) => dayjs(item).format('MMM YY')}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip labelFormatter={(date) => dayjs(date).format('DD-MMM-YYYY')} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
