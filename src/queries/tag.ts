import { Tag } from '@/types/tag'
import { v1ApiClient } from '@/utils/client'

export async function fetchTags() {
  const { data } = await v1ApiClient.get<Array<Tag>>('expense-tag/')
  return data
}

export async function createTag(dto: { name: string }) {
  const { data } = await v1ApiClient.post<{ data: Tag }>('expense-tag/', dto)
  return data
}
