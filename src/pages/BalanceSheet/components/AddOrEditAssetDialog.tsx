import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { useToast } from '@/components/ui/use-toast'
import { AddPhysicalAssetSchema, addPhysicalAssetSchema } from '@/schema/balance-sheet'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { addPhysicalAsset } from '@/queries/balance-sheet'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ASSET_INPUTS } from '@/utils/balance-sheet'
import { DATE_FORMAT } from '@/utils/constants'

type Props = {
  isEdit?: boolean
}

export default function AddOrEditAssetDialog({ isEdit = false }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const qc = useQueryClient()

  const form = useForm<AddPhysicalAssetSchema>({
    resolver: zodResolver(addPhysicalAssetSchema),
    defaultValues: {
      name: '',
      purchase_value: undefined,
      purchase_date: undefined,
      sell_value: undefined,
      sell_date: undefined,
      depreciation_percent: undefined,
      depreciation_frequency: 0,
      init_dep: 1,
      market_value: 0,
      user: 2,
      type: 1,
      tags: [],
    },
  })

  const addPhysicalAssetMutation = useMutation(addPhysicalAsset, {
    onSuccess: () => {
      qc.invalidateQueries([BALANCE_SHEET.ASSETS])
      toast({ title: 'Asset created successfully!' })
      setIsDialogOpen(false)
    },
  })

  const handleAddOrEditPhysicalAsset = (values: AddPhysicalAssetSchema) => {
    addPhysicalAssetMutation.mutate({ ...values, purchase_date: dayjs(values.purchase_date).format(DATE_FORMAT) })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        <Button>
          <PlusIcon className='mr-2 w-4 h-4' />
          <span>{isEdit ? 'Edit' : 'Add'} Asset</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[800px] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Add Asset</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddOrEditPhysicalAsset)} className='grid md:grid-cols-2 gap-4'>
            <InputFieldsRenderer control={form.control} inputs={ASSET_INPUTS} />

            <DialogFooter className='gap-2 md:col-span-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setIsDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type='submit' loading={addPhysicalAssetMutation.isLoading}>
                {isEdit ? 'Edit' : 'Add'} Asset
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
