import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuthContext } from '@/hooks/use-auth'

type Props = {
  children: React.ReactNode
}

export default function AuthProtection({ children }: Props) {
  const location = useLocation()
  const { tokenData } = useAuthContext()

  if (tokenData) {
    return children
  }

  return <Navigate to={{ pathname: '/signin', search: `redirectTo=${location.pathname}` }} />
}
