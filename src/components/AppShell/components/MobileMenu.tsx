import React, { useState } from 'react'
import { LogOutIcon, MenuIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/utils/app-shell'
import NavLink from './NavLink'
import When from '@/components/When/When'
import { useAuthContext } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DownloadAllData from '@/components/DownloadAllData/DownloadAllData'

export default function MobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { userData, logout } = useAuthContext()

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <MenuIcon className='w-4 h-4' />
        </Button>
      </SheetTrigger>

      <SheetContent className='h-full '>
        <SheetHeader className='mb-4'>
          <SheetTitle className='text-2xl font-bold text-primary text-center'>finuncle</SheetTitle>
        </SheetHeader>

        <div className='flex flex-col justify-between h-full'>
          <div className='space-y-1 '>
            {ROUTES.map((route) => (
              <NavLink key={route.path} to={route.path} label={route.label} icon={route.icon} />
            ))}
          </div>

          <div className='space-x-2 pb-12'>
            <DownloadAllData />

            <When truthy={Boolean(userData)}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline'>@{userData?.username}</Button>
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
            </When>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
