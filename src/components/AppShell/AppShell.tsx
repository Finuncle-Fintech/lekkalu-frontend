import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogOutIcon, UserIcon } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import MobileMenu from './components/MobileMenu'
import { useAuthContext } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import When from '../When/When'
import NotificationPopover from '@/components/NotificationPopover'

type Props = {
  children: React.ReactNode
}

export default function AppShell({ children }: Props) {
  const { logout, userData } = useAuthContext()
  const location = useLocation()
  const greeting = () => {
    const currentHour = new Date().getHours()
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning'
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }

  return (
    <>
      <div className='md:justify-end border-b sticky top-0 left-0 h-16 bg-white/50 backdrop-blur-lg w-full z-50 flex items-center justify-between px-4'>
        <Link className='text-center text-2xl font-bold text-primary block me-10' to='/dashboard'>
          finuncle
        </Link>
        <div className='capitalize text-[1] mr-auto max-md:hidden'>
          <span>
            {greeting()}{' '}
            <span className='font-bold text-primary'>
              {userData && (userData.first_name ? userData.first_name : userData.username)}
            </span>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <NotificationPopover />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='hidden md:block'>
                <UserIcon className='w-5 h-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <When truthy={Boolean(userData?.username)}>
                <DropdownMenuLabel>{userData?.username}</DropdownMenuLabel>
              </When>

              {location.pathname !== '/profile' && (
                <DropdownMenuItem className='cursor-pointer' asChild>
                  <Link to='/profile'>Profile</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                <LogOutIcon className='mr-2 h-4 w-4' />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <MobileMenu />
        </div>
      </div>
      <div style={{ height: 'calc(100vh - 64px)' }} className='flex border-collapse overflow-hidden'>
        <Sidebar className='hidden md:block' />
        <main id='layout' className='flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 pb-1'>
          {children}
        </main>
      </div>
    </>
  )
}
