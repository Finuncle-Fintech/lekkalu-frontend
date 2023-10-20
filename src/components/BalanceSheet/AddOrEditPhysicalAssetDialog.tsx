import React, { cloneElement, useMemo, useState } from 'react'
// import jwt_decode from 'jwt-decode'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { useToast } from '../ui/use-toast'
import { AddPhysicalAssetSchema, addPhysicalAssetSchema } from '@/schema/physical_assets'
import { PHYSICAL_ASSETS_QUERY_KEYS } from '@/utils/query-keys'
import { addPhysicalAsset } from '@/queries/physical_assets'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

type Props = {
  trigger: React.ReactElement
}

// function monthOrYearToSeconds(number: number, isMonth: boolean) {
//   const secondsInMinute = 60
//   const minutesInHour = 60
//   const hoursInDay = 24
//   const daysInMonth = 30.44 // Average number of days in a month
//   const daysInYear = 365.25 // Average number of days in a year

//   if (isMonth) {
//     // Convert the month number to seconds
//     return number * secondsInMinute * minutesInHour * hoursInDay * daysInMonth
//   } else {
//     // Convert the year number to seconds
//     return number * secondsInMinute * minutesInHour * hoursInDay * daysInYear
//   }
// }

export default function AddOrEditPhysicalAssetDialog({ trigger }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<AddPhysicalAssetSchema>({
    resolver: zodResolver(addPhysicalAssetSchema),
    defaultValues: {
      name: '',
      purchase_value: undefined,
      sell_value: undefined,
      purchase_date: undefined,
      sell_date: undefined,
      depreciation_percent: undefined,
      depreciation_frequency: 0,
      init_dep: '0',
      market_value: 0,
      user: 2,
      type: 1,
      tags: [],
    },
  })

  const addPhysicalAssetMutation = useMutation(addPhysicalAsset, {
    onSuccess: () => {
      queryClient.invalidateQueries([PHYSICAL_ASSETS_QUERY_KEYS.PHYSICAL_ASSETS])
      toast({ title: 'Asset created successfully!' })
      setIsDialogOpen(false)
    },
  })

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }))

  const years = Array.from({ length: 40 }, (_, index) => ({
    value: index,
    label: index,
  }))

  const inputs = useMemo(() => {
    return [
      {
        id: 'name',
        label: 'Asset name',
        type: 'text',
      },
      {
        id: 'purchase_value',
        label: 'Purchase value',
        type: 'number',
      },
      {
        id: 'purchase_date',
        label: 'Choose the purchase date',
        type: 'date',
        defaultDate: undefined,
      },
      {
        id: 'sell_value',
        label: 'Sell value(Optional)',
        type: 'number',
      },
      {
        id: 'sell_date',
        label: 'Choose the sell date',
        type: 'date',
        defaultDate: undefined,
      },
      {
        id: 'month',
        label: 'Select month',
        type: 'multi-select',
        options: months?.map((month) => ({ id: month.value, label: month.label })) ?? [],
        valueFormatter: (value) => Number(value),
      },
      {
        id: 'year',
        label: 'Select year',
        type: 'multi-select',
        options: years?.map((year) => ({ id: year.value, label: year.label })) ?? [],
        valueFormatter: (value) => Number(value),
      },
      {
        id: 'init_dep',
        label: 'Choose initial depreciation',
        type: 'number',
      },
      {
        id: 'depreciation_percent',
        label: 'Choose depreciation %',
        type: 'number',
      },
    ] as InputField[]
  }, [])

  console.log(form.formState.errors)

  const handleAddOrEditPhysicalAsset = (values: AddPhysicalAssetSchema) => {
    const newPhysicalAssets = {
      name: values.name,
      purchase_value: values.purchase_value,
      sell_value: values.sell_value,
      purchase_date: values.purchase_date,
      sell_date: values.sell_date,
      depreciation_percent: values.depreciation_percent,
      depreciation_frequency: values.depreciation_frequency,
      init_dep: values.init_dep,
      market_value: values.market_value,
      user: values.user,
      type: values.type,
      tags: values.tags,
    }
    console.log(newPhysicalAssets)
    addPhysicalAssetMutation.mutate(newPhysicalAssets)
  }

  return (
    <>
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
            <DialogTitle>Add Asset</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddOrEditPhysicalAsset)} className='space-y-4'>
              <div className='items-center'>
                <InputFieldsRenderer control={form.control} inputs={inputs} />
              </div>
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
                <Button type='submit' loading={addPhysicalAssetMutation.isLoading}>
                  Add
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
