import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import dayjs from 'dayjs'
import { GOALS } from '@/utils/query-keys'
import { fetchGoalTimeline } from '@/queries/goals'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/utils'

type GoalTimelineProps = {
  className?: string
  style?: React.CSSProperties
  goalId: number
}

export default function GoalTimeline({ className, style, goalId }: GoalTimelineProps) {
  const timelineQuery = useQuery([GOALS.TIMELINE, goalId], () => fetchGoalTimeline(goalId))

  return (
    <Card className={cn('h-96 shadow-sm', className)} style={style}>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>

      <CardContent className='w-full h-full'>
        <ResponsiveContainer width='100%' height='75%'>
          <BarChart data={timelineQuery?.data ?? []}>
            <Bar dataKey='kpi_value' fill={colors.indigo['500']} background>
              {timelineQuery.data?.map((_, index) => <Cell key={`cell-${index}`} radius={10} />)}
            </Bar>
            <XAxis
              dataKey='time'
              tickLine={false}
              axisLine={false}
              tickFormatter={(item) => dayjs(item).format('MMM YY')}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
