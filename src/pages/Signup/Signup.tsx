import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { SignupSchema, signupSchema } from '@/schema/auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Password from '@/components/ui/password'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/hooks/use-auth'

export default function Signup() {
  const { tokenData, signupMutation } = useAuthContext()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/home'

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      privacyPolicy: false,
      termsAndConditions: false,
    },
  })

  const handleSignup = (values: SignupSchema) => {
    signupMutation.mutate({ username: values.username, email: values.email, password: values.password })
  }

  if (tokenData) {
    return <Navigate to={{ pathname: redirectTo }} replace />
  }

  return (
    <div className='grid md:grid-cols-2 h-[80vh]'>
      <div className='items-center justify-center hidden md:flex gap-2'>
        <div>
          <div className='w-5 h-5 bg-primary rounded-full' />
          <div className='text-2xl font-bold'>finuncle</div>
        </div>
      </div>
      <div className='flex items-center justify-center p-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignup)} className='space-y-4 border rounded p-4 w-full'>
            <FormField
              disabled={signupMutation.isLoading}
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={signupMutation.isLoading}
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={signupMutation.isLoading}
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password placeholder='Enter your password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={signupMutation.isLoading}
              control={form.control}
              name='termsAndConditions'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='termsAndConditions' checked={field.value} onCheckedChange={field.onChange} />
                      <label
                        htmlFor='termsAndConditions'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        I have read, understood and agreed to{' '}
                        <Link to='/terms-and-conditions' className='underline'>
                          Finuncle&apos;s Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={signupMutation.isLoading}
              control={form.control}
              name='privacyPolicy'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Checkbox id='privacyPolicy' checked={field.value} onCheckedChange={field.onChange} />
                      <label
                        htmlFor='privacyPolicy'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        I have read, understood and agreed to{' '}
                        <Link to='/privacy-policies' className='underline'>
                          Finuncle&apos;s Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' loading={signupMutation.isLoading}>
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
