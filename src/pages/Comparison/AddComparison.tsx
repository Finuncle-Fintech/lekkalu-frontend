import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Page from '@/components/Page/Page'
import PageTitle from './components/PageTitle'
import { AddComaprisonSchema, addComparisonSchema } from '@/schema/comparisons'
import ComparisonForm from './components/Form'

const AddComparison = () => {
  const form = useForm<AddComaprisonSchema>({
    resolver: zodResolver(addComparisonSchema),
  })
  return (
    <Page className='space-y-8'>
      <PageTitle title='Create a comparison' backUrl='/comparisons' backUrlTitle='Back to Comparisons' />
      <ComparisonForm form={form} />
    </Page>
  )
}

export default AddComparison
