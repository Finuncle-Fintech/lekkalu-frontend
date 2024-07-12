import React from 'react'
import { TrashIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Alert from '@/components/Alert/Alert'
import { Button } from '@/components/ui/button'
import { deleteLiability } from '@/queries/balance-sheet'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { useToast } from '@/components/ui/use-toast'
import { getErrorMessage } from '@/utils/utils'

type Props = {
  id: number
}

export default function DeleteLiabilityDialog({ id }: Props) {
  const qc = useQueryClient()
  const { toast } = useToast()

  const deleteLiabilityMutation = useMutation({
    mutationFn: deleteLiability,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [BALANCE_SHEET.LIABILITIES] })
      toast({ title: 'Liability deleted successfully!' })
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  return (
    <Alert
      trigger={
        <Button size='sm' variant='ghost'>
          <TrashIcon className='w-4 h-4 text-red-500' />
        </Button>
      }
      title='Delete Liability'
      description='Are you sure you want to delete this liability ?'
      okText='Yes, Delete'
      okButtonProps={{ disabled: deleteLiabilityMutation.isPending, className: 'bg-red-500 hover:bg-red-400' }}
      cancelText='No'
      cancelProps={{ disabled: deleteLiabilityMutation.isPending }}
      onOk={() => {
        deleteLiabilityMutation.mutate(id)
      }}
    />
  )
}
