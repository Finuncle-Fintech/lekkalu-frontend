import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { CalendarDays } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchMonthlyExpenses } from '@/queries/expense'
import { BUDGET_QUERY_KEYS, EXPENSES } from '@/utils/query-keys'
import { fetchBudgets } from '@/queries/budget'
import { cn } from '@/utils/utils'

const dropdownOptions = [
  {
    name: 'Last 3 Months',
    value: '3',
  },
  {
    name: 'Last 6 Months',
    value: '6',
  },
  {
    name: 'Last Year',
    value: '12',
  },
]
function MonthlyProgressBar({ data }: any) {
  const { budget, month, spent, year } = data
  const present = (spent / budget) * 100

  return (
    <div className='my-[16px] mx-[10px]'>
      <div className='flex justify-between items-center text-center gap-2'>
        <h6 className='text-xs font-semibold capitalize w-16'>
          {dayjs()
            .month(month - 1)
            .format('MMMM')}{' '}
          {year}
        </h6>
        <div className='flex-1'>
          <div className='flex justify-between items-center'>
            <h6 className='text-xs font-medium uppercase text-gray-700'>spent {spent}</h6>
            <h6
              className={`text-xs font-medium uppercase ${present < 80 ? 'text-green-500' : present < 95 ? 'text-amber-500' : 'text-red-500'
                }`}
            >
              {`left ${((Number(budget) || 0) - (Number(spent) || 0)).toFixed(2)
                }`}
            </h6>
          </div>
          <div>
            <ProgressPrimitive.Root
              className={cn('relative h-[10px] w-full overflow-hidden rounded-full my-2 bg-slate-100')}
            >
              <ProgressPrimitive.Indicator
                className={cn(
                  'h-full w-full flex-1 transition-all',
                  present < 80 ? 'bg-green-400' : present < 95 ? 'bg-amber-400' : 'bg-red-400',
                )}
                style={{ transform: `translateX(-${100 - (present || 0)}%)` }}
              />
            </ProgressPrimitive.Root>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BudgetChart() {
  const { data: budgetData } = useQuery([BUDGET_QUERY_KEYS.BUDGETS], fetchBudgets, {
    select: (budgets) => {
      return budgets?.map((budget) => ({
        ...budget,
        month: parseInt(dayjs(budget.month, 'YYYY-MM-DD').format('MM')),
        limit: parseInt(budget.limit),
      }))
    },
  })
  const { data, isLoading } = useQuery([EXPENSES.MONTHLY_EXPENSES], fetchMonthlyExpenses)
  const [timeRange, setTimeRange] = useState('3')
  const currentDate = dayjs()
  const currentMonthYear = currentDate.format('MM')
  const monthlyData = useMemo(() => {
    if (!data || !budgetData) {
      return []
    }
    return data
      ?.map((ele) => ({
        ...ele,
        budget: budgetData?.find((item) => item.month === ele.month)?.limit,
      }))
  }, [data, budgetData, currentMonthYear])

  const currentDate1: Date = new Date(currentDate.format('YYYY-MM-DD'))

  const filteredData = monthlyData.filter((entry) => {
    const monthsDifference: number =
      (currentDate1.getMonth() - entry.month + (currentDate1.getFullYear() - entry.year) * 12 + 12) % 12
    const timeRangeNumber = parseInt(timeRange, 12)
    return monthsDifference < timeRangeNumber
  })

  if (isLoading) {
    return <div className='w-full animate-pulse bg-gray-300 h-96' />
  }
  return (
    <>
      <Card className='w-full rounded-none shadow-none'>
        <div className='mt-3 mx-5 mb-0'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg text-center'>BUDGETS</h3>

            <Select onValueChange={(str) => setTimeRange(str)} value={timeRange}>
              <SelectTrigger className='w-[155px] text-xs focus:ring-transparent max-h-7'>
                <span className='flex items-center'>
                  <CalendarDays className='m-[4px] relative top-[-1px]' size={14} />
                  <SelectValue placeholder='Select' />
                </span>
              </SelectTrigger>
              <SelectContent className='max-h-60'>
                {dropdownOptions.map(({ name, value }) => (
                  <SelectItem value={value} key={`${name}_${value}`} className='text-xs'>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardContent className='pb-0 px-3'>
          {filteredData && filteredData.length > 0 ? (
            filteredData?.map((ele, key) => <MonthlyProgressBar data={ele} key={key} />)
          ) : (
            <h3 className='text-xs text-center my-3'>No Expenses</h3>
          )}
        </CardContent>
      </Card>
    </>
  )
}
