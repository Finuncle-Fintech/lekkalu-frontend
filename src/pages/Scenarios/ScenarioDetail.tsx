import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import Page from '@/components/Page/Page'
import DetailPageHeading from '@/components/DetailPageHeading'
import { Button } from '@/components/ui/button'
import { SCENARIOS } from '@/utils/query-keys'
import { fetchScenarioById } from '@/queries/scenarios'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingSkeleton = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <Skeleton className='w-52 h-10' />
        <Skeleton className='w-40 h-10' />
      </div>
      <div className='mt-10'>
        <Skeleton className='w-full h-10' />
      </div>
    </div>
  )
}

export default function ScenarioDefault() {
  const { id } = useParams() as { id: string }
  const scenarioId = Number(id)
  const { data, isLoading } = useQuery([`${SCENARIOS.SCENARIOS}-${scenarioId}`], () => fetchScenarioById(scenarioId))
  return (
    <Page className='space-y-8'>
      <DetailPageHeading
        backUrl='/scenarios'
        backUrlTitle='Back to scenarios'
        title={isLoading ? 'Loading...' : data?.name || ''}
      />

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <div className='flex justify-between'>
            <h2 className='text-xl self-center'>Assets & Liabilities</h2>
            <Button variant={'default'}>
              <PlusIcon className='mr-2' size={18} /> Create Assets
            </Button>
          </div>
          <div>
            <p>Table here</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <div className='flex justify-between'>
            <h2 className='text-xl self-center'>Income Expenses</h2>
            <Button variant={'default'}>
              <PlusIcon className='mr-2' size={18} />
              Create Income Expenses
            </Button>
          </div>
          <div>
            <p>Table here</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <div className='flex justify-between'>
            <h2 className='text-xl self-center'>Lending Transactions</h2>
            <Button variant={'default'}>
              <PlusIcon className='mr-2' size={18} /> Create Lending Transcations
            </Button>
          </div>
          <div>
            <p>Table here</p>
          </div>
        </div>
      )}
    </Page>
  )
}
