import Lottie from 'lottie-react'
import React from 'react'
import constructionAnimation from '@/assets/construction-animation.json'
import Page from '../Page/Page'

type Props = {
  title: string
}

export default function UnderImplementation({ title }: Props) {
  return (
    <Page className='w-full h-[90vh] flex items-center justify-center text-center flex-col gap-4'>
      <Lottie animationData={constructionAnimation} className='max-w-2xl' />
      <div className='text-2xl font-bold'>{title} is under implementation!</div>
    </Page>
  )
}
