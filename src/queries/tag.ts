import { apiClient } from '@/utils/client'

export async function fetchTags() {
  const { data } = await apiClient.get<Array<{ id: number; name: string }>>('/expense-tag/')
  return data
}
