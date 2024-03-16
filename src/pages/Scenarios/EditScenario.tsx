import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Page from '@/components/Page/Page'
import PageTitle from '@/components/DetailPageHeading'
import ScenarioForm from './components/Form'
import { AddScenarioSchemas, addScenarioSchemas } from '@/schema/scenarios'

const EditScenario = () => {
  const form = useForm<AddScenarioSchemas>({
    resolver: zodResolver(addScenarioSchemas),
  })

  const handleFormSubmit = (values: AddScenarioSchemas) => {
    console.log('incoming values', values)
  }
  return (
    <Page className='space-y-8'>
      <PageTitle title='Edit this scenario' backUrl='/scenarios' backUrlTitle='Back to Scenarios' />
      <ScenarioForm form={form} isEdit isLoading={false} onSubmit={handleFormSubmit} />
    </Page>
  )
}

export default EditScenario
