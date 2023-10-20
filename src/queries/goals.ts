// import { SetBudgetSchema, UpdateBudgetSchema } from 'schema/budget'
import { GoalDataInterface } from 'components/Goals/GoalsInterfaces'
import { GoalsType } from 'types/goals'
import { apiClient, createPaginatedAPIClient } from 'utils/client'

export async function fetchGoals(page:number, rows:number) {
  const { data } = await createPaginatedAPIClient(page, rows).get<GoalsType[]>('/financial_goal')
  return data
}

export async function deleteGoal(id: number) {
  const { data } = await apiClient.delete<{ message: string }>(`/v1/financial_goal/${id}`)
  return data
}

export async function setGoal(goal: GoalDataInterface) {
  const { data } = await apiClient.post<GoalsType[]>('/v1/financial_goal', goal)
  return data
}

export async function updateGoal(goal: GoalsType) {
  if (!goal.id) return

  const { data } = await apiClient.put<{ data: GoalsType }>(`/financial_goal/${goal.id}`, goal)
  return data
}
