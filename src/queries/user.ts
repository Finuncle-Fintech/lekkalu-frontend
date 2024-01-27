import { z } from 'zod'
import { ACCESS_TOKEN_KEY } from '@/utils/constants'
import { getCookie } from '@/utils/cookie'
import { userProfileSchema } from '@/schema/user'
import { userClient } from '@/utils/client'

type UserProfileSchema = z.infer<typeof userProfileSchema>

export async function updateUserDetails(dto: UserProfileSchema) {
  const token = getCookie(ACCESS_TOKEN_KEY)
  if (!token) {
    return
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const { data } = await userClient.put<any>('/detail', dto, { headers })
  return data
}
