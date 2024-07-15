import { ArrowLeftIcon, TargetIcon } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Page from '@/components/Page/Page'
import { fetchCustomKPIDetails } from '@/queries/goals'
import { KPIS } from '@/utils/query-keys'

export default function CustomKpiDetails() {
  const { id } = useParams() as { id: string }

  const { isLoading, data } = useQuery({
    queryKey: [KPIS.DETAILS, Number(id)],
    queryFn: () => fetchCustomKPIDetails(Number(id)),
  })

  if (isLoading) {
    return (
      <Page>
        <div>
          <Link className="flex w-[150px] items-center gap-2 text-muted-foreground" to="/goals">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Goals
          </Link>
        </div>
        <div>
          <p>Loading goal details...</p>
        </div>
      </Page>
    )
  }

  if (!data) {
    return (
      <Page>
        <Link className="flex w-[150px] items-center gap-2 text-muted-foreground" to="/goals">
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Goals
        </Link>
        <p>{`No goal found with id ${id}`}</p>
      </Page>
    )
  }

  return (
    <Page className="space-y-4">
      <h1 className="text-2xl font-bold mb-8">{data.name}</h1>
      <Link className="flex w-[150px] items-center gap-2 text-muted-foreground" to="/goals">
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Goals
      </Link>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex">
          <div className="flex gap-2 flex-1 items-center">
            <TargetIcon className="w-4 h-4" />
            <div>Target</div>
          </div>
          <div className="flex-1 font-medium">{(data.description)}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex">
          <div className="flex gap-2 flex-1 items-center">
            <TargetIcon className="w-4 h-4" />
            <div>Target</div>
          </div>
          <div className="flex-1 font-medium">{(data.latex)}</div>
        </div>
      </div>
    </Page>
  )
}
