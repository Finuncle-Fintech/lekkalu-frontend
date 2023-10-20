import { useMutation, useQuery } from '@tanstack/react-query'
import { ModalContainer } from 'components/Expenses/styled'
import { fetchGoals, setGoal, updateGoal, deleteGoal } from 'queries/goals'
import React, { useEffect, useState } from 'react'
import { GOALS_QUERY_KEYS } from 'utils/query-keys'
import Swal from 'sweetalert2'
import { IconButton, TablePagination, Typography } from '@mui/material'
import { SkipNext, SkipPrevious } from '@mui/icons-material'
import GoalsModal from './GoalsModal'
import { GoalDataInterface } from './GoalsInterfaces'
import GoalsList from './GoalsList'

export default function Goals() {
  const { data: goals } = useQuery([GOALS_QUERY_KEYS.GOALS], () => fetchGoals(page, rowsPerPage))

  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage) // Update the page state
  }

  useEffect(() => {
    fetchGoals(page, rowsPerPage)
  }, [page])

  const setGoalMutation = useMutation(setGoal, {
    onSuccess: () => {
      setOpen(false)

      Swal.fire({
        icon: 'success',
        title: 'Successfully set the goal.',
        timer: 2300,
        timerProgressBar: true,
      })
    },
  })
  const updateGoalMutation = useMutation(updateGoal, {
    onSuccess: () => {
      setOpen(false)

      Swal.fire({
        icon: 'success',
        title: 'Successfully updated.',
        timer: 2300,
        timerProgressBar: true,
      })
    },
  })

  const deleteGoalMutation = useMutation(deleteGoal, {
    onSuccess: () => {
      setOpen(false)

      Swal.fire({
        icon: 'success',
        title: 'Successfully set the budget',
        timer: 2300,
        timerProgressBar: true,
      })
    },
  })

  const deleteGoalRequest = (id: number) => {
    deleteGoalMutation.mutate(id)
  }

  const createGoal = (goal: GoalDataInterface) => {
    setGoalMutation.mutate({ ...goal })
  }

  const handleUpdateGoal = (goal: GoalDataInterface) => {
    updateGoalMutation.mutate(goal)
  }

  const returnGoalToEdit = (editIndex: number | null) => {
    if (goals === undefined || editIndex === null) {
      return null
    }
    return editIndex !== null ? { ...goals[editIndex] } : null
  }

  return (
    <ModalContainer>
      <GoalsModal
        onAddGoal={createGoal}
        onUpdateGoal={handleUpdateGoal}
        goalToEdit={returnGoalToEdit(editIndex)}
        handlerCancelEdit={() => { }}
        editIndex={null}
        statusModal={open}
        setStatusModal={setOpen}
      />

      <Typography variant='h6'>Financial Goals List</Typography>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={() => {
            setPage((prevPage) => Math.max(prevPage - 3, 0))
          }}
        >
          <SkipPrevious />
        </IconButton>
        <TablePagination
          component='div'
          count={goals?.length ?? 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          labelDisplayedRows={() => ''}
        />
        <IconButton
          onClick={() => {
            setPage((prevPage) => Math.min(prevPage + 3, 6))
          }}
        >
          <SkipNext />
        </IconButton>
        {page * 10 + 1} - {page * 10 + 10} of {goals?.length}
      </div>

      {
        goals !== undefined &&
        <GoalsList goals={goals} setEditIndex={setEditIndex} setStatusModal={setOpen} deleteGoal={deleteGoalRequest} />

      }

      {(goals?.length || 0) > 1 && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              setPage((prevPage) => Math.max(prevPage - 3, 0))
            }}
          >
            <SkipPrevious />
          </IconButton>
          <TablePagination
            component='div'
            count={goals?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
            labelDisplayedRows={() => ''}
          />
          <IconButton
            onClick={() => {
              setPage((prevPage) => Math.min(prevPage + 3, 6))
            }}
          >
            <SkipNext />
          </IconButton>
          {page * 10 + 1} - {page * 10 + 10} of {goals?.length || 0}
        </div>
      )}
    </ModalContainer>
  )
}
