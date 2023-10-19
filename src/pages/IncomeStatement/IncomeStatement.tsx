import React from 'react'
import Page from '@/components/Page/Page'
import PercentageCard from './components/PercentageCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import IncomeExpenseTable from './components/IncomeExpenseTable'

export default function IncomeStatement() {
  return (
    <Page className='space-y-4'>
      <div className='text-2xl font-bold'>Income Statement</div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-2'>
        <PercentageCard value={0} title='Salary' />
        <PercentageCard value={0} title='Personal' />
        <PercentageCard value={0} title='Loan Repayment' />
        <PercentageCard value={0} title='Investment' />
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
          <IncomeExpenseTable />
        </TabsContent>
        <TabsContent value='expense'>Expense</TabsContent>
      </Tabs>
    </Page>
  )
}
