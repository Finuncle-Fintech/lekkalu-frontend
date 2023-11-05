import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import When from '../When/When'
import { useAuthContext } from '@/hooks/use-auth'
import { cn } from '@/utils/utils'
import { buttonVariants } from '../ui/button'
import { CALCULATOR_ROUTES } from '@/utils/app-shell'
import NavLink from '../AppShell/components/NavLink'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
        <div className='hidden md:flex items-center gap-2'>
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
        {
      isMobileMenuOpen &&
      <div className='flex md:hidden items-center flex-col gap-2 fixed top-16 left-0 right-0 overflow-y-auto bg-primary h-full justify-start p-[5rem] text-black'>
          <div>
            <div className='flex flex-col justify-center items-center bg-white w-72  sm:w-96'>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem className='bg-white' value="item-1">
                  <AccordionTrigger className='justify-center hover:decoration-transparent decoration-transparent border-b-0'>Calculators</AccordionTrigger>
                  {CALCULATOR_ROUTES.map((route) => (
                      <AccordionContent onClick={handleMobileMenuToggle} key={route.path}>
                        <NavLink twClass='justify-center' to={route.path} label={route.label} />
                      </AccordionContent>
                    ))}
                </AccordionItem>
              </Accordion>
              <div onClick={handleMobileMenuToggle} className='border-t w-full p-1'>
                <NavLink twClass='justify-center' to='/pricing' label='Pricing' />
              </div>
              <div onClick={handleMobileMenuToggle} className='border-t w-full p-1'>
                <NavLink twClass='justify-center' to='/support' label='Support' />
              </div>
            </div>
            <div className='md:hidden mt-2 justify-center items-center flex'>
              <When
                truthy={Boolean(tokenData)}
                fallback={
                  <div className='space-x-2 flex w-full'>
                    <Link onClick={handleMobileMenuToggle} to='/signin' className={cn(buttonVariants({ variant: 'outline' }), 'bg-transparent', 'text-white w-full')}>
                      Signin
                    </Link>

                    <Link onClick={handleMobileMenuToggle} to='/signup' className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}>
                      Signup
                    </Link>
                  </div>
                }
              >
                <Link onClick={handleMobileMenuToggle} to='/dashboard' className={cn(buttonVariants({ variant: 'secondary' }))}>
                  Dashboard
                </Link>
              </When>
            </div>
          </div>
        </div>
        }
        <div className='hidden md:block'>
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
         {/* Hamburger icon for mobile menu */}
         <div className='md:hidden' onClick={handleMobileMenuToggle}>
          <div className='w-6 h-6 cursor-pointer'>
            {
              isMobileMenuOpen ? <AiOutlineClose size={20}/> : <GiHamburgerMenu size={20}/>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
