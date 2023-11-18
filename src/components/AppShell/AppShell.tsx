import React from 'react'
import { Link } from 'react-router-dom'
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

type Props = {
  children: React.ReactNode
}

export default function AppShell({ children }: Props) {
  const { logout, userData } = useAuthContext()

  return (
    <div className='h-screen grid grid-cols-12'>
      <Sidebar className='hidden md:block md:col-span-2' />

      <div className='relative col-span-12 md:col-span-10 overflow-y-auto'>
        <div className='md:justify-end border-b sticky top-0 left-0 h-16 bg-white/50 backdrop-blur-lg w-full z-50 flex items-center justify-between px-4'>
          <div className='text-2xl font-bold md:hidden'>finuncle</div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='hidden md:block'>
                  <UserIcon className='w-5 h-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <When truthy={Boolean(userData?.email)}>
                  <DropdownMenuLabel>{userData?.email}</DropdownMenuLabel>
                </When>

                <DropdownMenuItem className='cursor-pointer' asChild>
                  <Link to='/profile'>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                  <LogOutIcon className='mr-2 h-4 w-4' />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <MobileMenu />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
