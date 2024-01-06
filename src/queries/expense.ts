import { AddExpenseSchema } from '@/schema/expense'
import { Expense, MonthlyExpense, WeeklyExpense } from '@/types/expense'
import { apiClient, v1ApiClient } from '@/utils/client'

type PageParams = {
  page?: number
  per_page?: number
}
type FetchExpenseBySearchResult = {
  records: Expense[]
  _metadata: {
    page: number
    per_page: number
    page_count: number
    total_count: number
    Links: {
      self?: string
      first?: string
      previous?: string
      next?: string
    }[]
  }
}

export async function fetchExpenses(params?: PageParams) {
  const { data } = await apiClient.get<FetchExpenseBySearchResult>('v1.2/expenses', {
    params: { per_page: params?.per_page ?? 10, page: (params?.page ?? 0) + 1 },
  })
  return data
}

export async function fetchWeeklyExpenses() {
  const { data } = await v1ApiClient.get<WeeklyExpense[]>('/weekly_expenses')
  return data
}

export async function fetchMonthlyExpenses() {
  const { data } = await v1ApiClient.get<MonthlyExpense[]>('/monthly_expenses')
  return data
}

export async function addExpense(dto: Omit<AddExpenseSchema, 'tags'> & { tags: number[] }) {
  const { data } = await v1ApiClient.post<{ data: Expense }>('expenses/', dto)
  return data
}

export async function deleteExpense(id: number) {
  const { data } = await v1ApiClient.delete(`expenses/${id}`)
  return data
}

export async function updateExpense(id: number, dto: Omit<AddExpenseSchema, 'tags'> & { tags: number[] }) {
  const { data } = await v1ApiClient.put(`expenses/${id}`, dto)
  return data
}

export async function fetchExpenseByDate(params: PageParams & { from: string; to: string }) {
  const { data } = await v1ApiClient.get<Expense[]>(`expenses/${params.from}/${params.to}`, {
    params: { per_page: params?.per_page ?? 10, page: (params?.page ?? 0) + 1 },
  })
  return data
}
export const fetchExpenseBySearch: (params: { search: string }) => Promise<FetchExpenseBySearchResult> = async ({
  search,
}) => {
  const { data } = await apiClient.get<FetchExpenseBySearchResult>('v1.2/expenses', {
    params: { search },
  })
  return data
}
