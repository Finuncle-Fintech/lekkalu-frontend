import { SetBudgetSchema, UpdateBudgetSchema } from '@/schema/budget'
import { Budget } from '@/types/budget'
import { apiClient } from '@/utils/client'

export async function fetchBudgets() {
  const { data } = await apiClient.get<Budget[]>('/budget')
  return data
}

export async function deleteBudget(id: number) {
  const { data } = await apiClient.delete<{ message: string }>(`/budget/${id}`)
  return data
}

export async function setBudget(dto: SetBudgetSchema) {
  const { data } = await apiClient.post<Budget[]>('/budget/', dto)
  return data
}

export async function updateBudget(id: number, dto: UpdateBudgetSchema) {
  const { data } = await apiClient.put<{ data: Budget }>(`/budget/${id}`, dto)
  return data
}
