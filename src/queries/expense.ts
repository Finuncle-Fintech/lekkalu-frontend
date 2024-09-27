import { AddExpenseSchema } from '@/schema/expense'
import { Expense, MonthlyExpense, WeeklyExpense } from '@/types/expense'
import { apiClient, v1ApiClient } from '@/utils/client'

type PageParams = {
  page?: number
  per_page?: number
  search?: string
  from?: string
  to?: string
  date_range_enabled?: boolean
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
  let expense_url = 'v1.2/expenses/'
  if (params?.date_range_enabled) {
    expense_url += `${params?.from}/${params?.to}`
  }
  const { data } = await apiClient.get<FetchExpenseBySearchResult>(expense_url, {
    params: {
      per_page: params?.per_page ?? 10,
      page: (params?.page ?? 0) + 1,
      search: params?.search,
    },
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
