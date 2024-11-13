import axios from 'axios'
import { gql } from 'graphql-request'
import { EmailVerifyPayloadType, LoginSchema, SignupSchemaNew } from '@/schema/auth'
import { baseUserApiClient, googleClient, registrationClient, tokenClient, userClient } from '@/utils/client'
import { ACCESS_TOKEN_KEY, CSRF_TOKEN, REFRESH_TOKEN_KEY } from '@/utils/constants'
import { getCookie, setCookie } from '@/utils/cookie'
import { User } from '@/types/user'
import { getGraphQLClient } from '@/utils/graphql-client'

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
  setCookie(REFRESH_TOKEN_KEY, data.refresh, 30)
  setCookie(ACCESS_TOKEN_KEY, data.access, 30)
  const csrfToken = await fetchCSRFToken(data.access)
  setCookie(CSRF_TOKEN, csrfToken ?? '', 30)
  const jwtForQL = await fetchJWTForGraphql({
    username: dto.username,
    password: dto.password,
    csrfToken: csrfToken || '',
  })

  console.log('jwt', jwtForQL)

  // New process of login includes
  // get JWT token -> get csrf token using JWT token -> get jwt-ql token using csrf token and jwt token

  setCookie('JWTQL', jwtForQL, 30)

  return { access: data.access, refresh: data.refresh, username: dto.username, password: dto.password }
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

export async function fetchCSRFToken(token?: string) {
  const _token = token ?? getCookie(ACCESS_TOKEN_KEY)
  if (token) {
    const { data } = await baseUserApiClient.get<{ csrfToken: string }>('/csrf/', {
      headers: {
        Authorization: `Bearer ${_token}`,
        'Content-Type': 'application/json',
      },
    })
    return data.csrfToken
  }
}

export async function fetchJWTForGraphql({
  csrfToken,
  username,
  password,
}: {
  csrfToken: string
  username: string
  password: string
}) {
  const doc = gql`
    mutation MyMutation {
      tokenAuth(password: ${password}, username: ${username}){
        token
      }
    }
  `
  const client = getGraphQLClient('POST', csrfToken)
  const data = client.request<string>(doc)
  console.log(data)
  return data
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
