import React from 'react'
import { MoveDownLeft, MoveUpRight, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddOrEditLending from './components/AddOrEditLending'
import LedingAccountTable from './components/LedingAccountTable'
import { fetchLendingAccounts } from '@/queries/lending'
import AddOrEditTransaction from './components/AddOrEditTransaction'

export default function Lending() {
  return (
    <div className='max-w-screen-xl mx-auto align-self-start min-h-[80vh] p-4 space-y-4'>
      <div className='text-2xl font-bold'>Lending and Borrowing</div>
      <div className='grid grid-cols-2 gap-6'>
        <AddOrEditTransaction
          type='lend'
          trigger={
            <Button variant='outline' className='flex flex-col justify-center items-center gap-2 min-h-[120px]'>
              <div>
                <MoveUpRight color='green' size={30} />
              </div>
              Lend
            </Button>
          }
        />
        <AddOrEditTransaction
          type='borrow'
          trigger={
            <Button variant='outline' className='flex flex-col justify-center items-center gap-2 min-h-[120px]'>
              <div>
                <MoveDownLeft color='red' size={30} />
              </div>
              Borrow
            </Button>
          }
        />
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
      <LedingAccountTable queryFn={fetchLendingAccounts} />
    </div>
  )
}
