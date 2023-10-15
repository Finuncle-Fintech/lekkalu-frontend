import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '@/provider/Provider'

export const HeroRoute = ({ component }) => {
  const { authToken } = useContext(Context)

  if (authToken) {
    return <Navigate to='/home' replace />
  }

  return component
}

export default HeroRoute
