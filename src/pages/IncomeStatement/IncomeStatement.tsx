import React, { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { round } from 'lodash'
import Page from '@/components/Page/Page'
import PercentageCard from './components/PercentageCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import IncomeExpenseTable from './components/IncomeExpenseTable'
import {
  createIncomeExpense,
  createIncomeSource,
  deleteIncomeExpense,
  deleteIncomeSource,
  fetchIncomeExpenses,
  fetchIncomeSources,
  updateIncomeExpense,
  updateIncomeSource,
} from '@/queries/income-statement'
import { INCOME_STATEMENT } from '@/utils/query-keys'

export default function IncomeStatement() {
  const { data: incomeSources } = useQuery([INCOME_STATEMENT.SOURCES], fetchIncomeSources)
  const { data: incomeExpenses } = useQuery([INCOME_STATEMENT.EXPENSES], fetchIncomeExpenses)

  const stats = useMemo(() => {
    if (!incomeSources || !incomeExpenses) {
      return {}
    }

    const totalExpenses = incomeExpenses.reduce((acc, curr) => (acc += Number(curr.amount)), 0)
    const totalSources = incomeSources.reduce((acc, curr) => (acc += Number(curr.amount)), 0)

    const personalTotal = incomeExpenses.reduce(
      (acc, curr) => (acc += curr.type === 'Personal' ? Number(curr.amount) : 0),
      0,
    )
    const loanRepaymentTotal = incomeExpenses.reduce(
      (acc, curr) => (acc += curr.type === 'Loan_repayment' ? Number(curr.amount) : 0),
      0,
    )

    const investmentTotal = incomeExpenses.reduce(
      (acc, curr) => (acc += curr.type === 'Investment' ? Number(curr.amount) : 0),
      0,
    )

    const salaryTotal = incomeSources.reduce(
      (acc, curr) => (acc += curr.type === 'Salary' ? Number(curr.amount) : 0),
      0,
    )

    const personalPercentage = round((personalTotal / totalExpenses) * 100, 2)
    const loanRepaymentPercentage = round((loanRepaymentTotal / totalExpenses) * 100, 2)
    const investmentPercentage = round((investmentTotal / totalExpenses) * 100, 2)
    const salaryPercentage = round((salaryTotal / totalSources) * 100, 2)

    return {
      personalPercentage,
      loanRepaymentPercentage,
      investmentPercentage,
      salaryPercentage,
    }
  }, [incomeExpenses, incomeSources])

  return (
    <Page className='space-y-4'>
      <div className='text-2xl font-bold'>Income Statement</div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2'>
        <PercentageCard value={stats?.salaryPercentage ?? 0} title='Salary' />
        <PercentageCard value={stats?.personalPercentage ?? 0} title='Personal' />
        <PercentageCard value={stats?.loanRepaymentPercentage ?? 0} title='Loan Repayment' />
        <PercentageCard value={stats?.investmentPercentage ?? 0} title='Investment' />
      </div>

      <Tabs defaultValue='income'>
        <TabsList className='w-full'>
          <TabsTrigger value='income' className='w-full data-[state=active]:bg-primary data-[state=active]:text-white'>
            Income
          </TabsTrigger>
          <TabsTrigger value='expense' className='w-full data-[state=active]:bg-primary data-[state=active]:text-white'>
            Expense
          </TabsTrigger>
        </TabsList>

        <TabsContent value='income'>
          <IncomeExpenseTable
            type='INCOME'
            queryFn={fetchIncomeSources}
            createMutationFn={createIncomeSource}
            updateMutationFn={updateIncomeSource}
            deleteMutationFn={deleteIncomeSource}
          />
        </TabsContent>
        <TabsContent value='expense'>
          <IncomeExpenseTable
            type='EXPENSE'
            queryFn={fetchIncomeExpenses}
            createMutationFn={createIncomeExpense}
            updateMutationFn={updateIncomeExpense}
            deleteMutationFn={deleteIncomeExpense}
          />
        </TabsContent>
      </Tabs>
    </Page>
  )
}
