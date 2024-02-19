import React from 'react'
import dayjs from 'dayjs'
import { PlusCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'
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
  const { incomeExpenses, goalProportionality, getTargetKpi, isFetchingOptions } = useGetSelectOptionsForGoal()

  if (isFetchingOptions) {
    return <></>
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
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
              <FormLabel>Target*</FormLabel>
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
                <FormLabel>Target Date*</FormLabel>
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
              <FormLabel>Source*</FormLabel>
              <FormControl>
                <Select
                  value={field.value?.toString()}
                  onValueChange={field.onChange}
                  disabled={Boolean(!incomeExpenses?.length)}
                >
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
              <div>
                {!incomeExpenses?.length ? (
                  <Link to='/income-statement' className='text-gray-500 text-xs hover:underline'>
                    No Income Expense found. Click here to add.
                  </Link>
                ) : (
                  <></>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='goal_proportionality'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Proportionality*</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={Boolean(!goalProportionality?.length)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Goal Propotionality' />
                  </SelectTrigger>
                  <SelectContent>
                    {goalProportionality?.map((item) => (
                      <SelectItem key={item.id} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <div>
                {!goalProportionality?.length ? (
                  <p className='text-red-500 text-xs'>No goal propotionality found.</p>
                ) : (
                  <></>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='track_kpi'
          render={({ field }) => (
            <FormItem>
              <FormLabel>KPI*</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange} disabled={Boolean(!getTargetKpi?.length)}>
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
              <div>{!getTargetKpi?.length ? <p className='text-red-500 text-xs'>No Target KPI found.</p> : <></>}</div>
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
