import React from 'react'
import dayjs from 'dayjs'
import { PlusCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DatePicker from '@/components/DatePicker/DatePicker'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import useGetSelectOptionsForGoal from '../hooks/useGetSelectOptionsForGoal'
import { AddGoalSchema } from '@/schema/goals'

type GoalFormType = {
  form: UseFormReturn<AddGoalSchema>
  onSubmit: (values: AddGoalSchema) => void
  isLoading: boolean
  isEdit?: boolean
}

export default function GoalForm({ form, onSubmit, isLoading, isEdit = false }: GoalFormType) {
  const { incomeExpenses, goalPropotionality, getTargetKpi } = useGetSelectOptionsForGoal()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-4 items-center'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='target_value'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target</FormLabel>
              <FormControl>
                <Input type='number' value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='target_date'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Target</FormLabel>
                <FormControl>
                  <DatePicker
                    onChange={(value) => field.onChange(value?.toString())}
                    value={dayjs(field.value).toDate()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name='target_contribution_source'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Select value={field.value?.toString()} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Source' />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeExpenses?.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
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
          name='goal_proportionality'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Proportionality Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Goal Propotionality Type' />
                  </SelectTrigger>
                  <SelectContent>
                    {goalPropotionality?.map((item) => (
                      <SelectItem key={item.id} value={item.value}>
                        {item.label}
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
          name='track_kpi'
          render={({ field }) => (
            <FormItem>
              <FormLabel>KPI</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='KPI' />
                  </SelectTrigger>
                  <SelectContent>
                    {getTargetKpi?.map((item) => (
                      <SelectItem key={item.id} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='col-span-full w-max' loading={isLoading}>
          <PlusCircle className='w-4 h-4 mr-2' />
          <span>{isEdit ? 'Edit Goal' : 'Add Goal'}</span>
        </Button>
      </form>
    </Form>
  )
}
