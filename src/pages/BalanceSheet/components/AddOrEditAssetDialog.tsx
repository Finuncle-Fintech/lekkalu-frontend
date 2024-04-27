import React, { cloneElement, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addPhysicalAssetTypeSchema } from '@/schema/balance-sheet'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ASSET_CATEGORY_TYPE, getAppropriateAssetsTypeDialog } from '@/utils/balance-sheet'
import { AddPhysicalAssetTypeSchema, PhysicalAsset } from '@/types/balance-sheet'

type Props = {
  trigger: React.ReactElement
  asset?: PhysicalAsset
}

export default function AddOrEditAssetDialog({ trigger, asset }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isEdit = Boolean(asset)

  const form = useForm<AddPhysicalAssetTypeSchema>({
    resolver: zodResolver(addPhysicalAssetTypeSchema),
    defaultValues: {
      type: 'cash',
    },
  })

  const AppropriateAssetDialog = useMemo(() => {
    return getAppropriateAssetsTypeDialog(form.watch('type'))
    // eslint-disable-next-line
  }, [form.watch('type')])

  const assetsInputOptions: InputField[] = useMemo(
    () => [
      {
        id: 'type',
        label: 'Please select assets category',
        type: 'select',
        options: ASSET_CATEGORY_TYPE,
      },
    ],
    [],
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Add'} Asset</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className='gap-4'>
            <div className='md:col-span-2 space-y-2'>
              <div className='flex flex-col my-5 gap-2 w-full'>
                <InputFieldsRenderer control={form.control} inputs={assetsInputOptions} />
              </div>
            </div>

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
              <AppropriateAssetDialog closeModal={() => setIsDialogOpen(false)} trigger={<Button>Next</Button>} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
