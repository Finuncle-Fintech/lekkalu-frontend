import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { setBudgetSchemaDTO, SetBudgetSchemaDTO } from '@/schema/budget'
import { fetchBudgets, setBudget } from '@/queries/budget'
import { SERVER_DATE_FORMAT } from '@/utils/constants'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Form } from '@/components/ui/form'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BUDGET_QUERY_KEYS } from '@/utils/query-keys'
import { getErrorMessage } from '@/utils/utils'
import When from '@/components/When/When'

export default function SetBudgetModal() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const qc = useQueryClient()

  const form = useForm<SetBudgetSchemaDTO>({
    resolver: zodResolver(setBudgetSchemaDTO),
    defaultValues: {
      month: new Date(),
    },
  })

  const { data, isFetching } = useQuery([BUDGET_QUERY_KEYS.BUDGETS], fetchBudgets, { enabled: !!open })

  const setBudgetMutation = useMutation(setBudget, {
    onSuccess: () => {
      qc.invalidateQueries([BUDGET_QUERY_KEYS.BUDGETS])
      form.reset()
      setIsDialogOpen(false)
      toast({ title: 'Successfully set the budget' })
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  const handleCreateBudget = (values: SetBudgetSchemaDTO) => {
    let monthAlreadyPresent = false
    const currentSelectedDate = dayjs(values.month).format('MMM YYYY')
    data?.forEach(budget => {
      if (currentSelectedDate === dayjs(budget.month).format('MMM YYYY')) {
        form.setError('month', { message: 'Budget already alloted for this month' })
        monthAlreadyPresent = true
      }
    })
    !monthAlreadyPresent && setBudgetMutation.mutate({ ...values, month: dayjs(values.month).format(SERVER_DATE_FORMAT) })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        <Button>Set Budget</Button>
      </DialogTrigger>
      <DialogContent className='m-4'>
        <DialogHeader>
          <DialogTitle>Set Budget</DialogTitle>
        </DialogHeader>

        <When truthy={!isFetching}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateBudget)} className='space-y-2'>
              <InputFieldsRenderer
                control={form.control}
                inputs={[
                  {
                    id: 'limit',
                    label: 'Limit',
                    type: 'number',
                  },
                  {
                    id: 'month',
                    label: 'Month',
                    type: 'date',
                  },
                ]}
              />

              <DialogFooter className='gap-2'>
                <Button type='submit' className='flex-grow' disabled={setBudgetMutation.isLoading}>
                  Set
                </Button>
                <Button
                  variant='outline'
                  className='flex-grow'
                  onClick={() => {
                    setIsDialogOpen(false)
                  }}
                  disabled={setBudgetMutation.isLoading}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </When>
      </DialogContent>
    </Dialog>
  )
}
