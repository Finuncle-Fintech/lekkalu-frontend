import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import Page from '@/components/Page/Page'
import { AddGoalSchema, addGoalSchema } from '@/schema/goals'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { Button } from '@/components/ui/button'
import { GOAL_INPUTS } from '@/utils/goals'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addGoal } from '@/queries/goals'
import { fetchIncomeExpenses } from '@/queries/income-statement'
import { useToast } from '@/components/ui/use-toast'

export default function CreateGoal() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<AddGoalSchema>({
    resolver: zodResolver(addGoalSchema),
  })

  const incomeExpensesQuery = useQuery([BALANCE_SHEET.LIABILITIES], fetchIncomeExpenses)
  const createGoalMutation = useMutation(addGoal, {
    onSuccess: () => {
      toast({ title: 'Goal created successfully!' })
      navigate('/goals')
    },
  })

  const handleGoalCreate = (values: AddGoalSchema) => {
    createGoalMutation.mutate(values)
  }

  return (
    <Page className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold'>Create a new goal</h1>
        <div className='w-full h-[1px] bg-gray-200 my-2' />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGoalCreate)} className='grid md:grid-cols-2 gap-4 items-center'>
          <InputFieldsRenderer control={form.control} inputs={GOAL_INPUTS} />

          <FormField
            control={form.control}
            name='target_contribution_source'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Contribution Source</FormLabel>
                <FormControl>
                  <Select value={field.value?.toString()} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Target Contribution Source' />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeExpensesQuery?.data?.map((item) => (
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

          <Button type='submit' className='col-span-full w-max' loading={createGoalMutation.isLoading}>
            <PlusCircle className='w-4 h-4 mr-2' />
            <span>Create Goal</span>
          </Button>
        </form>
      </Form>
    </Page>
  )
}
