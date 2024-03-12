import React from 'react'
import Page from '@/components/Page/Page'
import PageTitle from './components/Title'

const ComparisonDetail = () => {
  return (
    <Page className='space-y-8'>
      <PageTitle
        backUrl='/comparisons'
        backUrlTitle='Back to comparisons'
        title='Comparison name here'
        key={'comparison id here'}
      />
      <div>
        <p>List of scenarios here</p>
        <p>And a button to add scenarios to this comparison</p>
      </div>
    </Page>
  )
}

export default ComparisonDetail
