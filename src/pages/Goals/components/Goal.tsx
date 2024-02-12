import React from 'react'
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { round } from 'lodash'

import { cn } from '@/utils/utils'
import { GOALS } from '@/utils/query-keys'
import { getGoalProgress } from '@/queries/goals'
import GoalOptions from './Options'

dayjs.extend(relativeTime)

type Props = {
  className?: string
  style?: React.CSSProperties
  id: number
  goalTitle: string
  category: string
  createdAt: string
  color: string
}

const circleSize = 150

export default function Goal({ className, style, id, goalTitle, category, createdAt, color }: Props) {
  const { data: progressQuery } = useQuery([`${GOALS.PROGRESS}_${id}`], () => getGoalProgress(id))

  const data = [{ name: goalTitle, progressPercentage: round(progressQuery?.progress_percent ?? 0, 2), color }]

  return (
    <div
      className={cn('flex flex-col border-t-4 rounded-lg p-4 shadow-md hover:cursor-pointer', className)}
      style={{ ...style, borderColor: color }}
    >
      <GoalOptions id={id} />
      <Link to={`/goals/${id}`} className='flex items-center justify-center gap-4 flex-col'>
        <RadialBarChart width={circleSize} height={circleSize} innerRadius={40} outerRadius={50} data={data}>
          <PolarAngleAxis type='number' domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background dataKey='progressPercentage' cornerRadius={circleSize / 2} fill={color} />
          <text
            x={circleSize / 2}
            y={circleSize / 2}
            textAnchor='middle'
            dominantBaseline='middle'
            className='text-sm font-bold'
          >
            {`${round(progressQuery?.progress_percent ?? 0, 2)} %`}
          </text>
        </RadialBarChart>

        <div className='text-xl font-bold text-center'>{goalTitle}</div>
        <div className='text-sm text-muted-foreground text-center'>{category}</div>
        <div className='text-muted-foreground text-xs text-center'>{dayjs(createdAt).fromNow()}</div>
      </Link>
    </div>
  )
}
