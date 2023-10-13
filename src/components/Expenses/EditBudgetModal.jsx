import { Edit } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useContext, useState } from 'react'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Swal from 'sweetalert2'
import { Context } from 'provider/Provider'
dayjs.extend(customParseFormat)

export default function EditBudgetModal({ budget }) {
  const [open, setOpen] = useState(false)
  const [limit, setLimit] = useState(budget.limit)
  const [month, setMonth] = useState(dayjs(budget.month, 'YYYY-MM-DD'))
  const { updateBudget } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!limit || !month) {
      Swal.fire({
        icon: 'error',
        title: 'Please enter all fields',
        timer: 2300,
        timerProgressBar: true,
      })
    }

    try {
      const data = {
        limit,
        month: month.format('YYYY-MM-DD'),
      }

      const response = await updateBudget(budget.id, data)
      if (response.status === 200) {
        setOpen(false)
        setLimit('')
        setMonth('')
      }
    } catch (error) {}
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
          <form onSubmit={handleSubmit} className='p-4'>
            <TextField
              className='mb-4'
              label='Limit'
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value)
              }}
              required
              fullWidth
            />
            <DatePicker
              onChange={(newValue) => {
                setMonth(newValue)
              }}
              value={month}
              views={['month']}
              label='Month'
              className='w-100 mb-4'
            />

            <div className='d-flex align-items-center gap-2 w-100'>
              <Button type='submit' variant='contained' className='flex-grow'>
                Update
              </Button>
              <Button
                className='flex-grow'
                onClick={() => {
                  setOpen(false)
                }}
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
