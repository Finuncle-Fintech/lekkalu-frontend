import React from 'react'
// import { TrashIcon } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Alert from '@/components/Alert/Alert'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { AUTH, BALANCE_SHEET } from '@/utils/query-keys'
import { getErrorMessage } from '@/utils/utils'

type Props = {
  id: number
  deleteAsset: (id: number) => Promise<any>
}

export default function DeleteAssetForScenario({ id, deleteAsset }: Props) {
  const qc = useQueryClient()
  const { toast } = useToast()
  const { data: username } = useQuery<string>({ queryKey: [AUTH.CURRENT_IMAGINARY_USER] })

  const deleteMutation = useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [`${BALANCE_SHEET.ASSETS}-${username}`] })
      toast({ title: 'Asset deleted successfully!' })
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  return (
    <Alert
      trigger={
        <Button size='sm' variant='ghost' className='w-full text-red-500 hover:text-white hover:bg-red-500'>
          Delete
        </Button>
      }
      title='Delete Asset'
      description='Are you sure you want to delete this Asset?'
      okText='Yes, Delete'
      okButtonProps={{ disabled: deleteMutation.isPending, className: 'bg-red-500 hover:bg-red-400' }}
      cancelText='No'
      cancelProps={{ disabled: deleteMutation.isPending }}
      onOk={() => {
        deleteMutation.mutate(id)
      }}
    />
  )
}
