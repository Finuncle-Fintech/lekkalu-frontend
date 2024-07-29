import React, { useState } from 'react'
import { MoreVerticalIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { IncomeStatement } from '@/types/income-statement'
import { AddIncomeStateSchemaForScenario } from '@/schema/income-statement'
import AddOrEditIncomeExpenseForScenario from '.'
import DeleteIncomeExpense from './DeleteIncomeExpense'
import { formatIndianMoneyNotation } from '@/utils/format-money'
import ViewScenarioEntity from '../ViewScenarioEntity'

type EachIncomeForScenarioType = {
  incomeExpense: IncomeStatement
  createIncomeExpense: (dto: any) => Promise<any>
  updateIncomeExpense: (id: number, dto: Partial<AddIncomeStateSchemaForScenario>) => Promise<any>
  deleteIncomeExpense: (id: number) => Promise<any>
  IS_AUTHENTICATED_USER?: boolean
}

const EachIncomeExpenseForScenario = ({
  incomeExpense,
  createIncomeExpense,
  updateIncomeExpense,
  deleteIncomeExpense,
  IS_AUTHENTICATED_USER,
}: EachIncomeForScenarioType) => {
  const [viewDetail, setViewDetail] = useState(false)

  const handleViewDetail = () => {
    setViewDetail(true)
  }

  return (
    <>
      <div className={'border flex flex-col rounded-lg bg-blue-500 min-h-[150px] min-w-[190px] cursor-pointer'}>
        <div className='flex justify-between'>
          <p className='p-2 text-white text-xs'>Expense</p>
          {IS_AUTHENTICATED_USER && (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'ghost'} className='hover:bg-blue-600'>
                    <MoreVerticalIcon className='text-white' size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='flex flex-col'>
                  <DropdownMenuItem asChild>
                    <AddOrEditIncomeExpenseForScenario
                      trigger={<Button variant={'ghost'}>Edit</Button>}
                      type='EXPENSE'
                      incomeStatement={incomeExpense}
                      createMutationFn={createIncomeExpense}
                      updateMutationFn={updateIncomeExpense}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DeleteIncomeExpense id={incomeExpense.id} deleteIncomeExpense={deleteIncomeExpense} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <div className='flex flex-col items-center text-white' onClick={handleViewDetail}>
          <p>{formatIndianMoneyNotation(incomeExpense.amount)}</p>
          <p className='mt-5'>{incomeExpense.name}</p>
        </div>
      </div>
      <ViewScenarioEntity data={incomeExpense} isOpen={viewDetail} setIsOpen={setViewDetail} entityType='Expense' />
    </>
  )
}

export default EachIncomeExpenseForScenario
