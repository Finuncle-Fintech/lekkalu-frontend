import React from 'react'
import { TrashIcon } from 'lucide-react'
import { capitalize } from 'lodash'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Alert from '@/components/Alert/Alert'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { INCOME_STATEMENT } from '@/utils/query-keys'

type Props = {
  id: number
  type: 'INCOME' | 'EXPENSE'
  deleteMutationFn: (id: number) => Promise<void>
}

export default function DeleteIncomeStatement({ id, type, deleteMutationFn }: Props) {
  const qc = useQueryClient()
  const { toast } = useToast()

  const deleteMutation = useMutation(deleteMutationFn, {
    onSuccess: () => {
      qc.invalidateQueries([type === 'INCOME' ? INCOME_STATEMENT.SOURCES : INCOME_STATEMENT.IS_EXPENSES])
      toast({ title: `${capitalize(type)} deleted successfully!` })
    },
  })

  return (
    <Alert
      trigger={
        <Button size='sm' variant='ghost'>
          <TrashIcon className='w-4 h-4 text-red-500' />
        </Button>
      }
      title={`Delete ${capitalize(type)}`}
      description={`Are you sure you want to delete this ${type.toLowerCase()} ?`}
      okText='Yes, Delete'
      okButtonProps={{ disabled: deleteMutation.isLoading, className: 'bg-red-500 hover:bg-red-400' }}
      cancelText='No'
      cancelProps={{ disabled: deleteMutation.isLoading }}
      onOk={() => {
        deleteMutation.mutate(id)
      }}
    />
  )
}
