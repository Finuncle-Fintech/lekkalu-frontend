import React from 'react'
import { TrashIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Alert from '@/components/Alert/Alert'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { deleteGoal } from '@/queries/goals'
import { GOALS } from '@/utils/query-keys'

type Props = {
  id: number
}

export default function DeleteGoal({ id }: Props) {
  const qc = useQueryClient()
  const { toast } = useToast()

  const deleteGoalMutation = useMutation(deleteGoal, {
    onSuccess: () => {
      qc.invalidateQueries([GOALS.GOALS])
      toast({ title: 'Goal deleted successfully!' })
    },
  })

  return (
    <Alert
      trigger={
        <Button size='sm' variant='ghost'>
          <TrashIcon className='w-4 h-4 text-red-500' />
        </Button>
      }
      title='Delete Goal'
      description='Are you sure you want to delete this goal ?'
      okText='Yes, Delete'
      okButtonProps={{ disabled: deleteGoalMutation.isLoading, className: 'bg-red-500 hover:bg-red-400' }}
      cancelText='No'
      cancelProps={{ disabled: deleteGoalMutation.isLoading }}
      onOk={() => {
        deleteGoalMutation.mutate(id)
      }}
    />
  )
}
