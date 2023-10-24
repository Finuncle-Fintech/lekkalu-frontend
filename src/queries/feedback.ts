import { FeedbackSchema } from '@/schema/feedback'
import { apiClient } from '@/utils/client'

export async function submitFeedback(dto: FeedbackSchema) {
  const { data } = await apiClient.post<{
    id: number
    name: string
    email: string
    subject_and_description: string
  }>('feedback/', dto)
  return data
}
