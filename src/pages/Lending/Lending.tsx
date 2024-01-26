import React from 'react'
import { MoveDownLeft, MoveUpRight, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddOrEditLending from './components/AddOrEditLending'
import LedingTransactionTable from './components/LedingTransactionTable'
import { fetchLendingAccounts } from '@/queries/lending'

export default function Lending() {
  return (
    <div className='max-w-screen-xl mx-auto align-self-start min-h-[80vh] p-4 space-y-4'>
      <div className='text-2xl font-bold'>Lending and Borrowing</div>
      <div className='grid grid-cols-2 gap-6'>
        <Button variant='outline' className='flex flex-col justify-center items-center gap-2 min-h-[120px]'>
          <div>
            <MoveUpRight color='green' size={30} />
          </div>
          Lend
        </Button>
        <Button variant='outline' className='flex flex-col justify-center items-center gap-2 min-h-[120px]'>
          <div>
            <MoveDownLeft color='red' size={30} />
          </div>
          Borrow
        </Button>
      </div>
      <div className='flex justify-end'>
        <AddOrEditLending
          trigger={
            <Button size='sm'>
              <PlusIcon className='w-4 h-4 mr-2' />
              <span>Create account</span>
            </Button>
          }
        />
      </div>
      <LedingTransactionTable queryFn={fetchLendingAccounts} />
      {/* <IncomeExpenseTable
        type='INCOME'
        queryFn={fetchIncomeSources}
        createMutationFn={createIncomeSource}
        updateMutationFn={updateIncomeSource}
        deleteMutationFn={deleteIncomeSource}
      /> */}
    </div>
  )
}
