import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import constate from 'constate'
import { useNavigate } from 'react-router'
import { login, refreshToken, signup } from '@/queries/auth'
import { deleteCookie, setCookie } from '@/utils/cookie'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/constants'
import { AUTH } from '@/utils/query-keys'
import { useToast } from '@/components/ui/use-toast'

export function useAuth() {
  const qc = useQueryClient()
  const { toast } = useToast()
  const navigate = useNavigate()

  const {
    isLoading: isAuthenticationInProgress,
    data: tokenData,
    remove: removeTokenData,
  } = useQuery([AUTH.LOGGED_IN], refreshToken, {
    onSuccess: (data) => {
      setCookie(REFRESH_TOKEN_KEY, data.refresh, 30)
      setCookie(ACCESS_TOKEN_KEY, data.access, 30)
    },
  })

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      toast({ title: 'Successfully logged in!' })

      /** Saving the tokens in cookies */
      setCookie(REFRESH_TOKEN_KEY, data.refresh, 30)
      setCookie(ACCESS_TOKEN_KEY, data.access, 30)

      /** updating the data in queryClient */
      qc.setQueryData([AUTH.LOGGED_IN], data)
    },
    onError: () => {
      toast({
        title: 'Invalid Credentials!',
        description: 'You have entered the wrong credentials!',
        variant: 'destructive',
      })
    },
  })

  const signupMutation = useMutation(signup, {
    onSuccess: () => {
      toast({
        title: 'Signup Success!',
        description: 'Your account has been created successfully now you can login to you account!',
      })
      navigate('/signin')
    },
  })

  const logout = useCallback(() => {
    deleteCookie(REFRESH_TOKEN_KEY)
    deleteCookie(ACCESS_TOKEN_KEY)

    removeTokenData()
  }, [removeTokenData])

  return {
    isAuthenticationInProgress,
    tokenData,
    loginMutation,
    logout,
    signupMutation,
  }
}

export const [AuthProvider, useAuthContext] = constate(useAuth)
