import React from 'react'
import axios from 'axios'
import { PlusIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AddOrEditIncomeExpenseForScenario from './IncomeExpenses'
import { AddIncomeStatementSchema } from '@/schema/income-statement'

const CreateButton = ({ username }: { username: string }) => {
  const { data: imag_users } = useQuery<object>(['AUTH.IMAGINARY_CLIENT'])
  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_V1_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${imag_users[username].access}`,
    },
  })

  async function createIncomeSource(dto: AddIncomeStatementSchema) {
    const { data } = await apiClient.post('income_source/', dto)
    return data
  }

  async function updateIncomeSource(id: number, dto: AddIncomeStatementSchema) {
    const { data } = await apiClient.put(`income_source/${id}`, dto)
    return data
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='border border-dashed p-20'>
          <PlusIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Button variant={'ghost'}>Asset</Button>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Button variant={'ghost'}>Liability</Button>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <AddOrEditIncomeExpenseForScenario
            trigger={<Button variant={'ghost'}>Income</Button>}
            type='INCOME'
            createMutationFn={createIncomeSource}
            updateMutationFn={updateIncomeSource}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Button variant={'ghost'}>Expense</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CreateButton
