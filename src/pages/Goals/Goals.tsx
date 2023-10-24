import React from 'react'
import Page from '@/components/Page/Page'
import GoalsTable from './components/GoalsTable'

export default function Goals() {
  return (
    <Page className='space-y-4'>
      <div className='text-2xl font-bold'>Your financial goals</div>

      <GoalsTable />
    </Page>
  )
}
