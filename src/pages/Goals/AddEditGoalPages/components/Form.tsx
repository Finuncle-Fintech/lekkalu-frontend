import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { InfoIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Step, StepItem, Stepper } from '@/components/ui/stepper'
import DatePicker from '@/components/DatePicker/DatePicker'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import useGetSelectOptionsForGoal from '../hooks/useGetSelectOptionsForGoal'
import { AddGoalSchema } from '@/schema/goals'
import { StepFooter } from './StepperFooter'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

type GoalFormType = {
  form: UseFormReturn<AddGoalSchema>
  onSubmit: (values: AddGoalSchema) => void
  isLoading: boolean
  isEdit?: boolean
}

const steps = [{ id: '1' }, { id: '2' }] satisfies StepItem[]

export default function GoalForm({ form, onSubmit, isLoading, isEdit = false }: GoalFormType) {
  const { incomeExpenses, goalProportionality, getTargetKpi, isFetchingOptions, totalExpenses } =
    useGetSelectOptionsForGoal()

  const kpi_value = form.watch('track_kpi')

  const [multiplyTargetBy, setMultiplyTargetBy] = useState(6)
  const [suggestedTargetValue, setSuggestedTargetValue] = useState<number>()

  useEffect(() => {
    if (totalExpenses) {
      setSuggestedTargetValue(totalExpenses * multiplyTargetBy)
    }
  }, [kpi_value, multiplyTargetBy, totalExpenses])

  const setSuggestedTargetValueInForm = () => {
    form.setValue('target_value', Number(suggestedTargetValue))
  }

  if (isFetchingOptions) {
    return <></>
  }

  return (
    <div className='border p-5 shadow my-5 rounded'>
      <Form {...form}>
        <form>
          <Stepper initialStep={0} steps={steps}>
            {steps.map((props) => {
              switch (props.id) {
                case '1':
                  return (
                    <Step>
                      <div className='grid sm:grid-cols-2 gap-4 px-2 my-5'>
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
                                <Select
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  disabled={Boolean(!getTargetKpi?.length)}
                                >
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
                              <div>
                                {!getTargetKpi?.length ? (
                                  <p className='text-red-500 text-xs'>No Target KPI found.</p>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Step>
                  )
                case '2':
                  return (
                    <Step>
                      <div className='grid sm:grid-cols-2 gap-4 p-5'>
                        <FormField
                          control={form.control}
                          name='target_value'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target*</FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  value={field.value}
                                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
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

                        {kpi_value === 'Cash' ? (
                          <div>
                            <div className='flex justify-between'>
                              <label className='text-sm font-medium'>x months of expenses</label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className='cursor-pointer'>
                                    <InfoIcon className='w-4 h-4' />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Set your cash goal target to meet 3-6 months of living expenses
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <div className='relative flex'>
                              <Input
                                type='number'
                                className='mt-2'
                                defaultValue={6}
                                value={multiplyTargetBy}
                                onChange={(event) => setMultiplyTargetBy(Number(event?.target?.value))}
                                min={1}
                              />
                            </div>
                            <div className='flex mt-2 justify-between lg:justify-start'>
                              <p className='text-sm text-gray-500 self-center'>
                                Suggested target is: {suggestedTargetValue?.toLocaleString()}
                              </p>
                              <Button
                                type='button'
                                variant={'link'}
                                className='p-0 h-fit ml-5 min-w-fit'
                                onClick={setSuggestedTargetValueInForm}
                              >
                                Set target
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Step>
                  )
                default:
                  return <></>
              }
            })}
            <StepFooter
              isEdit={isEdit}
              values={form.watch()}
              handleCreate={form.handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </Stepper>
        </form>
      </Form>
    </div>
  )
}
