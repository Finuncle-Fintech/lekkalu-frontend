import React from 'react'
// import { TrashIcon } from 'lucide-react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
import Alert from '@/components/Alert/Alert'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
// import { deleteGoal } from '@/queries/goals'
// import { GOALS } from '@/utils/query-keys'
// import { getErrorMessage } from '@/utils/utils'

type Props = {
  id: number
}

export default function DeleteScenario({ id }: Props) {
  //   const qc = useQueryClient()
  const { toast } = useToast()

  //   const deleteGoalMutation = useMutation(deleteGoal, {
  //     onSuccess: () => {
  //       qc.invalidateQueries([GOALS.GOALS])
  //       toast({ title: 'Goal deleted successfully!' })
  //     },
  //     onError: (err: any) => toast(getErrorMessage(err)),
  //   })

  const deleteScenarioMutation = (id: number) => {
    toast({ title: `This will be deleted on api integration! ${id}` })
  }

  return (
    <Alert
      trigger={
        <Button size='sm' variant='ghost' className='w-full text-red-500 hover:text-white hover:bg-red-500'>
          Delete
        </Button>
      }
      title='Delete Scenario'
      description='Are you sure you want to delete this scenario ?'
      okText='Yes, Delete'
      okButtonProps={{ disabled: false, className: 'bg-red-500 hover:bg-red-400' }}
      cancelText='No'
      cancelProps={{ disabled: false }}
      onOk={() => {
        // deleteGoalMutation.mutate(id)
        deleteScenarioMutation(id)
      }}
    />
  )
}
