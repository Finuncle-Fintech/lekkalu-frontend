import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { cloneElement, useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import {
  AddPhysicalAssetSchema,
  AddPhysicalAssetTypePhysicalSchema,
  addPhysicalAssetTypePhysicalSchema,
} from '@/schema/balance-sheet'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { addPhysicalAsset, editPhysicalAsset } from '@/queries/balance-sheet'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PhysicalAsset } from '@/types/balance-sheet'
import { getErrorMessage } from '@/utils/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ASSET_MONTHS, ASSET_YEARS } from '@/utils/balance-sheet'

type Props = {
  trigger: React.ReactElement
  asset?: PhysicalAsset
}

export default function AddOrEditAssetsPhysical({ trigger, asset }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [type, setType] = useState<'depreciation' | 'apprecitaion'>('depreciation')
  const { toast } = useToast()
  const qc = useQueryClient()
  const isEdit = Boolean(asset)

  const getProperSchema = (type: 'depreciation' | 'apprecitaion') => {
    if (type === 'depreciation') {
      return addPhysicalAssetTypePhysicalSchema.extend({
        months: z.string({ required_error: 'Months is required!' }),
        years: z.string({ required_error: 'Years is required!' }),
      })
    }
    return addPhysicalAssetTypePhysicalSchema
  }

  const form = useForm<AddPhysicalAssetTypePhysicalSchema>({
    resolver: zodResolver(getProperSchema(type)),
    mode: 'onChange',
    defaultValues: {
      name: undefined,
      purchase_date: new Date(),
      purchase_value: undefined,
      percentage_value: undefined,
      type: 'depreciation',
    },
  })

  useEffect(() => {
    setType(form.watch('type'))
    // eslint-disable-next-line
  }, [form.watch('type')])

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

  const handleAddOrEditPhysicalAsset = (values: AddPhysicalAssetTypePhysicalSchema) => {
    console.log('Submitting Values', values)
    const type = values.type
    const depreciation_percent_per_year = type === 'depreciation' ? values.percentage_value : -values.percentage_value
    console.log(depreciation_percent_per_year)
    //  1   "name": "hardik",
    //   1  "purchase_value": null,
    //   1  "purchase_date": null,
    //     "depreciation_percent_per_year": "0.000000",
    //     "init_dep": null,
    //     "type": 1,
    //     "depreciation_percent": "-10.000000",
    //     "depreciation_frequency": 31536000,
    //     "market_value": null
  }

  const assetsInputOptionsCash = useMemo(
    () =>
      [
        {
          id: 'name',
          label: 'Name',
          type: 'text',
        },
        {
          id: 'purchase_date',
          label: 'Purchase Date',
          type: 'date',
        },
        {
          id: 'purchase_value',
          label: 'Purchase Value',
          type: 'number',
        },
        {
          id: 'percentage_value',
          label: 'Percentage Value',
          type: 'number',
        },
        {
          id: 'type',
          label: '',
          type: 'select',
          options: [
            {
              label: 'Depreciation',
              id: 'depreciation',
              value: 'Depreciation',
            },
            {
              label: 'Apprecitaion',
              id: 'apprecitaion',
              value: 'Apprecitaion',
            },
          ],
        },
      ] as InputField[],
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
      <DialogContent className='max-h-[800px] overflow-auto'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit' : 'Add'} Physical Asset</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddOrEditPhysicalAsset)} className='gap-4'>
            <div className='md:col-span-2 space-y-2'>
              <div className='flex flex-col my-5 gap-2 w-full'>
                <InputFieldsRenderer control={form.control} inputs={assetsInputOptionsCash} />

                {type === 'depreciation' && (
                  <div className='md:col-span-2 space-y-2'>
                    <FormLabel>Depreciation Frequency</FormLabel>
                    <div className='flex gap-2 w-full'>
                      <FormField
                        control={form.control}
                        name='months'
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel>Months</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} {...field} value={field.value?.toString()}>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select Months' />
                                </SelectTrigger>
                                <SelectContent className='max-h-72'>
                                  {ASSET_MONTHS.map(({ id, label }) => (
                                    <SelectItem value={id} key={id}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='years'
                        render={({ field }) => (
                          <FormItem className='flex-1'>
                            <FormLabel>Years</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} {...field} value={field.value?.toString()}>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select Years' />
                                </SelectTrigger>
                                <SelectContent className='max-h-72'>
                                  {ASSET_YEARS.map(({ id, label }) => (
                                    <SelectItem value={id} key={id}>
                                      {label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className='gap-2 md:col-span-2'>
              <Button
                loading={addPhysicalAssetMutation.isLoading || editPhysicalAssetMutation.isLoading}
                type='button'
                variant='outline'
                onClick={() => {
                  setIsDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type='submit' loading={addPhysicalAssetMutation.isLoading || editPhysicalAssetMutation.isLoading}>
                {isEdit ? 'Edit' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
