import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/utils'
import NavLink from './NavLink'
import { CALCULATOR_ROUTES, ROUTES } from '@/utils/app-shell'

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function Sidebar({ className, ...restProps }: SidebarProps) {
  return (
    <div className={cn('border-r h-full', className)} {...restProps}>
      <div className='space-y-4 py-4 h-full flex flex-col justify-between px-3'>
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

        {/* <DownloadAllData className='w-full' /> */}
      </div>
    </div>
  )
}
