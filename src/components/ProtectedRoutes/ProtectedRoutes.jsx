import React from 'react'
import { Navigate } from 'react-router-dom'
import DownloadData from '@/components/Download/DownloadData'
import { useAuthContext } from '@/hooks/use-auth'

export const ProtectedRoutes = ({ component }) => {
  const { isAuthenticationInProgress, isAuthenticated } = useAuthContext()

  console.log({ isAuthenticationInProgress, isAuthenticated })

  if (isAuthenticationInProgress) {
    return <p className='text-center mt-5'>Loading...</p>
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />
  }

  return (
    <>
      <DownloadData />
      {component}
    </>
  )
}

export default ProtectedRoutes
