import React from 'react'
import { Link } from 'react-router-dom'
import When from '../When/When'
import { useAuthContext } from '@/hooks/use-auth'
import { cn } from '@/utils/utils'
import { buttonVariants } from '../ui/button'
import { CALCULATOR_ROUTES } from '@/utils/app-shell'
import NavLink from '../AppShell/components/NavLink'

export default function UnAuthenticatedHeader() {
  const { tokenData } = useAuthContext()

  return (
    <div className='w-full bg-primary h-16 text-white fixed top-0 left-0 z-50'>
      <div className='max-w-screen-xl mx-auto flex items-center justify-between h-full px-4'>
        <div>
          <div className='relative'>
            <div className='absolute bg-white w-5 h-5 rounded-full -top-4 -left-4' />
            <Link to='/' className='text-xl font-bold'>
              finuncle
            </Link>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {CALCULATOR_ROUTES.map((route) => (
            <NavLink key={route.path} to={route.path} label={route.label} />
          ))}
          <NavLink to='/pricing' label='Pricing' />
          <NavLink to='/support' label='Support' />
        </div>
        <When
          truthy={Boolean(tokenData)}
          fallback={
            <div className='space-x-2'>
              <Link to='/signin' className={cn(buttonVariants({ variant: 'outline' }), 'bg-transparent')}>
                Signin
              </Link>

              <Link to='/signup' className={cn(buttonVariants({ variant: 'secondary' }))}>
                Signup
              </Link>
            </div>
          }
        >
          <Link to='/dashboard' className={cn(buttonVariants({ variant: 'secondary' }))}>
            Dashboard
          </Link>
        </When>
      </div>
    </div>
  )
}
