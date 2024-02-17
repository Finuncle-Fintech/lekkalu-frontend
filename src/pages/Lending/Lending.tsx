import React from 'react'
import { Info, MoveDownLeft, MoveUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LedingAccountTable from './components/LedingAccountTable'
import AddOrEditTransaction from './components/AddOrEditTransaction'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import LentAndBorrowedChart from './components/LentAndBorrowedChart'

export default function Lending() {
  return (
    <div className='max-w-screen-xl mx-auto align-self-start min-h-[80vh] p-4 space-y-4'>
      <div className='text-2xl font-bold flex justify-between items-center'>
        <div>Lending and Borrowing</div>
        <div>
          <Tooltip>
            <TooltipTrigger>
              <Info />
            </TooltipTrigger>
            <TooltipContent>
              <p className='max-w-[320px]'>
                This page allows you to manage lending and borrowing activities. You can track lent amounts, borrowed
                amounts, and manage lending accounts. Use the provided buttons to add new lending or borrowing
                transactions, and create new lending accounts.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 mx-1 sm:mx-5 justify-center items-center gap-5 sm:gap-20'>
        <AddOrEditTransaction
          type='lend'
          trigger={
            <Button
              variant='outline'
              type='button'
              className='py-2 px-4 flex justify-around items-center bg-primary/90 hover:bg-primary focus:ring-primary focus:ring-offset-primary hover:text-white text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[100px] rounded-2xl'
            >
              <div className='flex justify-start items-center gap-5'>
                <div className='text-start'>
                  <h6 className='text-lg'>Lent</h6>
                  <p className='text-xs text-gray-100 font-light'>
                    Invest in others and manage your lending activities.
                  </p>
                </div>
              </div>
              <span className='p-2 ml-4'>
                <MoveUpRight color='white' size={30} />
              </span>
            </Button>
          }
        />
        <AddOrEditTransaction
          type='borrow'
          trigger={
            <Button
              variant='outline'
              type='button'
              className='py-2 px-4 flex justify-around items-center bg-primary/90 hover:bg-primary focus:ring-primary focus:ring-offset-primary text-white hover:text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[100px] rounded-2xl'
            >
              <div className='flex justify-center items-center gap-5'>
                <div className='text-start'>
                  <h6 className='text-lg'>Borrowed</h6>
                  <p className='text-xs text-gray-100 font-light'>Quick and easy access to funds.</p>
                </div>
              </div>
              <span className='p-2 ml-4'>
                <MoveDownLeft color='white' size={30} />
              </span>
            </Button>
          }
        />
      </div>
      <LentAndBorrowedChart />
      <LedingAccountTable />
    </div>
  )
}
