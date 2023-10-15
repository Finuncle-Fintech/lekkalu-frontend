import { Button, FormControl, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { EMAIL_REGEX } from 'utils/constants'
import { useContext } from 'react'
import { Context } from 'provider/Provider'

export default function Profile() {
  const { user } = useContext(Context)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
    },
  })

  const passwordForm = useForm()

  const handleUserProfileUpdate = () => {
    Swal.fire({
      title: 'Profile updated successfully!',
      icon: 'success',
    })
  }

  const handlePasswordChange = () => {
    Swal.fire({
      title: 'Password updated successfully!',
      icon: 'success',
    })
  }

  return (
    <div className='max-w-screen-xl mx-auto align-self-start min-h-[80vh] p-4'>
      <div className='text-lg font-bold'>Update your info</div>
      <div className='w-full h-[1px] bg-gray-500/20 my-4' />

      <form onSubmit={handleSubmit(handleUserProfileUpdate)} className='space-y-4 mb-4'>
        <div className='grid md:grid-cols-2 gap-4'>
          <FormControl>
            <TextField
              label='First Name'
              {...register('first_name', {
                required: 'First name is required',
                minLength: {
                  value: 3,
                  message: 'Please enter at least 3 characters!',
                },
                maxLength: {
                  value: 20,
                  message: 'Please enter at most 20 characters!',
                },
              })}
              error={Boolean(errors?.first_name?.message)}
              helperText={errors?.first_name?.message}
            />
          </FormControl>

          <FormControl>
            <TextField
              label='Last Name'
              {...register('last_name', {
                minLength: {
                  value: 3,
                  message: 'Please enter at least 3 characters!',
                },
                maxLength: {
                  value: 20,
                  message: 'Please enter at most 20 characters!',
                },
              })}
              error={Boolean(errors?.last_name?.message)}
              helperText={errors?.last_name?.message}
            />
          </FormControl>

          <FormControl>
            <TextField
              label='Email'
              {...register('email', {
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Please enter a valid email!',
                },
              })}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
          </FormControl>
        </div>

        <Button variant='contained' type='submit'>
          Update
        </Button>
      </form>

      <div className='text-lg font-bold'>Update your password</div>
      <div className='w-full h-[1px] bg-gray-500/20 my-4' />

      <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className='space-y-4 mb-4'>
        <div className='grid md:grid-cols-2 gap-4'>
          <FormControl>
            <TextField
              label='Current Password'
              {...passwordForm.register('current_password', {
                required: 'Current password is required',
              })}
              error={Boolean(passwordForm.formState.errors?.current_password?.message)}
              helperText={passwordForm.formState.errors?.current_password?.message}
            />
          </FormControl>

          <FormControl>
            <TextField
              type='password'
              label='New Password'
              {...passwordForm.register('new_password', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Please enter at least 8 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Please enter at most 20 characters',
                },
              })}
              error={Boolean(passwordForm.formState.errors?.new_password?.message)}
              helperText={passwordForm.formState.errors?.new_password?.message}
            />
          </FormControl>

          <FormControl>
            <TextField
              type='password'
              label='Confirm Password'
              {...passwordForm.register('confirm_password', {
                required: 'Confirm password is required',
                validate: (value, formValues) => {
                  if (value !== formValues?.new_password) {
                    return 'Value does not match'
                  }
                },
              })}
              error={Boolean(passwordForm.formState.errors?.confirm_password?.message)}
              helperText={passwordForm.formState.errors?.confirm_password?.message}
            />
          </FormControl>
        </div>

        <Button variant='contained' type='submit'>
          Change Password
        </Button>
      </form>
    </div>
  )
}
