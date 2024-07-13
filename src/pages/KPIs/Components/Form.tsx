import React from 'react'
import { PlusCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddCustomKPISchema } from '@/schema/custom_kpi'

type CustomKPIFormType = {
  form: UseFormReturn<AddCustomKPISchema>
  onSubmit: (values: AddCustomKPISchema) => void
  isLoading: boolean
  isEdit?: boolean
}

export default function CustomKPIForm({ form, onSubmit, isLoading, isEdit = false }: CustomKPIFormType) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Input value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="latex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latex*</FormLabel>
              <FormControl>
                <Input value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-full w-max" loading={isLoading}>
          <PlusCircle className="w-4 h-4 mr-2" />
          <span>{isEdit ? 'Edit Goal' : 'Add Goal'}</span>
        </Button>
      </form>
    </Form>
  )
}
