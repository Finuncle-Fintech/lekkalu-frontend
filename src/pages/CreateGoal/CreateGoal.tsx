import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import Page from '@/components/Page/Page'
import { AddGoalSchema, addGoalSchema } from '@/schema/goals'
import { useAuthContext } from '@/hooks/use-auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { CATEGORY_CALCULATION_MAP, GOAL_CATEGORIES, GOAL_INPUTS, GoalCategories } from '@/utils/goals'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CreateGoal() {
  const [goalCategory, setGoalCategory] = useState<GoalCategories>('ASSET_QUALITY')
  const { userData } = useAuthContext()

  const form = useForm<AddGoalSchema>({
    resolver: zodResolver(addGoalSchema),
    defaultValues: {
      user: userData?.id ?? 1,
      category: goalCategory,
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGoalCreate)} className='grid md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='category'
            render={() => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={goalCategory}
                    onValueChange={(value) => {
                      setGoalCategory(value as GoalCategories)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {GOAL_CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='calculationField'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calculation Field</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a calculation field!' />
                    </SelectTrigger>

                    <SelectContent className='max-h-72'>
                      {CATEGORY_CALCULATION_MAP[goalCategory].map((calculation) => (
                        <SelectItem key={calculation.id} value={calculation.id}>
                          {calculation.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <InputFieldsRenderer control={form.control} inputs={GOAL_INPUTS} />

          <Button type='submit' className='col-span-full w-max'>
            <PlusCircle className='w-4 h-4 mr-2' />
            <span>Create Goal</span>
          </Button>
        </form>
      </Form>
    </Page>
  )
}
