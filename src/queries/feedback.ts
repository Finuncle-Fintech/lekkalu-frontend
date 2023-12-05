import { FeedbackSchema } from '@/schema/feedback'
import { v1ApiClientWithoutToken } from '@/utils/client'

export async function submitFeedback(dto: FeedbackSchema) {
  const { data } = await v1ApiClientWithoutToken.post<{
    id: number
    name: string
    email: string
    subject_and_description: string
  }>('feedback/', dto)
  return data
}
