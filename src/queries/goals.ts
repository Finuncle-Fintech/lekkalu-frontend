import { Goal } from '@/types/goals'
import { apiClient } from '@/utils/client'

export async function fetchGoals(params: { page?: number; per_page?: number }) {
  const { data } = await apiClient.get<Goal[]>('financial_goal/', { params })
  return data
}
