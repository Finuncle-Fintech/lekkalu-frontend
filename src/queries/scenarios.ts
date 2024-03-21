import { v1ApiClient } from '@/utils/client'
import { Scenario } from '@/types/scenarios'

export async function fetchScenarios() {
  const { data } = await v1ApiClient.get<Scenario[]>('/scenario/')
  return data
}
