/* eslint-disable @typescript-eslint/no-unused-vars */
import constate from 'constate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { login, loginImaginaryUser } from '@/queries/auth'

type ImaginaryUser = {
  [key: string]: { refresh: string; access: string }
}

export function useImaginaryAuth() {
  const qc = useQueryClient()
  const [imaginaryUsers, setImaginaryUsers] = useState<ImaginaryUser>({})
  const { data: imag_users } = useQuery(['AUTH.IMAGINARY_CLIENT'])

  const loginImaginaryUserMutation = useMutation(loginImaginaryUser, {
    onSuccess: (data) => {
      qc.setQueryData(['AUTH.IMAGINARY_CLIENT'], {
        ...(imag_users as unknown as object),
        [data?.username]: { access: data?.access, refresh: data?.refresh },
      })
    },
  })
  return {
    imaginaryUsers,
    setImaginaryUsers,
    loginImaginaryUser: loginImaginaryUserMutation,
  }
}

export const [ImaginaryAuthProvider, useImaginaryContext] = constate(useImaginaryAuth)
