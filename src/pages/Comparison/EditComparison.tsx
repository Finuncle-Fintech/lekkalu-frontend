import React from 'react'
import Page from '@/components/Page/Page'
import PageTitle from './components/Title'

const EditComparison = () => {
  return (
    <Page className='space-y-8'>
      <PageTitle title='Edit Comparisons' backUrl='/comparisons' backUrlTitle='Back to Comparisons' />
    </Page>
  )
}

export default EditComparison
