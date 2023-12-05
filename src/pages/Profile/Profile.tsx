import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema, userProfileSchema } from '../../schema/user'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Password from '@/components/ui/password'
import { useToast } from '@/components/ui/use-toast'

type UserProfileSchema = z.infer<typeof userProfileSchema>
type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

export default function Profile() {
  const { toast } = useToast()
  // @TODO: Add user details initially
  const userProfileForm = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
  })

  const passwordForm = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  })

  const handleUserProfileUpdate = () => {
    toast({
      title: 'Feature under development!',
      description: 'This feature is still under development and will be available soon!',
    })
  }

  const handlePasswordChange = () => {
    toast({
      title: 'Feature under development!',
      description: 'This feature is still under development and will be available soon!',
    })
  }

  return (
    <div className='max-w-screen-xl mx-auto align-self-start min-h-[80vh] p-4'>
      <div className='text-lg font-bold'>Update your info</div>
      <div className='w-full h-[1px] bg-gray-500/20 my-4' />

      <Form {...userProfileForm}>
        <form onSubmit={userProfileForm.handleSubmit(handleUserProfileUpdate)} className='space-y-4 mb-4'>
          <div className='grid md:grid-cols-2 gap-4'>
            <FormField
              control={userProfileForm.control}
              name='first_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your first name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userProfileForm.control}
              name='last_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your last name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userProfileForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your first name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit'>Update</Button>
        </form>
      </Form>

      <div className='text-lg font-bold'>Update your password</div>
      <div className='w-full h-[1px] bg-gray-500/20 my-4' />

      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className='space-y-4 mb-4'>
          <div className='grid md:grid-cols-2 gap-4'>
            <FormField
              control={passwordForm.control}
              name='current_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Password placeholder='Enter your current password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name='new_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Password placeholder='Enter your new password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name='confirm_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password placeholder='Confirm password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type='submit'>Change Password</Button>
        </form>
      </Form>
    </div>
  )
}
