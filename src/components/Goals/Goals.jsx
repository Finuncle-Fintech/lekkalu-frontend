/* eslint-disable */

import React, { useState, useContext, useEffect } from 'react'
import { Typography, TablePagination, IconButton } from '@mui/material'
import { SkipNext, SkipPrevious } from '@mui/icons-material'
import { Context } from '@/provider/Provider'
import GoalFormModal from './GoalsModal'
import GoalsList from './GoalsList'

export default function Goals() {
  const { goals, fetchGoals, deleteGoalRequest, createGoalRequest, changeGoalRequest } = useContext(Context)

  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  useEffect(() => {
    fetchGoals(page, rowsPerPage)
  }, [page])

  const deleteGoal = (id) => {
    deleteGoalRequest(id)
  }

  const createGoal = (goal) => {
    createGoalRequest({ ...goal })
  }

  const updateGoal = (goal) => {
    changeGoalRequest(goal)
  }

  const returnGoalToEdit = () => {
    return editIndex !== null ? { ...goals[editIndex] } : null
  }

  return (
    <div className='px-6 py-4'>
      <GoalFormModal
        onAddGoal={createGoal}
        onUpdateGoal={updateGoal}
        goalToEdit={returnGoalToEdit(editIndex)}
        handlerCancelEdit={() => setEditIndex(null)}
        editIndex={editIndex}
        Context={Context}
        statusModal={open}
        setStatusModal={setOpen}
      />
    </div>
  )
}
