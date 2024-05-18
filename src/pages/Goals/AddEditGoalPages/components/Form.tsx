import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { UseFormReturn } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Step, StepItem, Stepper } from '@/components/ui/stepper'
import DatePicker from '@/components/DatePicker/DatePicker'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import useGetSelectOptionsForGoal from '../hooks/useGetSelectOptionsForGoal'
import { AddGoalSchema } from '@/schema/goals'
import { StepFooter } from './StepperFooter'
import { TooltipForGoals } from '../../components/Tooltip'
import { FormLabelForGoalForm } from '../../components/FormLabel'

type GoalFormType = {
  form: UseFormReturn<AddGoalSchema>
  onSubmit: (values: AddGoalSchema) => void
  isLoading: boolean
  isEdit?: boolean
  isError: boolean
}

const steps = [{ id: '1' }, { id: '2' }] satisfies StepItem[]

export default function GoalForm({ form, onSubmit, isLoading, isError, isEdit = false }: GoalFormType) {
  const { incomeExpenses, goalProportionality, getTargetKpi, isFetchingOptions, totalExpenses } =
    useGetSelectOptionsForGoal()

  const kpi_value = form.watch('track_kpi')

  const [multiplyTargetBy, setMultiplyTargetBy] = useState(6)

  useEffect(() => {
    if (!isEdit && kpi_value === 'Cash' && totalExpenses) {
      form.setValue('target_value', totalExpenses * multiplyTargetBy)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalExpenses, kpi_value])

  useEffect(() => {
    if (kpi_value === 'Cash') {
      form.setValue('target_value', Number(totalExpenses) * multiplyTargetBy)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplyTargetBy])

  if (isFetchingOptions) {
    return (
      <div>
        <p>Loading, please wait...</p>
      </div>
    )
  }

  return (
    <div>
      <Form {...form}>
        <form>
          <Stepper initialStep={0} steps={steps}>
            {steps.map((props) => {
              switch (props.id) {
                case '1':
                  return (
                    <Step>
                      <div>
                        <p className='mt-5'>Step 1: Basic Information about goal.</p>
                      </div>
                      <div className='grid sm:grid-cols-1 gap-4 px-2 my-5'>
                        <FormField
                          control={form.control}
                          name='name'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <div className='flex gap-2'>
                                  <p className='self-center'>Name*</p>
                                  <TooltipForGoals iconSize={'small'}>
                                    <div>Name of the goal</div>
                                  </TooltipForGoals>
                                </div>
                              </FormLabel>
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
                                <FormLabelForGoalForm
                                  required
                                  label='Target Date'
                                  info='Set Target date for this goal'
                                />
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
                              <FormLabelForGoalForm required info='Placeholder for now' label='Goal Proportionality' />
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
                              <FormLabelForGoalForm required info='Placeholder for now' label='KPI' />
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
                      <div>
                        <p className='mt-5'>Step 2: Set target for this goal.</p>
                      </div>
                      <div className='grid sm:grid-cols-1 gap-4 p-5'>
                        <FormField
                          control={form.control}
                          name='target_value'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabelForGoalForm required info='Placeholder for now' label='Target' />
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
                              <FormLabelForGoalForm required={false} info='Placeholder for now' label='Source' />
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
                          <>
                            <div>
                              <div className='flex justify-start'>
                                <FormLabelForGoalForm
                                  label='x months of expenses'
                                  info='Set your cash goal target to meet 3-6 months of living expenses'
                                />
                              </div>
                              <div className='flex gap-x-5 mt-3'>
                                <Input
                                  type='number'
                                  className='w-20 self-center'
                                  value={multiplyTargetBy}
                                  onChange={(event) => {
                                    const value = Number(event?.target?.value)
                                    setMultiplyTargetBy(value)
                                  }}
                                  min={1}
                                />
                              </div>
                              <div className='flex mt-2 justify-between lg:justify-start'>
                                <p className='text-xs text-gray-500 self-center'>
                                  Set a cash target to meet x months of expenses
                                </p>
                              </div>
                            </div>
                          </>
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
              isError={isError}
            />
          </Stepper>
        </form>
      </Form>
    </div>
  )
}
