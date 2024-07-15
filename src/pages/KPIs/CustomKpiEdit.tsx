import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeftIcon } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { range } from 'lodash'
import Page from '@/components/Page/Page'
import { USER_CUSTOM_KPIS } from '@/utils/query-keys'
import { editCustomKPI, fetchUserCustomKPIDetails } from '@/queries/goals'
import { useToast } from '@/components/ui/use-toast'
import { CustomKPI } from '@/types/goals'
import { Skeleton } from '@/components/ui/skeleton'
import Form from '@/pages/KPIs/Components/Form'
import { addCustomKPISchema, AddCustomKPISchema } from '@/schema/custom_kpi'

export default function EditGoal() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { id } = useParams() as { id: string }
  const customKpiId = Number(id)
  const userCustomKpiId = Number(id)
  const QUERY_NAME = `${USER_CUSTOM_KPIS.KPIS}-${customKpiId}`

  const {
    data: user_custom_kpi,
    isLoading: isFetchingUserCustomKpi,
    isError: isFetchingUserCustomKpiError,
  } = useQuery({
    queryKey: [QUERY_NAME],
    queryFn: () => fetchUserCustomKPIDetails(userCustomKpiId),
  })

  if (isFetchingUserCustomKpiError) {
    toast({ title: 'Something went wrong.' })
  }

  const editCustomKpiMutation = useMutation({
    mutationFn: (dto: Partial<CustomKPI>) => editCustomKPI(customKpiId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_NAME] })
      toast({ title: 'Custom KPI edited successfully!' })
      // navigate('/kpis')
    },
  })

  const form = useForm<AddCustomKPISchema>({
    resolver: zodResolver(addCustomKPISchema),
  })

  useEffect(() => {
    if (!isFetchingUserCustomKpi && user_custom_kpi) {
      form.setValue('name', user_custom_kpi?.name)
      form.setValue('description', user_custom_kpi?.description)
      form.setValue('latex', user_custom_kpi?.latex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_custom_kpi, isFetchingUserCustomKpi])

  const handleCustomKpiEdit = (values: AddCustomKPISchema) => {
    editCustomKpiMutation.mutate(values)
  }

  return (
    <Page className="space-y-8">
      <div>
        <h1
          className="text-2xl font-bold">{isFetchingUserCustomKpi ? 'Loading...' : `Edit ${user_custom_kpi?.name}`}</h1>
        <div className="w-full h-[1px] bg-gray-200 my-2" />
      </div>
      <div>
        <Link className="flex w-[150px] items-center gap-2 text-muted-foreground" to="/kpis">
          <ArrowLeftIcon className="w-4 h-4" />
          Back to KPIs
        </Link>
      </div>
      {isFetchingUserCustomKpi ? (
        <div className="grid md:grid-cols-2 gap-4 items-center">
          {range(6).map((i) => (
            <Skeleton key={i} className="w-full h-[50px]" />
          ))}
          <Skeleton className="w-20 h-[50px]" />
        </div>
      ) : (
        <Form form={form} onSubmit={handleCustomKpiEdit} isLoading={editCustomKpiMutation.isPending} isEdit />
      )}
    </Page>
  )
}
