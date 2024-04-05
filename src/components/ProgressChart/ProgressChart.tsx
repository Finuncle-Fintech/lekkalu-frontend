import React from 'react'
import Chart from 'react-apexcharts'
import { cn } from '@/utils/utils'

type Props = {
  className?: string
  style?: React.CSSProperties
  title: string
  value: number
  color: string
  unit?: string
}

const circleSize = 260

export default function ProgressChart({ className, style, title, value, color, unit }: Props) {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: circleSize,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            formatter: function (val) {
              return val.toString() + unit
            },
            color: '#111',
            fontSize: '18px',
            show: true,
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            offsetY: 10,
          },
        },
      },
    },
    fill: {
      type: 'solid',
      colors: [color],
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      lineCap: 'round',
    },
  }
  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries = [value]

  return (
    <div
      className={cn('space-y-4 p-4 rounded-lg border flex flex-col items-center justify-center', className)}
      style={style}
    >
      <div className='text-lg font-bold'>{title}</div>
      <Chart options={chartOptions} series={chartSeries} type='radialBar' height={circleSize} />
    </div>
  )
}
