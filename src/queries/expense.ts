import { AddExpenseSchema } from '@/schema/expense'
import { Expense } from '@/types/expense'
import { apiClient } from '@/utils/client'

type PageParams = {
  page?: number
  per_page?: number
}

export async function fetchExpenses(params?: PageParams) {
  const { data } = await apiClient.get<Expense[]>('expenses/', {
    params: { per_page: params?.per_page ?? 10, page: (params?.page ?? 0) + 1 },
  })
  return data
}

export async function addExpense(dto: Omit<AddExpenseSchema, 'tags'> & { tags: number[] }) {
  const { data } = await apiClient.post<{ data: Expense }>('expenses/', dto)
  return data
}

export async function deleteExpense(id: number) {
  const { data } = await apiClient.delete(`expenses/${id}`)
  return data
}

export async function updateExpense(id: number, dto: Omit<AddExpenseSchema, 'tags'> & { tags: number[] }) {
  const { data } = await apiClient.put(`expenses/${id}`, dto)
  return data
}

export async function fetchExpenseByDate(params: PageParams & { from: string; to: string }) {
  const { data } = await apiClient.get<Expense[]>(`expenses/${params.from}/${params.to}`, {
    params: { per_page: params?.per_page ?? 10, page: (params?.page ?? 0) + 1 },
  })
  return data
}
