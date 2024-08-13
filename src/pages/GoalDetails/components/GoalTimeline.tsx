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

type PlottedDataType = {
  [key in ChartView]: Timeline[]
}

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
  const [plottedData, setPlottedData] = useState<PlottedDataType>({
    day: [],
    week: [],
    month: [],
    year: [],
  })
  const timelineQuery = useQuery({
    queryKey: [GOALS.TIMELINE, goalId],
    queryFn: () => fetchGoalTimeline(goalId),
    select: (data) => {
      return data.map((each) => ({ ...each, kpi_value: Number(each.kpi_value.toFixed(2)), target }))
    },
  })

  const aggregatedDates = useCallback(
    (dates: Timeline[]) => {
      if (plottedData[viewAs].length) {
        return plottedData[viewAs]
      }
      switch (viewAs) {
        case 'day':
          setPlottedData({ ...plottedData, day: dates })
          return dates
        case 'month':
          setPlottedData({ ...plottedData, month: getDataByMonth(dates, target) })
          return getDataByMonth(dates, target)
        case 'week':
          setPlottedData({ ...plottedData, week: getDataByWeek(dates, target) })
          return getDataByWeek(dates, target)
        case 'year':
          setPlottedData({ ...plottedData, year: getDataByYear(dates, target) })
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

  const chartOptions: ApexCharts.ApexOptions = useMemo(
    () => ({
      chart: {
        height: 400,
        width: '100%',
        type: 'line',
        animations: {
          enabled: false,
        },
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
        type: 'datetime',
        // min: dataToRender[0].time, // Set min to quarter of the data
        // max: dataToRender[dataToRender.length - 1].time,
        categories: dataToRender.map((item) => item.time),
        labels: {
          datetimeFormatter: {
            year: 'YYYY',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
          },
          formatter(value) {
            return dayjs(value).format('DD-MM-YYYY')
          },
          hideOverlappingLabels: true,
          rotate: 0,
        },
      },
      tooltip: {
        x: {
          format: 'd MMM YYYY',
        },
      },
      yaxis: {
        labels: {
          formatter(val) {
            return `${preferences.currencyUnit} ${formatIndianMoneyNotation(val, 1)}`
          },
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataToRender],
  )

  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries = useMemo(
    () => [
      {
        name: 'KPI Value',
        data: dataToRender.map((item) => item?.kpi_value),
      },
      {
        name: 'Target',
        data: dataToRender.map((item: any) => item.target),
      },
    ],
    [dataToRender],
  )

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
    </Card>
  )
}
