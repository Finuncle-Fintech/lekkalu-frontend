import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LedingAccountTable from './components/LedingAccountTable'
import AddOrEditTransaction from './components/AddOrEditTransaction/AddOrEditTransaction'
import LentAndBorrowedChart from './components/LentAndBorrowedChart'
import Page from '@/components/Page/Page'

export default function Lending() {
  return (
    <Page className='space-y-4 min-h-screen'>
      <div className='text-2xl font-bold flex justify-between items-center'>
        <div>Lending and Borrowing</div>
      </div>
      <p className='text-sm'>
        This page helps you keep track of loans and borrowings. You can see who owes you money, how much you owe others,
        and handle your lending accounts. Just use the button to add new loan or borrowing entries, and set up new
        lending accounts.
      </p>
      <div className='flex justify-end'>
        <AddOrEditTransaction
          trigger={
            <Button size='sm'>
              <PlusIcon className='w-4 h-4 mr-2' />
              <span>Add Transaction</span>
            </Button>
          }
        />
      </div>
      <LentAndBorrowedChart />
      <LedingAccountTable />
    </Page>
  )
}
