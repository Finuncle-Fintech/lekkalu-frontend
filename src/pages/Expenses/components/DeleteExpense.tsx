import React from 'react'
import { TrashIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Alert from '@/components/Alert/Alert'
import { Button } from '@/components/ui/button'
import { deleteExpense } from '@/queries/expense'
import { EXPENSES } from '@/utils/query-keys'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  id: number
}

export default function DeleteExpense({ id }: Props) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const deleteExpenseMutation = useMutation(deleteExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries([EXPENSES.EXPENSES])

      toast({ title: 'Expense deleted successfully!' })
    },
  })

  return (
    <Alert
      trigger={
        <Button size='sm' variant='ghost'>
          <TrashIcon className='w-4 h-4 text-red-500' />
        </Button>
      }
      title='Delete Expense'
      description='Are you sure you want to delete this expense ?'
      okText='Yes, Delete'
      okButtonProps={{ disabled: deleteExpenseMutation.isLoading, className: 'bg-red-500 hover:bg-red-400' }}
      cancelText='No'
      cancelProps={{ disabled: deleteExpenseMutation.isLoading }}
      onOk={() => {
        deleteExpenseMutation.mutate(id)
      }}
    />
  )
}
