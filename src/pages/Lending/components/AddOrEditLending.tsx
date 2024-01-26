import React, { cloneElement, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { Form } from '@/components/ui/form'
import { LENDING } from '@/utils/query-keys'
import { AddAccountSchema } from '@/types/lending'
import { useToast } from '@/components/ui/use-toast'
import { getErrorMessage } from '@/utils/utils'
import { addAccountSchema } from '@/schema/lending'
import { addLendingAccount, updateLendingAccount } from '@/queries/lending'

type Props = {
  trigger: React.ReactElement
  accounts?: AddAccountSchema
}

export default function AddOrEditLending({ accounts, trigger }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<AddAccountSchema>({
    resolver: zodResolver(addAccountSchema),
    defaultValues: {
      name: accounts?.name,
      partner_email: accounts?.partner_email,
      principal: Number(accounts?.principal),
      user_remark: accounts?.user_remark || undefined,
      started: accounts?.started ? new Date(accounts.started) : undefined,
    },
  })
  const addAccountMutation = useMutation(addLendingAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries([LENDING.ACCOUNTS])
      form.reset()
      toast({ title: 'Account created successfully!' })
      setIsDialogOpen(false)
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  const updateAccountMutation = useMutation((dto: AddAccountSchema) => updateLendingAccount(accounts?.id!, dto), {
    onSuccess: () => {
      queryClient.invalidateQueries([LENDING.ACCOUNTS])
      toast({ title: 'Account updated successfully!' })
      setIsDialogOpen(false)
    },
    onError: (err: any) => toast(getErrorMessage(err)),
  })

  const inputs = useMemo(() => {
    return [
      {
        id: 'name',
        label: 'Enter Name',
        type: 'text',
      },
      {
        id: 'partner_email',
        label: 'Enter Email of Partner',
        type: 'text',
      },
      {
        id: 'principal',
        label: 'Principal Amount',
        type: 'number',
      },
      {
        id: 'user_remark',
        label: 'Remarks',
        type: 'text',
      },
      {
        id: 'started',
        label: 'Choose the Date',
        type: 'date',
        defaultDate: accounts?.started ? new Date(accounts.started) : undefined,
      },
    ] as InputField[]
  }, [])

  const handleAddOrEditLendingAccount = () => {
    const values = form.getValues()
    const newAccount = {
      ...values,
      id: accounts?.id,
    }
    /** Handling case of account updation */
    if (accounts) {
      updateAccountMutation.mutate(newAccount)
      return
    }
    /** Handling case of account creation */
    addAccountMutation.mutate(values)
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
          <DialogTitle>{accounts ? 'Edit' : 'Add'} Account</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddOrEditLendingAccount)} className='space-y-4'>
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
              <Button type='submit' loading={addAccountMutation.isLoading || updateAccountMutation.isLoading}>
                {accounts ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
