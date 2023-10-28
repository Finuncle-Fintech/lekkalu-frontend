import { SetBudgetSchema, UpdateBudgetSchema } from '@/schema/budget'
import { Budget } from '@/types/budget'
import { v1ApiClient } from '@/utils/client'

export async function fetchBudgets() {
  const { data } = await v1ApiClient.get<Budget[]>('/budget')
  return data
}

export async function deleteBudget(id: number) {
  const { data } = await v1ApiClient.delete<{ message: string }>(`/budget/${id}`)
  return data
}

export async function setBudget(dto: SetBudgetSchema) {
  const { data } = await v1ApiClient.post<Budget[]>('/budget/', dto)
  return data
}

export async function updateBudget(id: number, dto: UpdateBudgetSchema) {
  const { data } = await v1ApiClient.put<{ data: Budget }>(`/budget/${id}`, dto)
  return data
}
