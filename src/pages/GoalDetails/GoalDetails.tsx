import React, { useMemo } from 'react'
import { BadgeCheckIcon, GaugeIcon, SplitIcon, TargetIcon } from 'lucide-react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import Page from '@/components/Page/Page'
import { BALANCE_SHEET, GOALS } from '@/utils/query-keys'
import { fetchGoalDetails } from '@/queries/goals'
import GoalTimeline from './components/GoalTimeline'
import BackButton from './components/BackButton'
import { fetchIncomeExpenses } from '@/queries/income-statement'
import { convertDays, goalReachedString } from './utils/dateTime'

export default function GoalDetails() {
  const { id } = useParams() as { id: string }

  const { data: incomeExpenses } = useQuery([BALANCE_SHEET.INCOME_EXPENSES], fetchIncomeExpenses)

  const { isLoading, data } = useQuery([GOALS.DETAILS, Number(id)], () => fetchGoalDetails(Number(id)), {
    select: (data) => {
      return {
        ...data,
        target_contribution_source: incomeExpenses?.find((each) => each?.id === data?.target_contribution_source)?.name,
      }
    },
  })

  const reachableDays = useMemo(
    () => goalReachedString(convertDays(data?.reachable_by_days || 0)),
    [data?.reachable_by_days],
  )

  if (isLoading) {
    return (
      <Page>
        <BackButton />
        <div>
          <p>Loading goal details...</p>
        </div>
      </Page>
    )
  }

  if (!data) {
    return (
      <Page>
        <BackButton />
        <p>{`No goal found with id ${id}`}</p>
      </Page>
    )
  }

  return (
    <Page className='space-y-4'>
      <h1 className='text-2xl font-bold mb-8'>{data.name}</h1>
      <BackButton />
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='flex'>
          <div className='flex gap-2 flex-1 items-center'>
            <TargetIcon className='w-4 h-4' />
            <div>Target</div>
          </div>
          <div className='flex-1 font-medium'>{data.target_value}</div>
        </div>

        <div className='flex'>
          <div className='flex gap-2 flex-1 items-center'>
            <GaugeIcon className='w-4 h-4' />
            <div>KPI</div>
          </div>
          <div className='flex-1 font-medium'>{data.track_kpi}</div>
        </div>

        <div className='flex'>
          <div className='flex gap-2 flex-1 items-center'>
            <SplitIcon className='w-4 h-4' />
            <div>Source</div>
          </div>
          <div className='flex-1 font-medium'>{data.target_contribution_source}</div>
        </div>

        <div className='flex'>
          <div className='flex gap-2 flex-1 items-center'>
            <BadgeCheckIcon className='w-4 h-4' />
            <div>
              <p>{data?.reachable_by_days < 0 ? 'Reached' : 'Reachable by'}</p>
            </div>
          </div>
          <div className='flex-1 font-medium'>
            <p>{reachableDays}</p>
          </div>
        </div>
      </div>

      <GoalTimeline goalId={Number(id)} target={data.target_value} />
    </Page>
  )
}
