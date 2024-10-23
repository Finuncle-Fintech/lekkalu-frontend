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
import { fetchGoalsWithGraphql } from '@/queries/goals'
import { Skeleton } from '@/components/ui/skeleton'
import { GoalStatus } from '@/types/goals'

const TODAY = new Date()

const INITIAL_GOAL_STATUS: GoalStatus = {
  completed: 0,
  total: 0,
  offTrack: 0,
  onTrack: 0,
}

export default function Goals() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [GOALS.GOALS],
    queryFn: fetchGoalsWithGraphql,
    select: (data) => {
      const _data = data?.financialGoals
      return _data
    },
  })
  const [goalStatus, setGoalStatus] = useState<GoalStatus>(INITIAL_GOAL_STATUS)

  useEffect(() => {
    if (!isLoading) {
      const goalStatus = { ...INITIAL_GOAL_STATUS, total: data?.length || 0 }
      data?.forEach(({ targetDate, met }) => {
        if (met) {
          goalStatus.completed++
        } else if (dayjs(targetDate).isAfter(TODAY)) {
          goalStatus.onTrack++
        } else if (dayjs(targetDate).isBefore(TODAY)) {
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
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
          {data?.length ? (
            data?.map((goal) => (
              <Goal
                key={goal.id}
                id={goal.id}
                goalTitle={goal.name}
                category={goal.trackKpi}
                createdAt={dayjs(goal.createdAt).toISOString()}
                color={goal?.reachableByDays > 0 ? colors.violet['500'] : colors.red['500']}
                reachable_by_days={goal?.reachableByDays}
              />
            ))
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
