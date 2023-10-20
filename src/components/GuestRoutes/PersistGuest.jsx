import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthContext } from '@/hooks/use-auth'
import { useEffectOnce } from '@/hooks/use-effect-once'

export default function PersistGuest() {
  const { isAuthenticationInProgress, refreshTokenMutation } = useAuthContext()

  useEffectOnce(() => {
    refreshTokenMutation.mutate()
  })

  return <>{isAuthenticationInProgress ? <p className='text-center mt-5'>Loading...</p> : <Outlet />}</>
}
