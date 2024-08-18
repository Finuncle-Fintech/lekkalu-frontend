import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addGoalSchema, AddGoalSchema } from '@/schema/goals'
import { GOALS } from '@/utils/query-keys'
import { editGoal } from '@/queries/goals'
import { useToast } from '@/components/ui/use-toast'
import Form from '@/pages/Goals/AddEditGoalPages/components/Form'
import { getCorrectType } from '@/utils/utils'

export default function EditGoal({ goal, goalId, setIsDialogOpen }: any) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const QUERY_NAME = `${GOALS.GOALS}`

  const editGoalMutation = useMutation({ mutationFn: (dto: Partial<AddGoalSchema>) => editGoal(goalId, dto) })

  useEffect(() => {
    if (editGoalMutation.isSuccess) {
      queryClient.invalidateQueries({ queryKey: [QUERY_NAME] })
      toast({ title: 'Goal edited successfully!' })
      setIsDialogOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editGoalMutation.isSuccess])

  const form = useForm<AddGoalSchema>({
    resolver: zodResolver(addGoalSchema),
  })

  useEffect(() => {
    if (goal) {
      form.setValue('name', getCorrectType(goal?.name))
      form.setValue('target_date', getCorrectType(goal?.target_date))
      form.setValue('target_value', getCorrectType(goal?.target_value))
      form.setValue('goal_proportionality', getCorrectType(goal?.goal_proportionality))
      form.setValue('track_kpi', getCorrectType(goal?.track_kpi))
      form.setValue('target_contribution_source', getCorrectType(goal?.target_contribution_source))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal])

  const handleGoalEdit = (values: AddGoalSchema) => {
    editGoalMutation.mutate({
      ...values,
      target_contribution_source: values.target_contribution_source ? values.target_contribution_source : null,
      track_kpi: values.track_kpi ?? 'LiabilityPercent',
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
