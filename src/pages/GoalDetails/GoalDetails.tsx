import React from 'react'
import { BadgeCheckIcon, GaugeIcon, SplitIcon, TargetIcon } from 'lucide-react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import Page from '@/components/Page/Page'
import { GOALS } from '@/utils/query-keys'
import { fetchGoalDetails, fetchGoalTimeline } from '@/queries/goals'

export default function GoalDetails() {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useQuery([GOALS.DETAILS, Number(id)], () => fetchGoalDetails(Number(id)))
  const timelineQuery = useQuery([GOALS.TIMELINE, Number(id)], () => fetchGoalTimeline(Number(id)))

  console.log(timelineQuery.data)

  if (isLoading) {
    return <div>Loading goal details...</div>
  }

  if (!data) {
    return null
  }

  return (
    <Page className='space-y-4'>
      <h1 className='text-2xl font-bold mb-8'>{data.name}</h1>

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
            <div>Reachable by</div>
          </div>
          <div className='flex-1 font-medium'>{data.reachable_by_days} days</div>
        </div>
      </div>
    </Page>
  )
}
