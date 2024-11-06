import React, { useMemo } from 'react'
import { BadgeCheckIcon, GaugeIcon, SplitIcon, TargetIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Page from '@/components/Page/Page'
import { BALANCE_SHEET, GOALS, USER_CUSTOM_KPIS } from '@/utils/query-keys'
import { fetchUserCustomKPIs, fetchGoalsDetailsWithGraphql } from '@/queries/goals'
import GoalTimeline from './components/GoalTimeline'
import BackButton from './components/BackButton'
import { fetchIncomeExpenses } from '@/queries/income-statement'
import { convertDays, goalReachedString } from './utils/dateTime'
import { formatIndianMoneyNotation } from '@/utils/format-money'

export default function GoalDetails() {
  const { id } = useParams() as { id: string }

  const { data: incomeExpenses } = useQuery({ queryKey: [BALANCE_SHEET.INCOME_EXPENSES], queryFn: fetchIncomeExpenses })
  const { data: custom_kpis } = useQuery({ queryKey: [USER_CUSTOM_KPIS.KPIS], queryFn: fetchUserCustomKPIs })

  const { isLoading, data } = useQuery({
    queryKey: [GOALS.DETAILS, Number(id)],
    queryFn: () => fetchGoalsDetailsWithGraphql(Number(id)),
    select: (data) => {
      return {
        ...data.financialGoals,
        targetContributionSource: incomeExpenses?.find(
          (each) => each?.id === data?.financialGoals?.targetContributionSource,
        )?.name,
        customKpi: custom_kpis?.find((each) => each?.id === data?.financialGoals?.customKpi)?.name,
      }
    },
  })

  console.log('data', data)

  const reachableDays = useMemo(
    () => goalReachedString(convertDays(data?.reachableByDays || 0)),
    [data?.reachableByDays],
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
          <div className='flex-1 font-medium'>{formatIndianMoneyNotation(data.targetValue)}</div>
        </div>

        <div className='flex'>
          <div className='flex gap-2 flex-1 items-center'>
            <GaugeIcon className='w-4 h-4' />
            <div>KPI</div>
          </div>
          <div className='flex-1 font-medium'>{data.trackKpi}</div>
        </div>

        <div className='flex'>
          <div className='flex gap-2 flex-1 items-center'>
            <SplitIcon className='w-4 h-4' />
            <div>Source</div>
          </div>
          <div className='flex-1 font-medium'>{data.targetContributionSource}</div>
        </div>

        <div className='flex'>
          <div className='flex gap-2 flex-1 items-center'>
            <BadgeCheckIcon className='w-4 h-4' />
            <div>
              <p>{data?.reachableByDays < 0 ? 'Reached' : 'Reachable by'}</p>
            </div>
          </div>
          <div className='flex-1 font-medium'>
            <p>{reachableDays}</p>
          </div>
        </div>
      </div>

      <GoalTimeline goalId={Number(id)} target={data.targetValue} />
    </Page>
  )
}
