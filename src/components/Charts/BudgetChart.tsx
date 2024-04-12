import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { BoxIcon, CalendarDays } from 'lucide-react'
import { round } from 'lodash'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchMonthlyExpenses } from '@/queries/expense'
import { BUDGET_QUERY_KEYS, EXPENSES } from '@/utils/query-keys'
import { fetchBudgets } from '@/queries/budget'
import { Progress } from '../ui/progress'
import { cn } from '@/utils/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { formatIndianMoneyNotation } from '@/utils/format-money'

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

export default function BudgetChart() {
  const { data: budgetData } = useQuery([BUDGET_QUERY_KEYS.BUDGETS], fetchBudgets, {
    select: (budgets) => {
      return budgets.map((budget) => ({
        ...budget,
        month: parseInt(dayjs(budget.month, 'YYYY-MM-DD').format('MM')),
        limit: parseInt(budget.limit),
      }))
    },
  })

  const { data, isLoading } = useQuery([EXPENSES.MONTHLY_EXPENSES], fetchMonthlyExpenses)
  const [timeRange, setTimeRange] = useState('3')
  const monthlyData = useMemo(() => {
    if (!data || !budgetData) {
      return []
    }

    return data
      ?.map((ele) => ({ ...ele, budget: budgetData?.find((item) => item.month === ele.month)?.limit ?? 0 }))
      .sort((a, b) => {
        if (a.year !== b.year) {
          return b.year - a.year
        } else {
          return b.month - a.month
        }
      })
      .slice(0, parseInt(timeRange))
  }, [data, budgetData, timeRange])

  if (isLoading) {
    return <div className='w-full animate-pulse bg-gray-300 h-96 rounded-md' />
  }

  return (
    <Card className='shadow-sm p-2'>
      <CardHeader className='flex justify-between w-full flex-row'>
        <div>
          <CardTitle>Budgets</CardTitle>
          <CardDescription>Summary of your expenses against your budgets</CardDescription>
        </div>

        <Select onValueChange={(str) => setTimeRange(str)} value={timeRange}>
          <SelectTrigger className='w-52'>
            <CalendarDays className='w-4 h-4' />
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent className='max-h-60'>
            {dropdownOptions.map(({ name, value }) => (
              <SelectItem value={value} key={`${name}_${value}`}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {monthlyData && monthlyData.length > 0 ? (
          monthlyData?.map((ele, key) => <MonthlyProgressBar data={ele} key={key} />)
        ) : (
          <div className='w-full h-full flex items-center justify-center flex-col'>
            <BoxIcon className='w-8 h-8 text-muted-foreground' />
            <h3 className='text-muted-foreground'>No Budgets found</h3>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MonthlyProgressBar({
  data,
}: {
  data: {
    budget: number
    year: number
    month: number
    spent: number
    balance: number
    cum_sum: number
  }
}) {
  const { preferences } = useUserPreferences()
  const currency = preferences.currencyUnit
  const { budget, month, spent, year } = data
  const percentage = round((spent / budget) * 100, 2)
  const leftAmount = round(budget - spent, 2)

  return (
    <div className='flex justify-between items-center text-center gap-2'>
      <div className='text-xs font-semibold w-16 text-right'>
        {dayjs()
          .month(month - 1)
          .format('MMM')}{' '}
        {year}
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='flex-1 cursor-pointer'>
              <div className='flex justify-between items-center'>
                <h6 className='text-xs font-medium uppercase text-gray-700'>
                  spent {formatIndianMoneyNotation(spent, 2)}
                </h6>
                <h6
                  className={cn(
                    'text-xs font-medium uppercase pb-1',
                    percentage < 80 ? 'text-green-500' : percentage < 95 ? 'text-amber-500' : 'text-red-500',
                  )}
                >
                  {budget
                    ? leftAmount < 0
                      ? `Exceeded ${formatIndianMoneyNotation(Math.abs(leftAmount))}`
                      : `left ${formatIndianMoneyNotation(leftAmount)}`
                    : 'budget not set'}
                </h6>
              </div>

              <Progress
                value={percentage}
                className='h-[10px]  mb-2 bg-slate-100'
                indicatorClassName={percentage < 80 ? 'bg-green-400' : percentage < 95 ? 'bg-amber-400' : 'bg-red-400'}
              />
            </div>
          </TooltipTrigger>
          {budget ? (
            <TooltipContent className='text-left'>
              <div>
                Budget : {currency}
                {budget}
              </div>
              <div>
                Spent : {currency}
                {spent}
              </div>
              <div>
                {leftAmount < 0
                  ? `Exceeded : ${currency}
                ${Math.abs(leftAmount)}`
                  : `Left : ${currency}
                ${leftAmount}`}
              </div>
              <div>Spent % over Budget : {percentage}%</div>
            </TooltipContent>
          ) : null}
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
