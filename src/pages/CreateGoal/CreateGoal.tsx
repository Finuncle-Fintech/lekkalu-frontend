import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import Page from '@/components/Page/Page'
import { AddGoalSchema, addGoalSchema } from '@/schema/goals'
import { useAuthContext } from '@/hooks/use-auth'
import { Form } from '@/components/ui/form'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { GOAL_INPUTS } from '@/utils/goals'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type GoalType = 'ASSET' | 'LIABILITY'

export default function CreateGoal() {
  const [goalType, setGoalType] = useState<GoalType>('ASSET')
  const { userData } = useAuthContext()

  const form = useForm<AddGoalSchema>({
    resolver: zodResolver(addGoalSchema),
    defaultValues: {
      user: userData?.id ?? 1,
    },
  })

  const handleGoalCreate = (values: AddGoalSchema) => {
    console.log(values)
  }

  return (
    <Page className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold'>Create a new goal</h1>
        <div className='w-full h-[1px] bg-gray-200 my-2' />
      </div>

      <div>
        <div className='text-sm font-medium leading-none mb-2'>Select the type for which you want to create goal</div>
        <Select
          value={goalType}
          onValueChange={(value) => {
            setGoalType(value as GoalType)
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ASSET'>Asset</SelectItem>
            <SelectItem value='LIABILITY'>Liability</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGoalCreate)} className='grid md:grid-cols-2 gap-4'>
          <InputFieldsRenderer control={form.control} inputs={GOAL_INPUTS} />

          <Button type='submit'>
            <PlusCircle className='w-4 h-4 mr-2' />
            <span>Create Goal</span>
          </Button>
        </form>
      </Form>
    </Page>
  )
}
