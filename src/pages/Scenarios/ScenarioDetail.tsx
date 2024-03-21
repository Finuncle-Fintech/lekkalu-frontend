import React from 'react'
import Page from '@/components/Page/Page'
import DetailPageHeading from '@/components/DetailPageHeading'
import { Button } from '@/components/ui/button'

export default function ScenarioDefault() {
  return (
    <Page className='space-y-8'>
      <DetailPageHeading backUrl='/scenarios' backUrlTitle='Back to scenarios' title={'Loading...'} />
      <h6>Some description about the Scenario which helps user to find the motivation behind it.</h6>
      <div>
        <div className='flex justify-between'>
          <h2 className='text-xl self-center'>Assets & Liabilities</h2>
          <Button variant={'link'}>Create Assets</Button>
        </div>
        <div>
          <p>Table here</p>
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <h2 className='text-xl self-center'>Income Expenses</h2>
          <Button variant={'link'}>Create Income Expenses</Button>
        </div>
        <div>
          <p>Table here</p>
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <h2 className='text-xl self-center'>Lending Transactions</h2>
          <Button variant={'link'}>Create Lending Transcations</Button>
        </div>
        <div>
          <p>Table here</p>
        </div>
      </div>
    </Page>
  )
}
