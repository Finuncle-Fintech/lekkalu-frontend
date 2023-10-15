import { SignupSchema } from '@/schema/auth'
import { userClient } from '@/utils/client'

export async function signup(dto: Omit<SignupSchema, 'termsAndConditions' | 'privacyPolicy'>) {
  const { data } = await userClient.post<{ email: string; username: string }>('', dto)
  return data
}
