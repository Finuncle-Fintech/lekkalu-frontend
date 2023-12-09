import React from 'react'
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

export default function Goals() {
  const goalsQuery = useQuery([GOALS.GOALS], fetchGoals)

  if (goalsQuery.isLoading) {
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

        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
          {range(8).map((i) => (
            <Skeleton key={i} className='h-64 w-full' />
          ))}
        </div>
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
        <ProgressChart title='On Track' color={colors.green['500']} value={Math.floor(Math.random() * 100)} />
        <ProgressChart title='Off Track' color={colors.red['500']} value={Math.floor(Math.random() * 100)} />
        <ProgressChart title='Completed' color={colors.indigo['500']} value={Math.floor(Math.random() * 100)} />
      </div>

      <div className='text-2xl font-bold truncate block py-4'>Your ongoing financial goals</div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {goalsQuery.data?.map((goal) => (
          <Goal
            key={goal.id}
            id={goal.id}
            goalTitle={goal.name}
            category={goal.track_kpi}
            progressPercentage={Math.floor(Math.random() * 100)}
            createdAt={dayjs(goal.created_at).toISOString()}
            color={colors.violet['500']}
          />
        ))}
      </div>
    </Page>
  )
}
