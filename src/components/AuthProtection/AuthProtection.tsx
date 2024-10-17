import React from 'react'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { LoaderIcon } from 'lucide-react'
import { useAuthContext } from '@/hooks/use-auth'
import { UserContextProvider } from '@/context/UserContext'
import { User } from '@/types/user'
type Props = {
  children: React.ReactNode
}

export default function AuthProtection({ children }: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  const allowedPages = ['comparisons', 'scenarios']

  const checkAllowedPages = (routeName: string) => {
    const pagename = routeName.split('/')[1]
    return allowedPages.includes(pagename)
  }

  const { isAuthenticationInProgress, tokenData, userData, isLoadingUserData, toggle, isOpen } = useAuthContext()

  if (isAuthenticationInProgress) {
    return (
      <div className='w-full h-screen z-40 flex items-center justify-center gap-2'>
        <LoaderIcon className='w-4 h-4 animate-spin' />
        <div>Authentication in progress...</div>
      </div>
    )
  }

  if (tokenData) {
    return (
      <UserContextProvider
        user={userData as User}
        isLoadingUserData={isLoadingUserData}
        toggleSideBar={toggle}
        isSideBarOpen={isOpen}
      >
        {children}
      </UserContextProvider>
    )
  } else if (!tokenData && checkAllowedPages(location.pathname)) {
    navigate(`/feature${location.pathname}`)
  } else {
    return <Navigate to={{ pathname: '/signin', search: `redirectTo=${location.pathname}` }} />
  }
}
