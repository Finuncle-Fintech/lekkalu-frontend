import React from 'react'
import { TrashIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Alert from '@/components/Alert/Alert'
import { Button } from '@/components/ui/button'
import { LENDING } from '@/utils/query-keys'
import { useToast } from '@/components/ui/use-toast'
import { getErrorMessage } from '@/utils/utils'
import { deleteLendingAccount } from '@/queries/lending'

type Props = {
  id: number
}

export default function DeleteLendingAccount({ id }: Props) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const deleteLendingAccountMutation = useMutation({
    mutationFn: deleteLendingAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LENDING.ACCOUNTS] })

      toast({ title: 'Account deleted successfully!' })
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
      title='Delete Account'
      description='Are you sure you want to delete this account?'
      okText='Yes, Delete'
      okButtonProps={{ disabled: deleteLendingAccountMutation.isPending, className: 'bg-red-500 hover:bg-red-400' }}
      cancelText='No'
      cancelProps={{ disabled: deleteLendingAccountMutation.isPending }}
      onOk={() => {
        deleteLendingAccountMutation.mutate(id)
      }}
    />
  )
}
