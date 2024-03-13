import React from 'react'
import { Form } from '@/components/ui/form'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'

const ComparisonForm = ({ form }: any) => {
  const inputs = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      id: 'access',
      label: 'Access',
      type: 'radio',
      options: [
        { id: 'public', label: 'Public' },
        { id: 'private', label: 'Private' },
      ],
    },
  ] as InputField[]
  return (
    <Form {...form}>
      <form onSubmit={() => {}}>
        <div className='flex flex-col gap-y-5'>
          <InputFieldsRenderer control={form.control} inputs={inputs} />
        </div>
      </form>
    </Form>
  )
}

export default ComparisonForm
