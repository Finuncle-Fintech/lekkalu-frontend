import { FeedbackSchema } from '@/schema/feedback'
import { v1ApiClient } from '@/utils/client'

export async function submitFeedback(dto: FeedbackSchema) {
  const { data } = await v1ApiClient.post<{
    id: number
    name: string
    email: string
    subject_and_description: string
  }>('feedback/', dto)
  return data
}
