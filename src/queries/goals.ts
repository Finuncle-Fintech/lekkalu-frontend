import { AddGoalSchema } from '@/schema/goals'
import { Goal } from '@/types/goals'
import { apiClient } from '@/utils/client'

export async function fetchGoals(params: { page?: number; per_page?: number }) {
  const { data } = await apiClient.get<Goal[]>('financial_goal/', { params })
  return data
}

export async function addGoal(dto: AddGoalSchema) {
  const { data } = await apiClient.post('financial_goal/', dto)
  return data
}

export async function editGoal(id: number, dto: Partial<AddGoalSchema>) {
  const { data } = await apiClient.put(`financial_goal/${id}`, dto)
  return data
}

export async function deleteGoal(id: number) {
  const { data } = await apiClient.delete(`financial_goal/${id}`)
  return data
}
