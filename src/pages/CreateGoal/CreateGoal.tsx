import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import Page from '@/components/Page/Page'
import { AddGoalSchema, addGoalSchema } from '@/schema/goals'
import { useAuthContext } from '@/hooks/use-auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { GOAL_INPUTS } from '@/utils/goals'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { fetchLiabilities, fetchPhysicalAssets } from '@/queries/balance-sheet'
import When from '@/components/When/When'

type GoalType = 'ASSET' | 'LIABILITY'

export default function CreateGoal() {
  const [goalType, setGoalType] = useState<GoalType>('ASSET')
  const { userData } = useAuthContext()

  const { data: assets } = useQuery([BALANCE_SHEET.ASSETS], fetchPhysicalAssets, { enabled: goalType === 'ASSET' })
  const { data: liabilities } = useQuery([BALANCE_SHEET.LIABILITIES], fetchLiabilities, {
    enabled: goalType === 'LIABILITY',
  })

  const form = useForm<AddGoalSchema>({
    resolver: zodResolver(
      addGoalSchema.extend({
        ...(goalType === 'ASSET'
          ? {
              asset: z.coerce.number({
                required_error: 'Please select an asset for which you want to create goal!',
                invalid_type_error: 'Please select an asset for which you want to create goal!',
              }),
            }
          : {
              liability: z.coerce.number({
                required_error: 'Please select a liability for which you want to create goal!',
                invalid_type_error: 'Please select a liability for which you want to create goal!',
              }),
            }),
      }),
    ),
    defaultValues: {
      user: userData?.id ?? 1,
    },
  })

  const handleGoalCreate = (values: AddGoalSchema) => {
    console.log(values)
  }

  return (
    <Page className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold'>Create a new goal</h1>
        <div className='w-full h-[1px] bg-gray-200 my-2' />
      </div>

      <div>
        <div className='text-sm font-medium leading-none mb-2'>Select the type for which you want to create goal</div>
        <Select
          value={goalType}
          onValueChange={(value) => {
            form.reset()
            setGoalType(value as GoalType)
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ASSET'>Asset</SelectItem>
            <SelectItem value='LIABILITY'>Liability</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGoalCreate)} className='grid md:grid-cols-2 gap-4'>
          <When truthy={goalType === 'ASSET' && Boolean(assets?.length)}>
            <FormField
              control={form.control}
              name='asset'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset</FormLabel>
                  <FormControl>
                    <Select {...field} value={field.value?.toString()} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select an asset' />
                      </SelectTrigger>

                      <SelectContent className='max-h-72'>
                        {assets?.map((asset) => (
                          <SelectItem key={asset.id} value={asset.id.toString()}>
                            {asset.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </When>

          <When truthy={goalType === 'LIABILITY' && Boolean(liabilities?.length)}>
            <FormField
              control={form.control}
              name='liability'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liability</FormLabel>
                  <FormControl>
                    <Select {...field} value={field.value?.toString()} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a liability' />
                      </SelectTrigger>

                      <SelectContent className='max-h-72'>
                        {liabilities?.map((liability) => (
                          <SelectItem key={liability.id} value={liability.id.toString()}>
                            {liability.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </When>

          <InputFieldsRenderer control={form.control} inputs={GOAL_INPUTS} />

          <Button type='submit' className='col-span-full w-max'>
            <PlusCircle className='w-4 h-4 mr-2' />
            <span>Create Goal</span>
          </Button>
        </form>
      </Form>
    </Page>
  )
}
