import React from 'react'
import { Link } from 'react-router-dom'
import NavLink from '../AppShell/components/NavLink'
import MobileMenu from '../AppShell/components/MobileMenu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { useAuthContext } from '@/hooks/use-auth'
import { CALCULATOR_ROUTES } from '@/utils/app-shell'
import { cn } from '@/utils/utils'
import When from '../When/When'
import { buttonVariants } from '../ui/button'

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ title, href }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <NavLink to={href as string} label={title as string} />
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export default function UnAuthenticatedHeader() {
  const { tokenData } = useAuthContext()

  return (
    <div className='w-full bg-primary h-16 text-white fixed top-0 left-0 z-50'>
      <div className='max-w-screen-xl mx-auto hidden md:flex items-center justify-between h-full px-4'>
        <div>
          <div className='relative'>
            <div className='absolute bg-white w-5 h-5 rounded-full -top-4 -left-4' />
            <Link to='/' className='text-xl font-bold'>
              finuncle
            </Link>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='bg-transparent'>Calculators</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[200px] gap-3 p-4 md:w-[250px] md:grid-cols-1'>
                    {CALCULATOR_ROUTES.map((route) => (
                      <ListItem
                        key={route.path}
                        title={route.label}
                        href={route.path}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavLink to='/pricing' label='Pricing' />
          <NavLink to='/support' label='Support' />
        </div>
        <div className='block'>
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
      <div className='border-b sticky top-0 left-0 h-16 backdrop-blur-lg w-full z-50 md:hidden flex items-center justify-between px-4'>
        <div>
          <div className='relative'>
            <div className='absolute bg-white w-5 h-5 rounded-full -top-4 -left-4' />
              <Link to='/' className='text-xl font-bold'>
                finuncle
              </Link>
          </div>
        </div>
        <div>
          <MobileMenu isUnAuthenticatedHeader={true} />
        </div>
      </div>
    </div>
  )
}
