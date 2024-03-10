import React from 'react'
import Page from '@/components/Page/Page'
import PageTitle from './components/Title'

const AddScenarios = () => {
  return (
    <Page className='space-y-8'>
      <PageTitle title='Create a Scenario' backUrl='/scenarios' backUrlTitle='Back to Scenario' />
    </Page>
  )
}

export default AddScenarios
