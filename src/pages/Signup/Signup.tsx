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
import Page from '@/components/Page/Page'

export default function Signup() {
  const { tokenData, signupMutation } = useAuthContext()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard'

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
    <div className='bg-primary'>
      <Page className='flex items-center justify-around h-screen'>
        <div className='flex-1 pt-4 hidden md:flex items-center justify-center'>
          <div className='relative'>
            <div className='absolute -top-10 -left-10 bg-white rounded-full w-10 h-10' />
            <p className='text-white text-2xl font-medium text-center'>finuncle</p>
          </div>
        </div>

        <div className='flex-1 max-w-xl mx-auto'>
          <div className='bg-white p-4 m-4 rounded-lg'>
            <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSignup)} className='space-y-4 w-full'>
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

                <Link to='/signin' className='block text-sm text-muted-foreground my-2'>
                  Already have an account? Login
                </Link>
              </form>
            </Form>
          </div>
        </div>
      </Page>
    </div>
  )
}
