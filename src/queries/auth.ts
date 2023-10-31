import { jwtDecode } from 'jwt-decode'
import { LoginSchema, SignupSchema } from '@/schema/auth'
import { tokenClient, userClient } from '@/utils/client'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/constants'
import { getCookie } from '@/utils/cookie'
import { User } from '@/types/user'

export async function signup(dto: Omit<SignupSchema, 'termsAndConditions' | 'privacyPolicy'>) {
  const { data } = await userClient.post<{ email: string; username: string }>('', dto)
  return data
}

export async function login(dto: Omit<LoginSchema, 'rememberMe'>) {
  const { data } = await tokenClient.post<{ access: string; refresh: string }>('/', dto)
  return data
}

export async function refreshToken() {
  const { data } = await tokenClient.post<{ access: string; refresh: string }>('/refresh/', {
    refresh: getCookie(REFRESH_TOKEN_KEY),
  })
  return data
}

export async function fetchUser() {
  const token = getCookie(ACCESS_TOKEN_KEY)
  if (!token) {
    return
  }

  const decodedToken = jwtDecode(token) as { user_id: number }
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const { data } = await userClient.get<User>(`/${decodedToken.user_id}`, { headers })
  return data
}
