import React from 'react'
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { cn } from '@/utils/utils'

dayjs.extend(relativeTime)

type Props = {
  className?: string
  style?: React.CSSProperties
  goalTitle: string
  progressPercentage: number
  createdAt: string
  color: string
}

const circleSize = 100

export default function Goal({ className, style, goalTitle, progressPercentage, createdAt, color }: Props) {
  const data = [{ name: goalTitle, progressPercentage, color }]

  return (
    <div
      className={cn('flex items-center justify-center gap-4 flex-col border-t-4 rounded-lg p-4 shadow-md', className)}
      style={{ ...style, borderColor: color }}
    >
      <RadialBarChart width={circleSize} height={circleSize} innerRadius={50} outerRadius={35} data={data}>
        <PolarAngleAxis type='number' domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background dataKey='progressPercentage' cornerRadius={circleSize / 2} fill={color} />
        <text
          x={circleSize / 2}
          y={circleSize / 2}
          textAnchor='middle'
          dominantBaseline='middle'
          className='text-lg font-bold'
        >
          {`${progressPercentage} %`}
        </text>
      </RadialBarChart>

      <div className='text-xl font-bold'>{goalTitle}</div>

      <div className='flex justify-end w-full'>
        <div className='text-muted-foreground'>{dayjs(createdAt).fromNow()}</div>
      </div>
    </div>
  )
}
