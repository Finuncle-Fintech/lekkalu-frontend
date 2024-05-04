import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { cloneElement, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import { addMutualFundSchema } from '@/schema/balance-sheet'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { addSecurityTransaction, editSecurityTransaction, fetchMutualFunds } from '@/queries/balance-sheet'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { getErrorMessage } from '@/utils/utils'
import { SERVER_DATE_FORMAT } from '@/utils/constants'
import { AddMutualFundType, MutualFundSchema } from '@/types/balance-sheet'

type Props = {
  trigger: React.ReactElement
  asset?: MutualFundSchema
  closeModal?: () => void
}

export default function AddOrEditAssetsMutualFund({ trigger, asset, closeModal }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const qc = useQueryClient()
  const isEdit = Boolean(asset)
  const { data: mutualFunds } = useQuery([BALANCE_SHEET.MUTUAL_FUNDS], fetchMutualFunds)

  const mutualFundsOptions = useMemo(() => {
    return (
      mutualFunds?.map((acc) => ({
        id: acc.id?.toString(),
        label: acc.name,
        value: acc.id,
      })) ?? []
    )
  }, [mutualFunds])

  const form = useForm<AddMutualFundType>({
    resolver: zodResolver(addMutualFundSchema),
    defaultValues: {
      expected_return: undefined,
      invested_amount: Number(asset?.value) ?? undefined,
      name: undefined,
      purchase_date: asset?.transaction_date ? new Date(asset?.transaction_date) : new Date(),
      quantity: Number(asset?.quantity) ?? 1,
    },
  })

  const addMutualFundMutation = useMutation(addSecurityTransaction, {
    onSuccess: () => {
      qc.invalidateQueries([BALANCE_SHEET.SECURITIES_TRANSACTIONS])
      toast({ title: 'Mutual fund created successfully!' })
      setIsDialogOpen(false)
      closeModal?.()
    },
    onError: (err) => toast(getErrorMessage(err)),
  })

  const editMutualFundMutation = useMutation((dto: MutualFundSchema) => editSecurityTransaction(asset?.id!, dto), {
    onSuccess: () => {
      qc.invalidateQueries([BALANCE_SHEET.SECURITIES_TRANSACTIONS])
      toast({ title: 'Mutual fund updated successfully!' })
      setIsDialogOpen(false)
      closeModal?.()
    },
    onError: (err) => toast(getErrorMessage(err)),
  })
  const handleAddOrEditMutualFundAsset = (values: AddMutualFundType) => {
    const { quantity, expected_return, invested_amount, purchase_date } = values
    const fund = mutualFunds?.find((fund) => fund.id?.toString() === form.getValues('name'))
    console.log({ fund, expected_return })
    const payLoad = {
      type: 'Buy',
      value: invested_amount,
      quantity,
      security_object_id: 1,
      transaction_date: dayjs(purchase_date).format(SERVER_DATE_FORMAT),
      security_type: 'MutualFund',
    }
    if (asset) {
      editMutualFundMutation.mutate(payLoad)
    } else {
      addMutualFundMutation.mutate(payLoad)
    }
    // {
    //   "type": "Buy",
    //   "value": 14000,
    //   "quantity": 12,
    //   "transaction_date": "2019-08-24",
    //   "security_type": "MutualFund",
    //   "security_object_id": 1
    // }
  }

  const assetsInputOptionsCash = useMemo(
    () =>
      [
        {
          id: 'name',
          label: 'Name',
          type: 'select',
          options: mutualFundsOptions,
        },
        {
          id: 'invested_amount',
          label: 'Invested Amount',
          type: 'number',
        },
        {
          id: 'expected_return',
          label: 'Expected Return',
          type: 'number',
        },
        {
          id: 'quantity',
          label: 'Quantity',
          type: 'number',
        },
        {
          id: 'purchase_date',
          label: 'Purchase Date',
          type: 'date',
        },
      ] as InputField[],
    [mutualFundsOptions],
  )

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
      <DialogContent className='max-h-[800px] overflow-auto'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Add'} Mutual Fund Transaction</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddOrEditMutualFundAsset)} className='gap-4'>
            <div className='md:col-span-2 space-y-2'>
              <div className='flex flex-col my-5 gap-2 w-full'>
                <InputFieldsRenderer control={form.control} inputs={assetsInputOptionsCash} />
              </div>
            </div>

            <DialogFooter className='gap-2 md:col-span-2'>
              <Button
                loading={addMutualFundMutation.isLoading || editMutualFundMutation.isLoading}
                type='button'
                variant='outline'
                onClick={() => {
                  setIsDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type='submit' loading={addMutualFundMutation.isLoading || editMutualFundMutation.isLoading}>
                {isEdit ? 'Edit' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
