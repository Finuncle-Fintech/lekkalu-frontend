import React from 'react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import SetBudgetModal from '@/components/Expenses/components/SetBudgetModal'
import ViewAllBudgetModal from '@/components/Expenses/components/ViewAllBudgetModal'
import { BUDGET_QUERY_KEYS } from '@/utils/query-keys'
import { fetchBudgets } from '@/queries/budget'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import AddExpenseDialog from './components/AddExpenseDialog'

export default function Expenses() {
  const { preferences } = useUserPreferences()
  const { data: budgets } = useQuery([BUDGET_QUERY_KEYS.BUDGETS], fetchBudgets)

  const currentMonthBudget = budgets?.find((item) =>
    dayjs(item.month, 'YYYY-MM-DD').startOf('month').isSame(dayjs().startOf('month')),
  )

  return (
    <div className='max-w-screen-xl mx-auto align-self-start min-h-[80vh] p-4 space-y-4'>
      <div className='border rounded-2 shadow-sm w-100 p-4 flex flex-col gap-2 max-w-md'>
        <div className='text-2xl font-bold'>Budget</div>
        <div className='flex items-center gap-2'>
          <div>{dayjs().format('MMMM')}</div>
          <div className='font-bold'>
            {currentMonthBudget ? `${currentMonthBudget.limit} ${preferences?.currencyUnit}` : 'Not budget set'}
          </div>
        </div>

        <div className='flex items-center gap-2 w-100'>
          <SetBudgetModal />
          <ViewAllBudgetModal />
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <AddExpenseDialog />
      </div>
    </div>
  )
}
