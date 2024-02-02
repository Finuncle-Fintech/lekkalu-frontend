import React from 'react'
import { Link } from 'react-router-dom'
import { icons } from 'lucide-react'
import Page from '../Page/Page'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FeedbackForm from './Components/FeedbackForm'
import SocialIcon from './Components/SocialIcons'
import IosIcon from '@/assets/icons/iosIcon'
import AndroidIcon from '@/assets/icons/androidIcon'

const TwitterIcon = icons.Twitter
const LinkedInIcon = icons.Linkedin
const YoutubeIcon = icons.Youtube

export default function Footer() {
  return (
    <div className='bg-primary text-white relative'>
      <FeedbackForm />

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
            <SocialIcon
              Icon={<YoutubeIcon size={18} />}
              link='https://www.youtube.com/channel/UC3FN66Kic3nEdp5nfOe3T6A'
            />
            <SocialIcon Icon={<IosIcon size={18} />} link='https://apps.apple.com/in/app/finuncle/id6475839395' />
            <SocialIcon
              Icon={<AndroidIcon size={18} />}
              link='https://play.google.com/store/apps/details?id=com.lekkalu.finuncle&pcampaignid=web_share'
            />
            <SocialIcon Icon={<TwitterIcon size={18} />} link='https://twitter.com/FinuncleX' />
            <SocialIcon Icon={<LinkedInIcon size={18} />} link='https://linkedin.com/company/finuncle' />
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
