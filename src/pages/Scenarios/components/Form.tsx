import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { PlusCircle } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { AddScenarioSchemas } from '@/schema/scenarios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useGetScenarioOptions } from '../hooks/useGetScenarioOptions'

type ScenarioFormType = {
  form: UseFormReturn<AddScenarioSchemas>
  onSubmit: (values: AddScenarioSchemas) => void
  isLoading: boolean
  isEdit?: boolean
}

const ScenarioForm = ({ form, onSubmit, isLoading, isEdit = false }: ScenarioFormType) => {
  const { assests, liabilities, income } = useGetScenarioOptions()
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='assets'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assets*</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
                    // disabled={Boolean(!incomeExpenses?.length)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Assets' />
                    </SelectTrigger>
                    <SelectContent>
                      {assests?.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
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
            name='liabilities'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liabilities*</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
                    // disabled={Boolean(!incomeExpenses?.length)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Liability' />
                    </SelectTrigger>
                    <SelectContent>
                      {liabilities?.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
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
            name='income'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Income*</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
                    // disabled={Boolean(!incomeExpenses?.length)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Income' />
                    </SelectTrigger>
                    <SelectContent>
                      {income?.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
