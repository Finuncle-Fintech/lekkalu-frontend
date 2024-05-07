import React, { cloneElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { capitalize } from 'lodash'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IncomeStatement } from '@/types/income-statement'
import { Form } from '@/components/ui/form'
import { AddIncomeStatementSchema, addIncomeStatementSchema } from '@/schema/income-statement'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { INCOME_STATEMENT } from '@/utils/query-keys'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'

import { fetchIncomeExpensesTypes, fetchIncomeSourceTypes } from '@/queries/income-statement'

type Props = {
  trigger: React.ReactElement
  type: 'INCOME' | 'EXPENSE'
  incomeStatement?: IncomeStatement
  createMutationFn: (dto: AddIncomeStatementSchema) => Promise<void>
  updateMutationFn: (id: number, dto: AddIncomeStatementSchema) => Promise<void>
}

export default function AddOrEditIncomeExpense({
  trigger,
  type,
  incomeStatement,
  createMutationFn,
  updateMutationFn,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isEdit = Boolean(incomeStatement)
  const qc = useQueryClient()
  const { toast } = useToast()
  const { data: incomeTypes } = useQuery(
    [INCOME_STATEMENT.INCOME_TYPE],
    type === 'INCOME' ? fetchIncomeSourceTypes : fetchIncomeExpensesTypes,
    { enabled: !!isDialogOpen },
  )

  const form = useForm<AddIncomeStatementSchema>({
    resolver: zodResolver(addIncomeStatementSchema),
    defaultValues: {
      name: incomeStatement?.name,
      amount: incomeStatement?.amount ? Number(incomeStatement.amount) : undefined,
    },
  })

  const createMutation = useMutation(createMutationFn, {
    onSuccess: () => {
      form.reset()
      qc.invalidateQueries([type === 'INCOME' ? INCOME_STATEMENT.SOURCES : INCOME_STATEMENT.IS_EXPENSES])
      setIsDialogOpen(false)
      toast({ title: `${capitalize(type)} created successfully!` })
    },
    onError: (err: any) => {
      const message = err?.response?.status === 400 ? err?.response?.data[0] : 'Something went wrong.'
      toast({ title: message, variant: 'destructive' })
    },
  })

  const updateMutation = useMutation((dto: AddIncomeStatementSchema) => updateMutationFn(incomeStatement?.id!, dto), {
    onSuccess: () => {
      qc.invalidateQueries([type === 'INCOME' ? INCOME_STATEMENT.SOURCES : INCOME_STATEMENT.IS_EXPENSES])
      setIsDialogOpen(false)
      toast({ title: `${capitalize(type)} updated successfully!` })
    },
    onError: (err: any) => {
      const message = err?.response?.status === 400 ? err?.response?.data[0] : 'Something went wrong.'
      toast({ title: message, variant: 'destructive' })
    },
  })

  const handleAddOrEdit = (values: AddIncomeStatementSchema) => {
    values.amount = Number(values.amount.toFixed(2))
    if (isEdit) {
      updateMutation.mutate(values)
      return
    }

    createMutation.mutate(values)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        {cloneElement(trigger)}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit' : 'Add'} {capitalize(type)}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddOrEdit)} className='space-y-4'>
            <InputFieldsRenderer
              control={form.control}
              inputs={[
                {
                  id: 'name',
                  label: 'Name',
                  type: 'text',
                },
                {
                  id: 'type',
                  label: 'Type',
                  type: 'select',
                  options:
                    incomeTypes?.map((type: any) => ({ id: type.value, label: type.label, value: type.value })) ?? [],
                },
                {
                  id: 'amount',
                  label: 'Amount',
                  type: 'number',
                },
              ]}
            />

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setIsDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type='submit' loading={createMutation.isLoading || updateMutation.isLoading}>
                {isEdit ? 'Edit' : 'Add'} {capitalize(type)}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
