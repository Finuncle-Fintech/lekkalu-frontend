import React from 'react'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import colors from 'tailwindcss/colors'
import notFoundAnimation from '@/assets/not-found-animation.json'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center w-full h-screen text-center'>
      <div className='space-y-2'>
        <Lottie animationData={notFoundAnimation} className='h-96 text-red-500' color={colors.red['500']} />
        <div className='text-2xl font-bold'>Ohh! Page Not Found</div>
        <p className='text-muted-foreground'>We can&apos;t seem to find the page you&apos;re looking for</p>
        <Link to='/' className={buttonVariants({ variant: 'default' })}>
          Go back to Home
        </Link>
      </div>
    </div>
  )
}
