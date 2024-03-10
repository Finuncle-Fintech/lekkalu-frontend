import React from 'react'
import Page from '@/components/Page/Page'
import PageTitle from './components/Title'

const EditScenarios = () => {
  return (
    <Page className='space-y-8'>
      <PageTitle title='Edit Scenario' backUrl='/scenarios' backUrlTitle='Back to Scenario' />
    </Page>
  )
}

export default EditScenarios
