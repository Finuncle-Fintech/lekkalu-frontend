import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import colors from 'tailwindcss/colors'
import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import { GOALS } from '@/utils/query-keys'
import { fetchGoalTimeline } from '@/queries/goals'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/utils'
import { getDataByMonth, getDataByWeek, getDataByYear } from '../utils/dateTime'
import { Timeline } from '@/types/goals'
import { Button } from '@/components/ui/button'
import { formatIndianMoneyNotation } from '@/utils/format-money'
import { useUserPreferences } from '@/hooks/use-user-preferences'

type GoalTimelineProps = {
  className?: string
  style?: React.CSSProperties
  goalId: number
  target: number
}

const ViewAsOptions = [
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

const roundBorder = (index: number) => {
  if (index === 0) {
    return 'rounded-l-lg border-l'
  } else if (index === 3) {
    return 'rounded-r-lg border-r'
  } else {
    return ''
  }
}

export default function GoalTimeline({ className, style, goalId, target }: GoalTimelineProps) {
  const [viewAs, setViewAs] = useState<ChartView>('day')
  const { preferences } = useUserPreferences()
  const timelineQuery = useQuery([GOALS.TIMELINE, goalId], () => fetchGoalTimeline(goalId), {
    select: (data) => {
      return data.map((each) => ({ ...each, kpi_value: Number(each.kpi_value.toFixed(2)), target }))
    },
  })

  const aggregatedDates = useCallback(
    (dates: Timeline[]) => {
      switch (viewAs) {
        case 'day':
          return dates
        case 'month':
          return getDataByMonth(dates, target)
        case 'week':
          return getDataByWeek(dates, target)
        case 'year':
          return getDataByYear(dates, target)
        default:
          return dates
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [viewAs],
  )

  const dataToRender = useMemo(() => {
    if (!timelineQuery.data) {
      return []
    }
    const validDates = timelineQuery.data

    return aggregatedDates(validDates)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineQuery.data, viewAs])
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 400,
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        autoScaleYaxis: true,
      },
      foreColor: '#000',
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
    colors: [colors.blue['500'], colors.orange['500']],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
      // min: dataToRender[0].time, // Set min to quarter of the data
      // max: dataToRender[dataToRender.length - 1].time,
      categories: dataToRender.map((item) => item.time),
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm',
        },
        formatter(value) {
          return dayjs(value).format('MMM YYYY')
        },
        hideOverlappingLabels: true,
        rotate: 0,
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    yaxis: {
      labels: {
        formatter(val) {
          return `${preferences.currencyUnit} ${formatIndianMoneyNotation(val, 1)}`
        },
      },
    },
  }

  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: 'KPI Value',
      data: dataToRender.map((item) => item.kpi_value),
    },
    {
      name: 'Target',
      data: dataToRender.map((item: any) => item.target),
    },
  ]

  return (
    <Card className={cn('h-[480px] sm:h-full pb-20 sm:pb-0 shadow-sm', className)} style={style}>
      <CardHeader className='flex flex-start flex-col sm:flex-row'>
        <CardTitle>Timeline</CardTitle>
        <div className='flex flex-row sm:ml-auto gap-5x pt-5 sm:pt-0 flex-wrap sm:flex-nowrap'>
          {ViewAsOptions.map((each, index) => (
            <div key={each?.value}>
              <Button
                className={`m-0 border-y rounded-none ${roundBorder(index)}`}
                variant={each?.value === viewAs ? 'default' : 'ghost'}
                onClick={() => setViewAs(each?.value as ChartView)}
              >
                {each?.name}
              </Button>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className='w-full h-full'>
        <Chart options={chartOptions} series={chartSeries} type='line' height={320} />
      </CardContent>
      {/* <CardContent className='w-full h-full'>
        <ResponsiveContainer width='100%' height='75%'>
          <LineChart data={dataToRender} width={730} height={250} margin={{ top: 5, right: 0, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray='3 1' />
            <XAxis dataKey='time' tickFormatter={(date) => dayjs(date).format('MMM YYYY')} />
            <YAxis dataKey={'kpi_value'} />
            <Tooltip labelFormatter={(date) => dayjs(date).format('DD MMM YYYY')} />
            <Line type='monotone' dataKey={'kpi_value'} name='Kpi Value' strokeWidth={1} dot={false} />
            <Line type='monotone' dataKey={'target'} name='Target' stroke='red' strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent> */}
    </Card>
  )
}
