import React from 'react'
import { Sidebar } from './components/Sidebar'
import MobileMenu from './components/MobileMenu'

type Props = {
  children: React.ReactNode
}

export default function AppShell({ children }: Props) {
  return (
    <div className='h-screen grid grid-cols-12'>
      <Sidebar className='hidden md:block md:col-span-2' />

      <div className='relative col-span-12 md:col-span-10 overflow-y-auto'>
        <div className='border-b sticky top-0 left-0 h-16 bg-white/50 backdrop-blur-lg w-full z-50 md:hidden flex items-center justify-between px-4'>
          <div className='text-2xl font-bold'>finuncle</div>
          <div>
            <MobileMenu />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
