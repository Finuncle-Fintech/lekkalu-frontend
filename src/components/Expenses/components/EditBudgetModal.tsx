import React, { useState } from 'react'
import { Edit } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Budget } from 'types/budget'
import { useForm } from 'react-hook-form'
import { UpdateBudgetSchema, updateBudgetSchema } from 'schema/budget'
import { zodResolver } from '@hookform/resolvers/zod'
import { DATE_FORMAT } from 'utils/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBudget } from 'queries/budget'
import { BUDGET_QUERY_KEYS } from 'utils/query-keys'

dayjs.extend(customParseFormat)

type Props = {
  budget: Budget
}

export default function EditBudgetModal({ budget }: Props) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm<UpdateBudgetSchema>({
    resolver: zodResolver(updateBudgetSchema),
    defaultValues: {
      limit: budget.limit,
      month: dayjs(budget.month, DATE_FORMAT).format(DATE_FORMAT),
    },
  })

  const updateBudgetMutation = useMutation((dto: UpdateBudgetSchema) => updateBudget(budget.id, dto), {
    onSuccess: () => {
      queryClient.invalidateQueries([BUDGET_QUERY_KEYS.BUDGETS])
      reset()
      setOpen(false)
    },
  })

  const handleUpdateBudget = (values: UpdateBudgetSchema) => {
    const dataToSubmit = {
      ...values,
      month: dayjs(values.month).format(DATE_FORMAT),
    }
    updateBudgetMutation.mutate(dataToSubmit)
  }

  return (
    <>
      <IconButton
        aria-label='edit'
        onClick={() => {
          setOpen(true)
        }}
      >
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <DialogTitle>Edit Budget</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleUpdateBudget)} className='p-4'>
            <TextField
              className='mb-4'
              label='Limit'
              fullWidth
              {...register('limit')}
              error={Boolean(errors?.limit?.message)}
              helperText={errors?.limit?.message}
              disabled={updateBudgetMutation.isLoading}
            />
            <DatePicker
              views={['month']}
              label='Month'
              className='w-100 mb-4'
              defaultValue={dayjs(budget.month, DATE_FORMAT)}
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
              disabled={updateBudgetMutation.isLoading}
            />

            <div className='d-flex align-items-center gap-2 w-100'>
              <Button type='submit' variant='contained' className='flex-grow' disabled={updateBudgetMutation.isLoading}>
                Update
              </Button>
              <Button
                className='flex-grow'
                onClick={() => {
                  setOpen(false)
                }}
                disabled={updateBudgetMutation.isLoading}
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
