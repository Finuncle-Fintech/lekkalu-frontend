import React from 'react'
import { Link } from 'react-router-dom'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'
import Page from '../Page/Page'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function Footer() {
  return (
    <div className='bg-primary text-white'>
      <Page className='grid md:grid-cols-3 gap-4 p-4 min-h-max'>
        <div>
          <div className='text-xl font-bold mb-4'>About Us</div>
          <div className='flex flex-col gap-2'>
            <Link to='#' className='hover:underline'>
              About Us
            </Link>
            <Link to='#' className='hover:underline'>
              Services
            </Link>
            <Link to='/pricing' className='hover:underline'>
              Pricing
            </Link>
            <Link to='/terms-and-conditions' className='hover:underline'>
              Terms & Conditions
            </Link>
            <Link to='/privacy-policies' className='hover:underline'>
              Privacy Policies
            </Link>
          </div>
        </div>
        <div>
          <div className='text-xl font-bold mb-4'>Calculators</div>
          <div className='flex flex-col gap-2'>
            <Link to='/sip-calculator' className='hover:underline'>
              SIP Calculator
            </Link>
            <Link to='/cagr-calculator' className='hover:underline'>
              CAGR Calculator
            </Link>
            <Link to='/emi-calculator' className='hover:underline'>
              EMI Calculator
            </Link>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <Button variant='secondary'>
              <FacebookIcon className='w-4 h-4 text-primary' />
            </Button>
            <Button variant='secondary'>
              <TwitterIcon className='w-4 h-4 text-primary' />
            </Button>
            <Button variant='secondary'>
              <LinkedinIcon className='w-4 h-4 text-primary' />
            </Button>
            <Button variant='secondary'>
              <InstagramIcon className='w-4 h-4 text-primary' />
            </Button>
          </div>

          <div className='space-y-2'>
            <div>Newsletter</div>
            <Input placeholder='Email' className='text-primary' />
            <Button variant='outline' className='text-primary w-full'>
              Subscribe
            </Button>
          </div>
        </div>
      </Page>
    </div>
  )
}
