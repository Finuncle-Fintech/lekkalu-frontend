import React from 'react'
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'
import { cn } from '@/utils/utils'

type Props = {
  className?: string
  style?: React.CSSProperties
  title: string
  value: number
  color: string
  unit?: string
}

const circleSize = 200

export default function ProgressChart({ className, style, title, value, color, unit }: Props) {
  const data = [{ name: title, value, color }]

  return (
    <div
      className={cn('space-y-4 p-4 rounded-lg border flex flex-col items-center justify-center', className)}
      style={style}
    >
      <div className='text-lg font-bold'>{title}</div>

      <RadialBarChart width={circleSize} height={circleSize} innerRadius={100} outerRadius={80} data={data}>
        <PolarAngleAxis type='number' domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background dataKey='value' cornerRadius={circleSize / 2} fill={color} />
        <text
          x={circleSize / 2}
          y={circleSize / 2}
          textAnchor='middle'
          dominantBaseline='middle'
          className='text-lg font-bold'
        >
          {`${value} ${unit ?? ''}`}
        </text>
      </RadialBarChart>
    </div>
  )
}
