import React, { useCallback, useEffect, useState } from 'react'
import colors from 'tailwindcss/colors'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { range } from 'lodash'
import Page from '@/components/Page/Page'
import ProgressChart from '@/components/ProgressChart/ProgressChart'
import { buttonVariants } from '@/components/ui/button'
import Goal from './components/Goal'
import { GOALS } from '@/utils/query-keys'
import { fetchGoals } from '@/queries/goals'
import { Skeleton } from '@/components/ui/skeleton'
import { GoalStatus } from '@/types/goals'
import DumbbellChart, { DumbbellChartProps } from '@/pages/Goals/DumbbellChart'

const TODAY = new Date()

const INITIAL_GOAL_STATUS: GoalStatus = {
  completed: 0,
  total: 0,
  offTrack: 0,
  onTrack: 0,
}

export default function Goals() {
  const { data, isLoading, isFetching } = useQuery({ queryKey: [GOALS.GOALS], queryFn: fetchGoals })
  const [goalStatus, setGoalStatus] = useState<GoalStatus>(INITIAL_GOAL_STATUS)

  const goals_data: DumbbellChartProps = {
    Goals: [
      {
        name: 'Goal-1',
        Scenarios: [
          {
            name: 'Scenario-1',
            start_date: new Date('2023-01-01'),
            finish_date: new Date('2023-03-01'),
          },
          {
            name: 'Scenario-2',
            start_date: new Date('2023-02-01'),
            finish_date: new Date('2023-04-01'),
          },
          {
            name: 'Scnario-3',
            start_date: new Date('2023-03-01'),
            finish_date: new Date('2023-05-01'),
          },
        ],
      },
    ],
  }

  useEffect(() => {
    if (!isLoading) {
      const goalStatus = { ...INITIAL_GOAL_STATUS, total: data?.length || 0 }
      data?.forEach(({ target_date, met }) => {
        if (met) {
          goalStatus.completed++
        } else if (dayjs(target_date).isAfter(TODAY)) {
          goalStatus.onTrack++
        } else if (dayjs(target_date).isBefore(TODAY)) {
          goalStatus.offTrack++
        }
      })
      setGoalStatus(goalStatus)
    }
  }, [data, isLoading])

  const getPercentage = useCallback((value: number, total: number) => {
    return +((value / total) * 100).toFixed(2) || 0
  }, [])

  if (isLoading) {
    return (
      <Page className='space-y-4'>
        <div className='flex justify-end'>
          <Skeleton className='h-10 w-28' />
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <Skeleton className='h-60 w-full' />
          <Skeleton className='h-60 w-full' />
          <Skeleton className='h-60 w-full' />
        </div>

        <Skeleton className='h-10 w-1/2' />
      </Page>
    )
  }

  return (
    <Page className='space-y-4'>
      <div className='flex justify-end'>
        <Link to='/goals/new' className={buttonVariants({ variant: 'default' })}>
          <PlusIcon className='w-4 h-4 mr-2' />
          <span>Add Goal</span>
        </Link>
      </div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <ProgressChart
          title='On Track'
          color={colors.indigo['500']}
          value={getPercentage(goalStatus?.onTrack, goalStatus?.total)}
          unit='%'
        />
        <ProgressChart
          title='Off Track'
          color={colors.red['500']}
          value={getPercentage(goalStatus?.offTrack, goalStatus?.total)}
          unit='%'
        />
        <ProgressChart
          title='Completed'
          color={colors.green['500']}
          value={getPercentage(goalStatus?.completed, goalStatus?.total)}
          unit='%'
        />
      </div>

      <div className='text-2xl font-bold truncate block py-4'>Your ongoing financial goals</div>

      {isFetching ? (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
          {range(8).map((i) => (
            <Skeleton key={i} className='h-64 w-full' />
          ))}
        </div>
      ) : (
        <div>
          {data?.length ? (
            <>
              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
                {data?.map((goal) => (
                  <Goal
                    key={goal.id}
                    id={goal.id}
                    goalTitle={goal.name}
                    category={goal.track_kpi}
                    createdAt={dayjs(goal.created_at).toISOString()}
                    color={goal?.reachable_by_days > 0 ? colors.violet['500'] : colors.red['500']}
                    reachable_by_days={goal?.reachable_by_days}
                  />
                ))}
              </div>
              <DumbbellChart {...goals_data} />
            </>
          ) : (
            <div>
              <p>You Have no financial goals.</p>
              <Link to='/goals/new' className='block underline mt-2'>
                Click here to add.
              </Link>{' '}
            </div>
          )}
        </div>
      )}
    </Page>
  )
}
