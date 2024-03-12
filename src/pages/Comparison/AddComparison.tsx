import React from 'react'
import Page from '@/components/Page/Page'
import PageTitle from './components/Title'

const AddComparison = () => {
  return (
    <Page className='space-y-8'>
      <PageTitle title='Create a comparison' backUrl='/comparisons' backUrlTitle='Back to Comparisons' />
    </Page>
  )
}

export default AddComparison
