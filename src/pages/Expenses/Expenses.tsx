import React from 'react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { SkipBackIcon, SkipForwardIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SetBudgetModal from '@/components/Expenses/components/SetBudgetModal'
import ViewAllBudgetModal from '@/components/Expenses/components/ViewAllBudgetModal'
import { BUDGET_QUERY_KEYS, EXPENSES } from '@/utils/query-keys'
import { fetchBudgets } from '@/queries/budget'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import AddExpenseDialog from './components/AddExpenseDialog'
import { fetchExpenses } from '@/queries/expense'
import { Button } from '@/components/ui/button'
import { ExpenseFiltersSchema, expenseFiltersSchema } from '@/schema/expense'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import DatePicker from '@/components/DatePicker/DatePicker'

dayjs.extend(customParseFormat)

export default function Expenses() {
  const { preferences } = useUserPreferences()
  const { data: budgets } = useQuery([BUDGET_QUERY_KEYS.BUDGETS], fetchBudgets)

  const { data: expenses } = useQuery([EXPENSES.EXPENSES], fetchExpenses)
  console.log(expenses)

  const filtersForm = useForm<ExpenseFiltersSchema>({
    resolver: zodResolver(expenseFiltersSchema),
  })

  const currentMonthBudget = budgets?.find((item) =>
    dayjs(item.month, 'YYYY-MM-DD').startOf('month').isSame(dayjs().startOf('month')),
  )

  const handleFilters = (filters: ExpenseFiltersSchema) => {
    console.log(filters)
  }

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

      <div className='text-2xl font-bold my-4 text-center'>Expense List</div>
      <div className='flex justify-between items-center my-2'>
        {/* Pagination */}
        <div className='flex items-center gap-2'>
          <Button size='sm' variant='ghost'>
            <SkipBackIcon className='w-4 h-4' />
          </Button>
          <Button size='sm' variant='ghost'>
            <SkipForwardIcon className='w-4 h-4' />
          </Button>
        </div>

        <Form {...filtersForm}>
          <form onSubmit={filtersForm.handleSubmit(handleFilters)} className='flex  gap-2'>
            <FormField
              control={filtersForm.control}
              name='from'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker placeholder='From' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={filtersForm.control}
              name='to'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker placeholder='to' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>Filter</Button>
            <Button variant='destructive'>Clear</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
