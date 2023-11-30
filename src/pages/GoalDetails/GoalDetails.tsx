import React from 'react'
import { TimerIcon } from 'lucide-react'
import Page from '@/components/Page/Page'

export default function GoalDetails() {
  return (
    <Page className='space-y-4'>
      <h1 className='text-2xl font-bold mb-8'>Title of the goal</h1>

      <div className='grid md:grid-cols-2 gap-4'>
        <div className='flex'>
          <div className='flex gap-2 flex-1'>
            <TimerIcon className='w-4 h-4' />
            <div>Observer Field</div>
          </div>
          <div className='flex-1 font-medium'>Interest Rate</div>
        </div>

        <div className='flex'>
          <div className='flex gap-2 flex-1'>
            <TimerIcon className='w-4 h-4' />
            <div>Degree</div>
          </div>
          <div className='flex-1 font-medium'>Higher</div>
        </div>

        <div className='flex'>
          <div className='flex gap-2 flex-1'>
            <TimerIcon className='w-4 h-4' />
            <div>Actual Value</div>
          </div>
          <div className='flex-1 font-medium'>5 %</div>
        </div>
      </div>
    </Page>
  )
}
