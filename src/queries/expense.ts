import { AddExpenseSchema } from '@/schema/expense'
import { Expense } from '@/types/expense'
import { apiClient } from '@/utils/client'

export async function fetchExpenses() {
  const { data } = await apiClient.get<Expense[]>('expenses/')
  return data
}

export async function addExpense(dto: Omit<AddExpenseSchema, 'tags'> & { tags: number[] }) {
  const { data } = await apiClient.post<{ data: Expense }>('/expenses/', dto)
  return data
}
