import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Page from '@/components/Page/Page'
import DetailPageHeading from '@/components/DetailPageHeading'
import { SCENARIOS } from '@/utils/query-keys'
import { fetchScenarioById } from '@/queries/scenarios'
import { Skeleton } from '@/components/ui/skeleton'
import { useImaginaryAuth } from './context/use-imaginaryAuth'
import CreateButton from './components/CreateButton'

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
  const { loginImaginaryUser, setImaginaryUsers, imaginaryUsers } = useImaginaryAuth()
  const { data, isLoading } = useQuery([`${SCENARIOS.SCENARIOS}-${scenarioId}`], () => fetchScenarioById(scenarioId), {
    onSuccess(data) {
      loginImaginaryUser.mutate(
        { username: data.imag_username, password: data.imag_password },
        {
          onSuccess(tokens) {
            setImaginaryUsers({ ...imaginaryUsers, [data.imag_username]: tokens })
          },
        },
      )
    },
  })

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
            <CreateButton username={data?.imag_username || ''} />
          </div>
        </div>
      )}
    </Page>
  )
}
