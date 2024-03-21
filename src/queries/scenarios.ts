import { v1ApiClient } from '@/utils/client'
import { Scenario } from '@/types/scenarios'
import { AddScenarioSchemas } from '@/schema/scenarios'

export async function fetchScenarios() {
  const { data } = await v1ApiClient.get<Scenario[]>('/scenario/')
  return data
}

export async function createScenarios(dto: AddScenarioSchemas) {
  const { data } = await v1ApiClient.post<Scenario>('/scenario/', dto)
  return data
}
