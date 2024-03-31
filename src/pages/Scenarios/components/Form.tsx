import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { PlusCircle } from 'lucide-react'
import { AddScenarioSchemas } from '@/schema/scenarios'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'

type ScenarioFormType = {
  form: UseFormReturn<AddScenarioSchemas>
  onSubmit: (values: AddScenarioSchemas) => void
  isLoading: boolean
  isEdit?: boolean
}

const ScenarioForm = ({ form, onSubmit, isLoading, isEdit = false }: ScenarioFormType) => {
  const inputs = [
    { id: 'name', label: 'Name', type: 'text' },
    {
      id: 'access',
      label: 'Access',
      type: 'radio',
      options: [
        { id: 'Public', label: 'Public' },
        { id: 'Private', label: 'Private' },
      ],
    },
  ] as InputField[]
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-1 gap-4'>
          <InputFieldsRenderer control={form.control} inputs={inputs} />
          <Button type='submit' className='col-span-full w-max' loading={isLoading}>
            <PlusCircle className='w-4 h-4 mr-2' />
            <span>{isEdit ? 'Edit Scenario' : 'Add Scenario'}</span>
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ScenarioForm
