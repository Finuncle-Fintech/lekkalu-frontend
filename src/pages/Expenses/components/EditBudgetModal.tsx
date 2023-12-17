import React, { useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PencilIcon } from 'lucide-react'
import { Budget } from '@/types/budget'
import { UpdateBudgetSchema, updateBudgetSchema } from '@/schema/budget'
import { updateBudget } from '@/queries/budget'
import { BUDGET_QUERY_KEYS } from '@/utils/query-keys'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { getErrorMessage } from '@/utils/utils'
import { toast } from '@/components/ui/use-toast'

dayjs.extend(customParseFormat)

type Props = {
  budget: Budget
}

export default function EditBudgetModal({ budget }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const qc = useQueryClient()

  const form = useForm<UpdateBudgetSchema>({
    resolver: zodResolver(updateBudgetSchema),
    defaultValues: {
      limit: Number(budget.limit),
    },
  })

  const updateBudgetMutation = useMutation((dto: UpdateBudgetSchema) => updateBudget(budget.id, dto), {
    onSuccess: () => {
      qc.invalidateQueries([BUDGET_QUERY_KEYS.BUDGETS])
      form.reset()
      setIsDialogOpen(false)
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  const handleUpdateBudget = (values: UpdateBudgetSchema) => {
    updateBudgetMutation.mutate({ ...values })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        <Button variant='outline' size='sm'>
          <PencilIcon className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Budget ({dayjs(budget.month).format('MMMM YYYY')})</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateBudget)} className='space-y-2'>
            <InputFieldsRenderer
              control={form.control}
              inputs={[
                {
                  id: 'limit',
                  label: 'Limit',
                  type: 'number',
                }
              ]}
            />

            <DialogFooter className='gap-2'>
              <Button type='submit' className='flex-grow' loading={updateBudgetMutation.isLoading}>
                Update
              </Button>
              <Button
                variant='outline'
                className='flex-grow'
                onClick={() => {
                  setIsDialogOpen(false)
                }}
                loading={updateBudgetMutation.isLoading}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
