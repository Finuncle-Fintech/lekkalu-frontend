import React, { useState } from 'react'
import colors from 'tailwindcss/colors'
import { ChevronRight, ChevronLeft, CalendarDays } from 'lucide-react'
import { FetchBudgetAndExpenses } from './api'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ProgressBar from './ProgressBar'

const dropdownOptions = [
  {
    name: 'By Month',
    value: 'month',
  },
  // {
  //   name: 'By Week',
  //   value: 'week',
  // },
]
export default function CardWithForm() {
  const { data: budgetData, isLoading: isBudgetLoading } = FetchBudgetAndExpenses()
  const [page, setPage] = useState(0)
  const [timeRange, setTimeRange] = useState('month')

  if (isBudgetLoading) {
    return
  }
  return (
    <>
      <Card className='w-[100%]'>
        <div style={{ margin: '24px 24px 0px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardTitle>BUDGETS</CardTitle>
            <Select onValueChange={(str) => setTimeRange(str)} value={timeRange}>
              <SelectTrigger className='w-[180px]'>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarDays size={18} style={{ margin: '4px', position: 'relative', top: '-1px' }} />
                  <SelectValue placeholder='Select' />
                </span>
              </SelectTrigger>
              <SelectContent className='max-h-60'>
                {dropdownOptions.map(({ name, value }) => (
                  <SelectItem value={value} key={`${name}_${value}`}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardContent>
          {budgetData!.budgets &&
            budgetData!.budgets.length !== 0 &&
            budgetData!.budgets[page]!.map((budget, index) => {
              return <ProgressBar key={index} data={budget} />
            })}
        </CardContent>
        <CardFooter className='flex justify-between'>
          <p
            style={{
              fontSize: 12,
              // fontWeight: '500',
              textTransform: 'uppercase',
              margin: 0,
              color: '#777',
            }}
          >
            {`${page * 4 + 1} - ${page * 4 + budgetData!.budgets![page].length} of ${budgetData!.totalBudgets} budgets`}
          </p>
          <div className='flex gap-3'>
            <ChevronLeft
              className='h-5 w-5'
              style={{ cursor: 'pointer', color: page > 0 ? colors.gray['700'] : colors.gray['400'] }}
              onClick={() =>
                setPage((oldVal) => {
                  if (oldVal > 0) {
                    return oldVal - 1
                  }
                  return oldVal
                })
              }
            />
            <ChevronRight
              className='h-5 w-5'
              style={{
                cursor: 'pointer',
                color: page < budgetData!.budgets!.length - 1 ? colors.gray['700'] : colors.gray['400'],
              }}
              onClick={() =>
                setPage((oldVal) => {
                  if (oldVal < budgetData!.budgets!.length - 1) {
                    return oldVal + 1
                  }
                  return oldVal
                })
              }
            />
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
