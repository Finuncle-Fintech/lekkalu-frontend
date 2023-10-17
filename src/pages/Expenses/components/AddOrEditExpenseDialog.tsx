import React, { cloneElement, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { AddExpenseSchema, addExpenseSchema } from '@/schema/expense'
import { Form } from '@/components/ui/form'
import { EXPENSES, TAGS } from '@/utils/query-keys'
import { fetchTags } from '@/queries/tag'
import { addExpense, fetchExpenses, updateExpense } from '@/queries/expense'
import { checkIsExpenseExists } from '@/utils/expense'
import { useToast } from '@/components/ui/use-toast'
import { Expense } from '@/types/expense'

type Props = {
  trigger: React.ReactElement
  expense?: Expense
}

export default function AddOrEditExpenseDialog({ expense, trigger }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: tags } = useQuery([TAGS.TAGS], fetchTags, { enabled: !!isDialogOpen })
  const { data: expenses } = useQuery([EXPENSES.EXPENSES], () => fetchExpenses(), { enabled: !!isDialogOpen })

  const form = useForm<AddExpenseSchema>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      amount: expense?.amount,
      // @TODO: Add multiple tags
      tags: expense?.tags ? expense.tags[0] : undefined,
      time: expense?.time ? new Date(expense.time) : undefined,
    },
  })

  const addExpenseMutation = useMutation(addExpense, {
    onSuccess: () => {
      queryClient.invalidateQueries([EXPENSES.EXPENSES])
      toast({ title: 'Expense created successfully!' })
      setIsDialogOpen(false)
    },
  })

  const updateExpenseMutation = useMutation(
    (dto: Omit<AddExpenseSchema, 'tags'> & { tags: number[] }) => updateExpense(expense?.id!, dto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([EXPENSES.EXPENSES])
        toast({ title: 'Expense updated successfully!' })
        setIsDialogOpen(false)
      },
    },
  )

  const inputs = useMemo(() => {
    return [
      {
        id: 'amount',
        label: 'Provide the amount',
        type: 'number',
      },
      {
        id: 'tags',
        label: 'Select tags',
        type: 'multi-select',
        options: tags?.map((tag) => ({ id: tag.id, label: tag.name })) ?? [],
      },
      {
        id: 'time',
        label: 'Choose the Date',
        type: 'date',
        defaultDate: expense?.time ? new Date(expense.time) : undefined,
      },
    ] as InputField[]
  }, [tags, expense?.time])

  const handleAddOrEditExpense = (values: AddExpenseSchema) => {
    const newExpense = {
      amount: values.amount,
      tags: [values.tags],
      time: values.time,
    }
    /** Handling case of expense updation */
    if (expense) {
      updateExpenseMutation.mutate(newExpense)
      return
    }

    /** Handling case of expense creation */
    const exists = checkIsExpenseExists(expenses ?? [], newExpense)
    if (exists) {
      toast({ title: 'Expense already exists!', variant: 'destructive' })
      return
    }

    addExpenseMutation.mutate(newExpense)
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
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddOrEditExpense)} className='space-y-4'>
            <InputFieldsRenderer control={form.control} inputs={inputs} />

            <DialogFooter>
              <Button type='submit' loading={addExpenseMutation.isLoading || updateExpenseMutation.isLoading}>
                {expense ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
