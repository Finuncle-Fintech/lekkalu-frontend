import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { cloneElement, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import { addAccountSchema } from '@/schema/balance-sheet'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { addPhysicalAsset, editPhysicalAsset } from '@/queries/balance-sheet'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { AddPhysicalAssetSchema, AddPhysicalAssetTypeAccountSchema, PhysicalAsset } from '@/types/balance-sheet'
import { getErrorMessage } from '@/utils/utils'
import { useStepper } from '@/components/ui/stepper'

type Props = {
  trigger: React.ReactElement
  asset?: PhysicalAsset
  closeModal?: () => void
  isSteeper?: boolean
}

export default function AddOrEditAssetsAccount({ trigger, asset, closeModal, isSteeper }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const qc = useQueryClient()
  const { prevStep } = useStepper()
  const isEdit = Boolean(asset)

  const form = useForm<AddPhysicalAssetTypeAccountSchema>({
    resolver: zodResolver(addAccountSchema),
    defaultValues: {
      amount: undefined,
      account_name: '',
      rate_return: undefined,
    },
  })

  const addPhysicalAssetMutation = useMutation(addPhysicalAsset, {
    onSuccess: () => {
      qc.invalidateQueries([BALANCE_SHEET.ASSETS])
      toast({ title: 'Asset created successfully!' })
      setIsDialogOpen(false)
    },
    onError: (err) => toast(getErrorMessage(err)),
  })

  const editPhysicalAssetMutation = useMutation((dto: AddPhysicalAssetSchema) => editPhysicalAsset(asset?.id!, dto), {
    onSuccess: () => {
      qc.invalidateQueries([BALANCE_SHEET.ASSETS])
      toast({ title: 'Asset updated successfully!' })
      setIsDialogOpen(false)
    },
    onError: (err) => toast(getErrorMessage(err)),
  })

  const handleAddOrEditAccountAsset = () => {
    closeModal?.()
  }
  // const handleAddOrEditAccountAsset = (values: AddPhysicalAssetTypeAccountSchema) => {
  //   console.log('Submitting Values', values)
  //   closeModal?.()
  // }

  const assetsInputOptionsCash = useMemo(
    () =>
      [
        {
          id: 'account_name',
          label: 'Account Name',
          type: 'text',
        },
        {
          id: 'amount',
          label: 'Amount',
          type: 'number',
        },
        {
          id: 'rate_return',
          label: 'Rate Return',
          type: 'number',
        },
      ] as InputField[],
    [],
  )

  const FormContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddOrEditAccountAsset)} className='gap-4'>
        <div className='md:col-span-2 space-y-2'>
          <div className='flex flex-col my-5 gap-2 w-full'>
            <InputFieldsRenderer control={form.control} inputs={assetsInputOptionsCash} />
          </div>
        </div>

        <DialogFooter className='gap-2 md:col-span-2'>
          <Button
            loading={addPhysicalAssetMutation.isLoading || editPhysicalAssetMutation.isLoading}
            type='button'
            variant='outline'
            onClick={() => {
              isSteeper ? prevStep() : setIsDialogOpen(false)
            }}
          >
            {isSteeper ? 'Prev' : 'Cancel'}
          </Button>
          <Button type='submit' loading={addPhysicalAssetMutation.isLoading || editPhysicalAssetMutation.isLoading}>
            {isEdit ? 'Edit' : 'Add'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )

  return isSteeper ? (
    FormContent
  ) : (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        {trigger && cloneElement(trigger)}
      </DialogTrigger>
      <DialogContent className='max-h-[800px] overflow-auto'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Add'} Account</DialogTitle>
        </DialogHeader>
        {FormContent}
      </DialogContent>
    </Dialog>
  )
}
