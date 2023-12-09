import { AddGoalSchema } from '@/schema/goals'
import { Goal } from '@/types/goals'
import { v1ApiClient, v2ApiClient } from '@/utils/client'

export async function fetchGoals() {
  const { data } = await v2ApiClient.get<Goal[]>('financial_goal/')
  return data
}

export async function addGoal(dto: AddGoalSchema) {
  const { data } = await v2ApiClient.post('financial_goal/', dto)
  return data
}

export async function editGoal(id: number, dto: Partial<AddGoalSchema>) {
  const { data } = await v1ApiClient.put(`financial_goal/${id}`, dto)
  return data
}

export async function deleteGoal(id: number) {
  const { data } = await v1ApiClient.delete(`financial_goal/${id}`)
  return data
}

export async function getGoalProgress(id: number) {
  const { data } = await v2ApiClient.get(`financial_goal/progress/${id}`)
  return data
}
