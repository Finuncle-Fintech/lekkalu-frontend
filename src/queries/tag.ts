import { Tag } from '@/types/tag'
import { apiClient } from '@/utils/client'

export async function fetchTags() {
  const { data } = await apiClient.get<Array<Tag>>('/expense-tag/')
  return data
}

export async function createTag(dto: { name: string }) {
  const { data } = await apiClient.post<{ data: Tag }>('expense-tag/', dto)
  return data
}
