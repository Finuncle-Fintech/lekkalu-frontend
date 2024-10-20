import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { addGoalSchema, AddGoalSchema } from '@/schema/goals'
import { GOALS } from '@/utils/query-keys'
import { editGoal } from '@/queries/goals'
import { useToast } from '@/components/ui/use-toast'
import Form from '@/pages/Goals/AddEditGoalPages/components/Form'
import { getCorrectType, getSearchParamFromLocationSearch } from '@/utils/utils'

export default function EditGoal({ goal, goalId, setIsDialogOpen }: any) {
  const { toast } = useToast()
  const location = useLocation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const QUERY_NAME = `${GOALS.GOALS}`

  const editGoalMutation = useMutation({ mutationFn: (dto: Partial<AddGoalSchema>) => editGoal(goalId, dto) })

  useEffect(() => {
    if (editGoalMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: [QUERY_NAME] })
      toast({ title: 'Goal edited successfully!' })
      setIsDialogOpen(false)
      navigate('/goals', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editGoalMutation.isSuccess])

  const form = useForm<AddGoalSchema>({
    resolver: zodResolver(addGoalSchema),
  })

  useEffect(() => {
    if (goal) {
      form.setValue('name', getCorrectType(goal?.name))
      form.setValue('target_date', goal?.target_date)
      form.setValue('target_value', getCorrectType(goal?.target_value))
      form.setValue('goal_proportionality', getCorrectType(goal?.goal_proportionality))
      !goal?.custom_kpi_content_type && form.setValue('track_kpi', goal?.track_kpi)
      form.setValue('target_contribution_source', getCorrectType(goal?.target_contribution_source))
      form.setValue('custom_kpi', goal?.custom_kpi_object_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal])

  useEffect(() => {
    const values: any = getSearchParamFromLocationSearch(location.search)
    if (Object.keys(values).length) {
      Object.keys(values).forEach((each: any) => {
        if (each === 'target_date') {
          form.setValue(each, values[each])
        } else {
          form.setValue(each, getCorrectType(values[each]))
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  const handleGoalEdit = (values: AddGoalSchema) => {
    const _values: any = { ...values }
    if (values.custom_kpi) {
      _values.custom_kpi_object_id = values.custom_kpi
      _values.custom_kpi_content_type = 'UserCustomKpi'
    }
    delete _values.custom_kpi
    if (!values.target_contribution_source) {
      delete _values.target_contribution_source
    }
    editGoalMutation.mutate({
      ..._values,
    })
  }

  return (
    <Form
      form={form}
      onSubmit={handleGoalEdit}
      isLoading={editGoalMutation.isPending}
      isEdit
      isError={editGoalMutation.isError}
      goalId={goalId}
    />
  )
}
