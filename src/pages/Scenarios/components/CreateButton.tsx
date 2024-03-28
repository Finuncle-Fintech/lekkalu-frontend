import React from 'react'
import { PlusIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AddOrEditIncomeExpenseForScenario from './IncomeExpenses'
import { AddIncomeStatementSchema } from '@/schema/income-statement'
import { useImaginaryAuth } from '../context/use-imaginaryAuth'
import { AUTH, BALANCE_SHEET, INCOME_STATEMENT } from '@/utils/query-keys'
import { IncomeStatement } from '@/types/income-statement'
import EachIncomeExpenseForScenario from './IncomeExpenses/EachExpense'
import AddOrEditLiabilityDialog from './Liability/AddorEditLiabilityDialog'
import { AddLiabilitySchema } from '@/schema/balance-sheet'
import { Liability } from '@/types/balance-sheet'
import EachLiabilityForScenario from './Liability/EachLiabilityForScenario'

const CreateButton = ({ username }: { username: string }) => {
  const { data: imaginaryUser } = useQuery<any>([AUTH.IMAGINARY_CLIENT])
  const { getAPIClientForImaginaryUser } = useImaginaryAuth()

  const apiClient = getAPIClientForImaginaryUser(imaginaryUser[username]?.access)

  async function createIncomeExpense(dto: AddIncomeStatementSchema) {
    const { data } = await apiClient.post('income_expense/', dto)
    return data
  }

  async function updateIncomeExpense(id: number, dto: Partial<AddIncomeStatementSchema>) {
    const { data } = await apiClient.put(`income_expense/${id}`, dto)
    return data
  }

  async function fetchIncomeExpenses() {
    const { data } = await apiClient.get<Array<IncomeStatement & { isNew: boolean }>>('income_expense/')
    return data
  }

  async function deleteIncomeExpense(id: number) {
    const { data } = await apiClient.delete(`income_expense/${id}`)
    return data
  }

  async function fetchLiabilities() {
    const { data } = await apiClient.get<Liability[]>('loans/')
    return data
  }

  async function addLiability(dto: AddLiabilitySchema) {
    const { data } = await apiClient.post('loans/', dto)
    return data
  }

  async function editLiability(id: number, dto: Partial<AddLiabilitySchema>) {
    const { data } = await apiClient.put(`loans/${id}`, dto)
    return data
  }

  async function deleteLiability(id: number) {
    const { data } = await apiClient.delete(`loans/${id}`)
    return data
  }

  const { data: expenses } = useQuery([`${INCOME_STATEMENT.IS_EXPENSES}-${username}`], fetchIncomeExpenses)
  const { data: liabilities } = useQuery([`${BALANCE_SHEET.LIABILITIES}-${username}`], fetchLiabilities)

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
      {expenses?.map((each: IncomeStatement) => (
        <EachIncomeExpenseForScenario
          incomeExpense={each}
          createIncomeExpense={createIncomeExpense}
          updateIncomeExpense={updateIncomeExpense}
          deleteIncomeExpense={deleteIncomeExpense}
          key={each?.id}
        />
      ))}
      {liabilities?.map((each: Liability) => (
        <EachLiabilityForScenario
          liability={each}
          key={each?.id}
          addLiability={addLiability}
          editLiability={editLiability}
          deleteLiability={deleteLiability}
        />
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} className='border border-dashed rounded-lg p-20'>
            <PlusIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='flex flex-col'>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Button variant={'ghost'}>Asset</Button>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <AddOrEditLiabilityDialog
              trigger={<Button variant={'ghost'}>Liability</Button>}
              addLiability={addLiability}
              editLiability={editLiability}
            />
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <AddOrEditIncomeExpenseForScenario
              trigger={<Button variant={'ghost'}>Monthly Expense</Button>}
              type='EXPENSE'
              createMutationFn={createIncomeExpense}
              updateMutationFn={updateIncomeExpense}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CreateButton