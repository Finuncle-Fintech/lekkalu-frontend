import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Lottie from 'lottie-react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FeedbackSchema, feedbackSchema } from '@/schema/feedback'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { submitFeedback } from '@/queries/feedback'
import When from '@/components/When/When'
import successAnimation from '@/assets/success-animation.json'
import errorAnimation from '@/assets/error-animation.json'

type FeedbackState = 'INITIAL' | 'SUBMITTED' | 'ERROR'

export default function FeedbackForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [status, setStatus] = useState<FeedbackState>('INITIAL')

  const form = useForm<FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
  })

  const feedbackMutation = useMutation(submitFeedback, {
    onSuccess: () => {
      form.reset()
      setStatus('SUBMITTED')
      setTimeout(() => {
        setStatus('INITIAL')
        setIsDialogOpen(false)
      }, 4000)
    },
    onError: () => {
      setStatus('ERROR')
    },
  })

  const handleFeedbackSubmit = (values: FeedbackSchema) => {
    feedbackMutation.mutate(values)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        <div className='absolute right-4 cursor-pointer -top-8 px-4 rounded-tl-lg rounded-tr-lg h-8 flex items-center justify-center text-primary border-primary border-l border-r border-t'>
          Leave your feedback
        </div>
      </DialogTrigger>
      <DialogContent>
        <When truthy={status === 'INITIAL'}>
          <DialogHeader>
            <DialogTitle>Share your thoughts with us</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFeedbackSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your name</FormLabel>
                    <FormControl>
                      <Input placeholder='Your full name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your email</FormLabel>
                    <FormControl>
                      <Input placeholder='Your email address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='subject_and_description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Write a message for us' rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className='gap-2'>
                <Button
                  loading={feedbackMutation.isLoading}
                  type='button'
                  variant='outline'
                  onClick={() => {
                    setIsDialogOpen(false)
                  }}
                >
                  Cancel
                </Button>
                <Button type='submit' loading={feedbackMutation.isLoading}>
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </When>
        <When truthy={status === 'SUBMITTED'}>
          <Lottie animationData={successAnimation} className='max-w-xl' />
        </When>
        <When truthy={status === 'ERROR'}>
          <Lottie animationData={errorAnimation} className='max-w-xl' />
          <div className='text-red-500 text-lg font-medium text-center'>Something went wrong!</div>
          <Button
            onClick={() => {
              setStatus('INITIAL')
            }}
          >
            Try again!
          </Button>
        </When>
      </DialogContent>
    </Dialog>
  )
}
