import React, { useMemo, useState } from 'react'
import { Delete } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import BeatLoader from 'react-spinners/BeatLoader'
import { deleteBudget, fetchBudgets } from '@/queries/budget'
import { BUDGET_QUERY_KEYS } from '@/utils/query-keys'
import EditBudgetModal from './EditBudgetModal'

dayjs.extend(customParseFormat)

export default function ViewAllBudgetModal() {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery([BUDGET_QUERY_KEYS.BUDGETS], fetchBudgets, { enabled: !!open })
  const deleteBudgetMutation = useMutation(deleteBudget, {
    onSuccess: () => {
      queryClient.invalidateQueries([BUDGET_QUERY_KEYS.BUDGETS])
    },
  })

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div style={{ width: '33rem', height: '10rem' }} className='d-flex align-items-center justify-content-center'>
          <BeatLoader color='#1976D2' />
        </div>
      )
    }

    return (
      <Table style={{ minWidth: '33rem' }}>
        <TableBody>
          {data?.map((budget) => (
            <TableRow key={budget.id}>
              <TableCell>{dayjs(budget.month, 'YYYY-MM-DD').format('MMMM')}</TableCell>
              <TableCell>{budget.limit}</TableCell>
              <TableCell>
                <EditBudgetModal budget={budget} />
                <IconButton
                  disabled={deleteBudgetMutation.isLoading}
                  aria-label='delete'
                  color='error'
                  onClick={() => {
                    deleteBudgetMutation.mutate(budget.id)
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }, [data, deleteBudgetMutation, isLoading])

  return (
    <>
      <Button
        variant='outlined'
        className='flex-grow-1'
        onClick={() => {
          setOpen(true)
        }}
      >
        View All
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <DialogTitle>Budgets</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </>
  )
}
