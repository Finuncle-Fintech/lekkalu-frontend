import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeftIcon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import Page from '@/components/Page/Page'
import { AddGoalSchema, addGoalSchema } from '@/schema/goals'
import { addGoal } from '@/queries/goals'
import { useToast } from '@/components/ui/use-toast'
import { TooltipTrigger, TooltipProvider, TooltipContent, Tooltip } from '@/components/ui/tooltip'
import Form from '../components/Form'

export default function CreateGoal() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const form = useForm<AddGoalSchema>({
    resolver: zodResolver(addGoalSchema),
    defaultValues: {
      target_date: dayjs().format('YYYY-MM-DD'),
    },
  })

  const createGoalMutation = useMutation({
    mutationFn: addGoal,
    onSuccess: () => {
      toast({ title: 'Goal created successfully!' })
      navigate('/goals')
    },
    onError: (response: any) => {
      const message = response?.response?.data?.message
      message && toast({ title: message })
    },
  })

  const handleGoalCreate = (values: AddGoalSchema) => {
    createGoalMutation.mutate(values)
  }

  return (
    <Page className='space-y-8'>
      <div>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Create a new goal</h1>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className='text-sm underline hover:cursor-pointer'>what is a goal?</p>
                </TooltipTrigger>
                <TooltipContent side={'bottom'}>
                  <div className='w-[300px]'>
                    <ul>
                      <li className='p-2 text-gray-500'>
                        Creating a goal allows you to keep track of your income and expenses with visualized graphs.
                      </li>
                      <li className='px-2 underline text-blue-500'>
                        <Link to=''>View detail</Link>
                      </li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-200 my-2' />
      </div>
      <Link className='flex items-center gap-2 text-muted-foreground w-fit' to='/goals'>
        <ArrowLeftIcon className='w-4 h-4' />
        Back to Goals
      </Link>
      <Form form={form} onSubmit={handleGoalCreate} isLoading={createGoalMutation.isPending} />
    </Page>
  )
}
