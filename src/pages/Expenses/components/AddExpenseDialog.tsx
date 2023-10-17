import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { AddExpenseSchema, addExpenseSchema } from '@/schema/expense'
import { Form } from '@/components/ui/form'
import { EXPENSES, TAGS } from '@/utils/query-keys'
import { fetchTags } from '@/queries/tag'
import { addExpense, fetchExpenses } from '@/queries/expense'
import { checkIsExpenseExists } from '@/utils/expense'
import { useToast } from '@/components/ui/use-toast'

export default function AddExpenseDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const { data: tags } = useQuery([TAGS.TAGS], fetchTags, { enabled: !!isDialogOpen })
  const { data: expenses } = useQuery([EXPENSES.EXPENSES], fetchExpenses, { enabled: !!isDialogOpen })

  const form = useForm<AddExpenseSchema>({
    resolver: zodResolver(addExpenseSchema),
  })

  const addExpenseMutation = useMutation(addExpense, {
    onSuccess: () => {
      form.reset()
      toast({ title: 'Expense created successfully!' })
      setIsDialogOpen(false)
    },
  })

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
      },
    ] as InputField[]
  }, [tags])

  const handleAddOrEditExpense = (values: AddExpenseSchema) => {
    const newExpense = {
      amount: values.amount,
      tags: [values.tags],
      time: values.time,
    }
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
        <Button>Add Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddOrEditExpense)} className='space-y-4'>
            <InputFieldsRenderer control={form.control} inputs={inputs} />

            <DialogFooter>
              <Button type='submit'>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
