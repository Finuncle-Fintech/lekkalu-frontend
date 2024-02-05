import React, { cloneElement, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { Form } from '@/components/ui/form'
import { LENDING } from '@/utils/query-keys'
import { AddTransactionSchema } from '@/types/lending'
import { useToast } from '@/components/ui/use-toast'
import { getErrorMessage } from '@/utils/utils'
import { addTransactionSchema } from '@/schema/lending'
import { addLendingTransaction, fetchLendingAccounts, updateLendingTransaction } from '@/queries/lending'
import { calculateTransactionAmount } from '@/utils/lending'

type Props = {
  trigger: React.ReactElement
  transaction?: AddTransactionSchema
  type?: 'borrow' | 'lend'
}

export default function AddOrEditTransaction({ type, transaction, trigger }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const form = useForm<AddTransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      lending_account: transaction?.lending_account?.toString(),
      amount: Number(transaction?.amount),
      time: transaction?.time ? new Date(transaction.time) : undefined,
      payment_method: transaction?.payment_method,
      reference_no: transaction?.reference_no,
      note: transaction?.note,
    },
  })
  const { data: lendingAccounts } = useQuery([LENDING.ACCOUNTS], fetchLendingAccounts)

  const addTransactionMutation = useMutation(addLendingTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries([LENDING.ACCOUNTS])
      queryClient.invalidateQueries([LENDING.TRANSACTIONS])
      form.reset()
      toast({ title: 'Transaction created successfully!' })
      setIsDialogOpen(false)
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  const updateTransactionMutation = useMutation(
    (dto: AddTransactionSchema) => updateLendingTransaction(transaction?.id!, dto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([LENDING.ACCOUNTS])
        queryClient.invalidateQueries([LENDING.TRANSACTIONS])
        toast({ title: 'Transaction updated successfully!' })
        setIsDialogOpen(false)
      },
      onError: (err: any) => toast(getErrorMessage(err)),
    },
  )
  const inputs = useMemo(() => {
    return [
      {
        id: 'lending_account',
        label: 'Select Lending Account',
        type: 'select',
        options: lendingAccounts?.map((acc) => ({ id: acc.id?.toString(), label: acc.name })) ?? [],
      },
      {
        id: 'payment_method',
        label: 'Enter Payment Method',
        type: 'text',
      },
      {
        id: 'reference_no',
        label: 'Enter Reference No',
        type: 'text',
      },
      {
        id: 'note',
        label: 'Enter Note',
        type: 'text',
      },
      {
        id: 'amount',
        label: 'Principal Amount',
        type: 'number',
      },
      {
        id: 'time',
        label: 'Choose the Date',
        type: 'date',
        defaultDate: transaction?.time ? new Date(transaction.time) : undefined,
      },
    ] as InputField[]
  }, [lendingAccounts, transaction?.time])

  const handleAddOrEditLendingTransaction = () => {
    const values = form.getValues()
    const newTransaction = {
      ...values,
      id: transaction?.id,
    }
    /** Handling case of transaction updation */
    if (transaction) {
      updateTransactionMutation.mutate(newTransaction)
      return
    }
    /** Handling case of transaction creation */
    addTransactionMutation.mutate({
      ...values,
      amount: type ? calculateTransactionAmount(type, values.amount as number) : values.amount,
    })
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
          <DialogTitle>{transaction ? 'Edit' : 'Add'} Transaction</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddOrEditLendingTransaction)} className='space-y-4'>
            <InputFieldsRenderer control={form.control} inputs={inputs} />

            <DialogFooter className='gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setIsDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type='submit' loading={addTransactionMutation.isLoading || updateTransactionMutation.isLoading}>
                {transaction ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
