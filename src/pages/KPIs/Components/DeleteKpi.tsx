import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Alert from '@/components/Alert/Alert'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { deleteCustomKPI } from '@/queries/goals'
import { KPIS } from '@/utils/query-keys'
import { getErrorMessage } from '@/utils/utils'

type Props = {
  id: number
}

export default function DeleteKpi({ id }: Props) {
  const qc = useQueryClient()
  const { toast } = useToast()

  const deleteKpiMutation = useMutation({
    mutationFn: deleteCustomKPI,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [KPIS.KPIS] })
      toast({ title: 'KPI deleted successfully!' })
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  return (
    <Alert
      trigger={
        <Button size="sm" variant="ghost" className="w-full text-red-500 hover:text-white hover:bg-red-500">
          Delete
        </Button>
      }
      title="Delete KPI"
      description="Are you sure you want to delete this KPI ?"
      okText="Yes, Delete"
      okButtonProps={{ disabled: deleteKpiMutation.isPending, className: 'bg-red-500 hover:bg-red-400' }}
      cancelText="No"
      cancelProps={{ disabled: deleteKpiMutation.isPending }}
      onOk={() => {
        deleteKpiMutation.mutate(id)
      }}
    />
  )
}
