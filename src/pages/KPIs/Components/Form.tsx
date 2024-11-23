import React from 'react'
import { PlusCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddCustomKPISchema } from '@/schema/custom_kpi'

type CustomKPIFormType = {
  isCustomKPIFlowVisible: boolean
  setIsCustomKPIFlowVisible: React.Dispatch<React.SetStateAction<boolean>>
  form: UseFormReturn<AddCustomKPISchema>
  onSubmit: (values: AddCustomKPISchema) => void
  isLoading: boolean
  isEdit?: boolean
}

export default function CustomKPIForm({
                                        isCustomKPIFlowVisible,
                                        setIsCustomKPIFlowVisible,
                                        form,
                                        onSubmit,
                                        isLoading,
                                        isEdit = false,
                                      }: CustomKPIFormType) {
  const toggleVisibility = () => setIsCustomKPIFlowVisible(!isCustomKPIFlowVisible)
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

        <div
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Build your own KPI</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Use the popular KPIs along with math
            operations to build your own custom KPI</p>
          <a onClick={toggleVisibility}
             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {!isCustomKPIFlowVisible ? 'Build Now' : 'Done with KPI'}
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>

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
        </div>

        <Button type="submit" className="col-span-full w-max" loading={isLoading}>
          <PlusCircle className="w-4 h-4 mr-2" />
          <span>{isEdit ? 'Edit KPI' : 'Add KPI'}</span>
        </Button>
      </form>
    </Form>
  )
}
