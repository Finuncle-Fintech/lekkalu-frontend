import { gql } from '@apollo/client'
import axios from 'axios'
import { EmailVerifyPayloadType, LoginSchema, SignupSchemaNew } from '@/schema/auth'
import { googleClient, registrationClient, tokenClient, userClient } from '@/utils/client'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/constants'
import { getCookie } from '@/utils/cookie'
import { User } from '@/types/user'
import client from '@/apollo/client'

export async function signup(dto: Omit<SignupSchemaNew, 'termsAndConditions' | 'privacyPolicy'>) {
  const { data } = await axios
    .create({
      baseURL: process.env.REACT_APP_ACCOUNTS_BASE_URL,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
    .post<{ email: string; username: string }>('/dj-rest-auth/registration/', dto)
  return data
}

export async function googleSignup(dto: { code: string }) {
  const { data } = await googleClient.post<{ access: string; refresh: string }>(
    '/users/dj-rest-auth/google/login/',
    dto,
  )
  return data
}

export async function login(dto: Omit<LoginSchema, 'rememberMe'>) {
  const { data } = await tokenClient.post<{ access: string; refresh: string }>('/', dto)
  return data
}

const LOGIN_MUTATION = gql`
  mutation tokenAuthMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

export async function loginGql(dto: Omit<LoginSchema, 'rememberMe'>) {
  const { data } = await client.mutate({
    mutation: LOGIN_MUTATION,
    variables: {
      username: dto.username,
      password: dto.password,
    },
  })
  return data.tokenAuth
}

export async function logout() {
  const { data } = await axios
    .create({
      baseURL: process.env.REACT_APP_ACCOUNTS_BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('access')}`,
      },
    })
    .post<{ email: string; username: string }>('/dj-rest-auth/logout/')
  return data
}

export async function loginImaginaryUser(dto: Omit<LoginSchema, 'rememberMe'> & { id: number }) {
  const { data } = await tokenClient.post<{ access: string; refresh: string }>('/', dto)
  return { ...data, username: dto.username, id: dto.id }
}

export async function refreshToken() {
  if (getCookie(REFRESH_TOKEN_KEY)) {
    const { data } = await tokenClient.post<{ access: string; refresh: string }>('/refresh/', {
      refresh: getCookie(REFRESH_TOKEN_KEY),
    })
    return data
  }
}

export async function fetchUser() {
  const token = getCookie(ACCESS_TOKEN_KEY)
  if (!token) {
    return
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const { data } = await userClient.get<User>('/users/detail', { headers })
  return data
}

export async function deleteUserAccount() {
  const token = getCookie(ACCESS_TOKEN_KEY)
  if (!token) {
    return
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const { data } = await userClient.delete<{ message: string }>('/delete_user_account', { headers })
  return data
}

export async function resendEmail(payload: EmailVerifyPayloadType) {
  const token = getCookie(ACCESS_TOKEN_KEY)
  if (!token) {
    return
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const { data } = await registrationClient.post<{
    message: string
  }>('/users/dj-rest-auth/registration/resend-email/', payload, { headers })
  return data
}
