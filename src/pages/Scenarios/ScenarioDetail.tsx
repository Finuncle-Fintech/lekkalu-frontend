import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Page from '@/components/Page/Page'
import DetailPageHeading from '@/components/DetailPageHeading'
import { AUTH, SCENARIOS } from '@/utils/query-keys'
import { fetchScenarioById } from '@/queries/scenarios'
import { Skeleton } from '@/components/ui/skeleton'
import { useImaginaryAuth } from './context/use-imaginaryAuth'
import CreateButton from './components/CreateButton'
import { queryClient } from '@/utils/client'
import useRole from '@/hooks/useRole'
import { useAuth } from '@/hooks/use-auth'
import DottedAnimatedText from '@/components/DottedAnimatedText'

export const LoadingSkeleton = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center sm:justify-start gap-5'>
      <Skeleton className='w-40 h-10  min-h-[150px] min-w-[190px]' />
      <Skeleton className='w-40 h-10  min-h-[150px] min-w-[190px]' />
      <Skeleton className='w-40 h-10  min-h-[150px] min-w-[190px]' />
      <Skeleton className='w-40 h-10  min-h-[150px] min-w-[190px]' />
    </div>
  )
}

export default function ScenarioDefault() {
  const { id } = useParams() as { id: string }
  const { userData } = useAuth()
  const { role } = useRole({ user: userData?.username || null, id: Number(id), roleFor: 'scenario' })

  const scenarioId = Number(id)
  const { loginImaginaryUser } = useImaginaryAuth()

  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: [`${SCENARIOS.SCENARIOS}-${scenarioId}`],
    queryFn: role === 'guest' ? () => fetchScenarioById(scenarioId, true) : () => fetchScenarioById(scenarioId),
    enabled: false,
  })

  useEffect(() => {
    if (role) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role])

  useEffect(() => {
    if (isSuccess && data.id) {
      loginImaginaryUser.mutate({ username: data.imag_username, password: data.imag_password, id: data.id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data])

  useEffect(() => {
    return () => {
      queryClient.setQueryData([AUTH.CURRENT_IMAGINARY_USER], '')
    }
  }, [])

  const { data: currentImaginaryUser } = useQuery<string>({ queryKey: [AUTH.CURRENT_IMAGINARY_USER] })
  const { data: imaginaryUsers } = useQuery<any>({ queryKey: [AUTH.IMAGINARY_CLIENT] })
  const isLoggedIn = Boolean(currentImaginaryUser && imaginaryUsers[currentImaginaryUser].access)

  if (isError) {
    return (
      <Page>
        <h3>This scenario is set to private</h3>
      </Page>
    )
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (isSuccess && !data?.id) {
    return (
      <Page>
        <h2>No Scenario Found.</h2>
      </Page>
    )
  }

  return (
    <Page className='space-y-8'>
      <DetailPageHeading backUrlTitle='Back to scenarios' title={isLoading ? 'Loading...' : data?.name || ''} />

      {loginImaginaryUser.isPending && (
        <DottedAnimatedText>
          <p className='text-slate-600'>Preparing data</p>
        </DottedAnimatedText>
      )}

      {isLoggedIn ? (
        <div>
          <div className='flex justify-between'>
            <CreateButton username={data?.imag_username || ''} role={role} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Page>
  )
}
