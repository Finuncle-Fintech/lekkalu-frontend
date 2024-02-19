import React from 'react'
import { Link } from 'react-router-dom'
import { LogOutIcon } from 'lucide-react'
import { cn } from '@/utils/utils'
import NavLink from './NavLink'
import { CALCULATOR_ROUTES, ROUTES } from '@/utils/app-shell'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import DownloadAllData from '@/components/DownloadAllData/DownloadAllData'
import { useAuthContext } from '@/hooks/use-auth'

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function Sidebar({ className, ...restProps }: SidebarProps) {
  const { logout, userData } = useAuthContext()
  return (
    <div className={cn('border-r h-full', className)} {...restProps}>
      <div className='space-y-4 py-4 h-full flex flex-col justify-between px-3 '>
        <div>
          <Link className='text-center text-2xl font-bold text-primary block' to='/dashboard'>
            finuncle
          </Link>

          <div className='space-y-1 py-2'>
            {ROUTES.map((route) => (
              <NavLink key={route.path} to={route.path} label={route.label} icon={route.icon} />
            ))}
          </div>

          <div className='mt-4'>Calculators</div>
          <div className='space-y-1 py-2'>
            {CALCULATOR_ROUTES.map((route) => (
              <NavLink key={route.path} to={route.path} label={route.label} icon={route.icon} />
            ))}
          </div>
        </div>

        <div>
          <DownloadAllData className='w-full mb-2' />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className=' w-full border-[1px] border-[#000] bg-white text-[#000] hover:border-[#0f4b8f] hover:text-[#fff]'>
                <i className="fa-solid fa-link" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className='cursor-pointer' asChild>
                <Link to='/profile' className=' font-[600]'>{userData?.username}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                <LogOutIcon className='mr-2 h-4 w-4' />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
