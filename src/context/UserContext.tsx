import React, { createContext, useState } from 'react'
import { User } from '@/types/user'

type UserContextProviderProps = {
  user: User
  children: React.ReactNode
  isLoadingUserData: boolean
  isSideBarOpen: boolean
  toggleSideBar: () => void
}

type UserContextProps = {
  user: User
  isLoadingUserData: boolean
  isSideBarOpen: boolean
  toggleSideBar: () => void
  setUserData: React.Dispatch<React.SetStateAction<User>>
}

const UserContext = createContext<UserContextProps>({
  user: {} as User,
  isLoadingUserData: false,
  isSideBarOpen: false,
  toggleSideBar: () => {},
  setUserData: () => {},
})

const UserContextProvider = ({ children, user, isLoadingUserData, ...props }: UserContextProviderProps) => {
  const [userData, setUserData] = useState<User>(() => {
    return user
  })

  return (
    <UserContext.Provider value={{ user: userData, setUserData, isLoadingUserData, ...props }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }
