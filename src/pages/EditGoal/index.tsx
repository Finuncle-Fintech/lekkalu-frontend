import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { ArrowLeftIcon, PlusCircle } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Page from '@/components/Page/Page'
import { editGoalSchema, EditGoalSchema } from '@/schema/goals'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { BALANCE_SHEET, GOALS } from '@/utils/query-keys'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { editGoal, fetchGoalDetails, fetchGoalProportionalityTypes, fetchKPITypes } from '@/queries/goals'
import { fetchIncomeExpenses } from '@/queries/income-statement'
import { useToast } from '@/components/ui/use-toast'
import { Goal } from '@/types/goals'
import { Input } from '@/components/ui/input'
import DatePicker from '@/components/DatePicker/DatePicker'

export default function EditGoal() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const { id } = useParams() as { id: string }
  const goalId = Number(id)

  const incomeExpensesQuery = useQuery([BALANCE_SHEET.LIABILITIES], fetchIncomeExpenses)
  const { data: goal, isLoading: isFetchingGoal } = useQuery(
    [`${GOALS.GOAL}-${goalId}`],
    () => fetchGoalDetails(goalId),
    {
      onError: () => {
        toast({ title: 'Something went wrong.' })
      },
    },
  )
  const editGoalMutation = useMutation((dto: Partial<Goal>) => editGoal(goalId, dto), {
    onSuccess: () => {
      toast({ title: 'Goal edited successfully!' })
      navigate('/goals')
    },
  })

  const goalPropotionalityType = useQuery([GOALS.GOAL_PROPORATIONALITY_TYPES], fetchGoalProportionalityTypes)
  const getTargetKpi = useQuery([GOALS.KPI_TYPES], fetchKPITypes)

  const form = useForm<EditGoalSchema>({
    resolver: zodResolver(editGoalSchema),
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    if (!isFetchingGoal && goal) {
      form.setValue('name', goal?.name)
      form.setValue('target_date', goal?.target_date)
      form.setValue('target_value', goal?.target_value)
      form.setValue('goal_proportionality', goal?.goal_proportionality)
      form.setValue('track_kpi', goal?.track_kpi)
      form.setValue('target_contribution_source', goal?.target_contribution_source)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, isFetchingGoal])

  const handleGoalCreate = (values: EditGoalSchema) => {
    editGoalMutation.mutate(values)
  }

  if (isFetchingGoal) {
    return (
      <div>
        <div className='flex justify-start'>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Page className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold'>{`Edit ${goal?.name}`}</h1>
        <div className='w-full h-[1px] bg-gray-200 my-2' />
      </div>
      <div>
        <Link className='flex w-[150px] items-center gap-2 text-muted-foreground' to='/goals'>
          <ArrowLeftIcon className='w-4 h-4' />
          Back to Goals
        </Link>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGoalCreate)} className='grid md:grid-cols-2 gap-4 items-center'>
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
                      onChange={(value) => field.onChange(value?.toISOString().substring(0, 10))}
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
                      {goalPropotionalityType?.data?.map((item) => (
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
                      {getTargetKpi?.data?.map((item) => (
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

          <Button type='submit' className='col-span-full w-max' loading={editGoalMutation.isLoading}>
            <PlusCircle className='w-4 h-4 mr-2' />
            <span>Edit Goal</span>
          </Button>
        </form>
      </Form>
    </Page>
  )
}
