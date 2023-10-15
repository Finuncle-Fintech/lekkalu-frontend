import { Button, FormControl, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { EMAIL_REGEX } from 'utils/constants'
import { useContext } from 'react'
import { Context } from 'provider/Provider'
import styles from './Profile.module.css'

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
    <div className={styles.container}>
      <div className={styles.heading}>Update your info</div>
      <div className={styles.divider} />

      <form onSubmit={handleSubmit(handleUserProfileUpdate)}>
        <div className={styles.grid}>
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

      <div className={styles.heading}>Update your password</div>
      <div className={styles.divider} />

      <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)}>
        <div className={styles.grid}>
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
