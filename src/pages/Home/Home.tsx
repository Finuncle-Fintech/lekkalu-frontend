import React, { useEffect } from 'react'
import Lottie from 'lottie-react'
import { ArrowRight } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import homeAnimation from '@/assets/home/home-animation.json'
import Page from '@/components/Page/Page'
import walletAnimation from '@/assets/home/wallet-animation.json'
import targetAnimation from '@/assets/home/target-animation.json'
import growthAnimation from '@/assets/home/growth-animation.json'

const assistanceItems = [
  {
    animation: walletAnimation,
    title: 'Saving more money easily',
    text: 'We can help you save more money and keep you on your toes. By investing your funds, the money you have today can be more useful.',
  },
  {
    animation: targetAnimation,
    title: 'Get your dream target',
    text: 'We can help you save more money and keep you on your toes. By investing your funds, the money you have today can be more useful.',
  },
  {
    animation: growthAnimation,
    title: 'Effective and efficient',
    text: 'We can help you save more money and keep you on your toes. By investing your funds, the money you have today can be more useful.',
  },
]

export default function Home() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const navigate = useNavigate()
  useEffect(() => {
    if (code) {
      navigate('/signin?code=' + code)
    }
  }, [code, navigate])
  return (
    <div>
      <div className='mt-16 h-[90vh] flex items-center justify-center flex-col gap-4 text-center'>
        <Lottie animationData={homeAnimation} />
        <div className='text-4xl font-bold'>
          Managing <span className='bg-primary text-white px-4 rounded-md'>finance</span>
        </div>
        <div className='text-4xl'>the Smarter Way!</div>
      </div>

      <div className='bg-gray-100/80 py-10'>
        <Page className='min-h-max'>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='max-w-md mx-auto'>
              <p className='text-primary text-2xl font-bold'>Why choose us?</p>
              <h1 className='text-6xl font-bold'>
                We are the team <br /> of enthusiasts
              </h1>
            </div>
            <div className='space-y-4 max-w-md mx-auto text-muted-foreground'>
              <p>
                Our technology suite is engineered to support diverse business needs on- demand. Our communal culture,
                performance excellence and private cloud technology paves the way for unprecedented customer support.
              </p>

              <Button>
                <span>Explore</span>
                <ArrowRight className='w-4 h-4 ml-2' />
              </Button>
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-4 mt-20'>
            {assistanceItems.map((item, index) => (
              <div
                key={index}
                className='bg-white relative px-8 py-4 space-y-4 rounded-md shadow-sm border-b-4 border-primary'
              >
                <Lottie animationData={item.animation} className='w-36 h-32' />
                <p className='text-2xl font-bold'>{item.title}</p>
                <p className='text-muted-foreground'>{item.text}</p>
              </div>
            ))}
          </div>
        </Page>
      </div>
    </div>
  )
}
