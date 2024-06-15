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
      month: dayjs().format('MM'),
    },
  })

  const { data, isFetching } = useQuery({
    queryKey: [BUDGET_QUERY_KEYS.BUDGETS],
    queryFn: fetchBudgets,
    enabled: !!open,
  })

  const setBudgetMutation = useMutation({
    mutationFn: setBudget,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [BUDGET_QUERY_KEYS.BUDGETS] })
      form.reset()
      setIsDialogOpen(false)
      toast({ title: 'Successfully set the budget' })
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  const handleCreateBudget = (values: SetBudgetSchemaDTO) => {
    let monthAlreadyPresent = false
    const currentSelectedDate = dayjs(values.month).format('MMM YYYY')
    data?.forEach((budget) => {
      if (currentSelectedDate === dayjs(budget.month).format('MMM YYYY')) {
        form.setError('month', { message: 'Budget already alloted for this month' })
        monthAlreadyPresent = true
      }
    })
    !monthAlreadyPresent &&
      setBudgetMutation.mutate({
        ...values,
        month: dayjs(`${values.year}-${values.month}-01`).format(SERVER_DATE_FORMAT),
        limit: Number(values.limit.toFixed(2)),
      })
  }

  interface YearOption {
    id: string
    label: string
  }

  const currentYear = new Date().getFullYear()
  const years: YearOption[] = Array.from({ length: 10 }, (v, i) => ({
    id: `${currentYear - i}`,
    label: `${currentYear - i}`,
  }))

  interface MonthOption {
    id: string
    label: string
  }

  const monthOptions: MonthOption[] = [
    { id: '01', label: 'January' },
    { id: '02', label: 'February' },
    { id: '03', label: 'March' },
    { id: '04', label: 'April' },
    { id: '05', label: 'May' },
    { id: '06', label: 'June' },
    { id: '07', label: 'July' },
    { id: '08', label: 'August' },
    { id: '09', label: 'September' },
    { id: '10', label: 'October' },
    { id: '11', label: 'November' },
    { id: '12', label: 'December' },
  ]

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
                    type: 'select',
                    options: monthOptions,
                  },
                  {
                    id: 'year',
                    label: 'Year',
                    type: 'select',
                    options: years,
                  },
                ]}
              />

              <DialogFooter className='gap-2'>
                <Button type='submit' className='flex-grow' disabled={setBudgetMutation.isPending}>
                  Set
                </Button>
                <Button
                  variant='outline'
                  className='flex-grow'
                  onClick={() => {
                    setIsDialogOpen(false)
                  }}
                  disabled={setBudgetMutation.isPending}
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
