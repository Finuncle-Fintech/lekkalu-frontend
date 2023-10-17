import React, { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SetBudgetSchema, setBudgetSchema } from '@/schema/budget'
import { setBudget } from '@/queries/budget'
import { DATE_FORMAT } from '@/utils/constants'

export default function SetBudgetModal() {
  const [open, setOpen] = useState(false)

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SetBudgetSchema>({
    resolver: zodResolver(setBudgetSchema),
    defaultValues: {
      month: dayjs().format(DATE_FORMAT),
    },
  })

  const setBudgetMutation = useMutation(setBudget, {
    onSuccess: () => {
      reset()
      setOpen(false)

      Swal.fire({
        icon: 'success',
        title: 'Successfully set the budget',
        timer: 2300,
        timerProgressBar: true,
      })
    },
  })

  const handleCreateBudget = (values: SetBudgetSchema) => {
    const dataToSubmit = {
      ...values,
      month: dayjs(values.month).format(DATE_FORMAT),
    }
    setBudgetMutation.mutate(dataToSubmit)
  }

  return (
    <>
      <Button
        variant='contained'
        className='flex-grow-1'
        onClick={() => {
          setOpen(true)
        }}
      >
        Set Budget
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <DialogTitle>Set Budget</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleCreateBudget)} className='p-4'>
            <TextField
              className='mb-4'
              label='Limit'
              fullWidth
              {...register('limit')}
              error={Boolean(errors?.limit?.message)}
              helperText={errors?.limit?.message}
              disabled={setBudgetMutation.isLoading}
            />
            <DatePicker
              views={['month']}
              label='Month'
              className='w-100 mb-4'
              defaultValue={dayjs()}
              {...register('month')}
              onChange={(date) => {
                const dayjsDate = date as dayjs.Dayjs
                if (dayjsDate) {
                  setValue('month', dayjsDate.format(DATE_FORMAT))
                }
              }}
              slotProps={{
                textField: {
                  error: Boolean(errors?.month?.message),
                  helperText: errors?.month?.message,
                },
              }}
              disabled={setBudgetMutation.isLoading}
            />

            <div className='d-flex align-items-center gap-2 w-100'>
              <Button type='submit' variant='contained' className='flex-grow' disabled={setBudgetMutation.isLoading}>
                Set
              </Button>
              <Button
                className='flex-grow'
                onClick={() => {
                  setOpen(false)
                }}
                disabled={setBudgetMutation.isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
