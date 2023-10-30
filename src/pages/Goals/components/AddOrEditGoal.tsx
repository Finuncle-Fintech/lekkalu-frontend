import React, { cloneElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Goal } from '@/types/goals'
import { AddGoalSchema, addGoalSchema } from '@/schema/goals'
import { GOAL_INPUTS } from '@/utils/goals'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { addGoal, editGoal } from '@/queries/goals'
import { GOALS } from '@/utils/query-keys'
import { useToast } from '@/components/ui/use-toast'
import { useAuthContext } from '@/hooks/use-auth'

type Props = {
  trigger: React.ReactElement
  goal?: Goal
}

export default function AddOrEditGoal({ trigger, goal }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isEdit = Boolean(goal)
  const qc = useQueryClient()
  const { toast } = useToast()
  const { userData } = useAuthContext()

  const form = useForm<AddGoalSchema>({
    resolver: zodResolver(addGoalSchema),
    defaultValues: {
      ...goal,
      //  @ts-expect-error
      started: goal?.started ? dayjs(goal.started).toDate() : undefined,
      finished: goal?.finished ? dayjs(goal.started).toDate() : undefined,
      planned_start: goal?.planned_start ? dayjs(goal.planned_start).toDate() : undefined,
      planned_finish: goal?.planned_finish ? dayjs(goal?.planned_finish).toDate() : undefined,
      user: userData?.id,
    },
  })

  const addGoalMutation = useMutation(addGoal, {
    onSuccess: () => {
      qc.invalidateQueries([GOALS.GOALS])
      toast({ title: 'Goal added successfully!' })
      setIsDialogOpen(false)
    },
  })

  const editGoalMutation = useMutation((dto: AddGoalSchema) => editGoal(goal?.id!, dto), {
    onSuccess: () => {
      qc.invalidateQueries([GOALS.GOALS])
      toast({ title: 'Goal updated successfully!' })
      setIsDialogOpen(false)
    },
  })

  const handleAddOrEditGoal = (values: AddGoalSchema) => {
    const valuesToSubmit = {
      ...values,
      // started: dayjs(values.started).format(SERVER_DATE_FORMAT),
      // finished: dayjs(values.started).format(SERVER_DATE_FORMAT),
      // planned_finish: dayjs(values.started).format(SERVER_DATE_FORMAT),
      // planned_start: dayjs(values.started).format(SERVER_DATE_FORMAT),
    }

    /** Handling the case of updation */
    if (isEdit) {
      editGoalMutation.mutate(valuesToSubmit)
      return
    }

    addGoalMutation.mutate(valuesToSubmit)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        {cloneElement(trigger)}
      </DialogTrigger>
      <DialogContent className='max-h-[800px] overflow-auto max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Add'} Goal</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddOrEditGoal)} className='grid md:grid-cols-2 gap-4'>
            <InputFieldsRenderer control={form.control} inputs={GOAL_INPUTS} />

            <DialogFooter className='gap-2 md:col-span-2'>
              <Button
                loading={addGoalMutation.isLoading || editGoalMutation.isLoading}
                type='button'
                variant='outline'
                onClick={() => {
                  setIsDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type='submit' loading={addGoalMutation.isLoading || editGoalMutation.isLoading}>
                {isEdit ? 'Edit' : 'Add'} Goal
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
