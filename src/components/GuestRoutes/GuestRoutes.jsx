import { Context } from 'provider/Provider'
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router'
import { UNPROTECTED_ROUTES } from 'utils/Routes'

export default function GuestRoutes({ component }) {
  const { authToken } = useContext(Context)
  const location = useLocation()

  if (authToken && !UNPROTECTED_ROUTES.includes(location.pathname)) {
    return <Navigate to={'/'} replace />
  }
  return component
}
