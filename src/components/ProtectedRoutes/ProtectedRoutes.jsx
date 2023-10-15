import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '@/provider/Provider'
import DownloadData from '@/components/Download/DownloadData'

// High order component
export const ProtectedRoutes = ({ component }) => {
  const { authToken } = useContext(Context)

  if (!authToken) {
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
