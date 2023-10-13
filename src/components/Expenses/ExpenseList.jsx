import React from 'react'
import { Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Swal from 'sweetalert2'
import { useUserPreferences } from 'hooks/useUserPreferences'

const ExpensesList = ({ expenses, getTagNames, setEditIndex, deleteExpense }) => {
  const { preferences } = useUserPreferences()
  const deleteHandler = (expense) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this",
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'Red',
    }).then((res) => {
      if (res.isConfirmed) {
        deleteExpense(expense.id)
        Swal.fire('Deleted', 'Your expense deleted successfully.', 'success')
      }
    })
  }

  return (
    <Table>
      <TableBody>
        {expenses &&
          Boolean(expenses.length) &&
          expenses.map((expense, index) => {
            const expenseOfExpenses = expense?.data || expense

            return (
              <TableRow key={`${expenseOfExpenses.id}_${index}`}>
                <TableCell>
                  {expenseOfExpenses.amount} {preferences?.currencyUnit}
                </TableCell>
                <TableCell>{getTagNames(expenseOfExpenses.tags)}</TableCell>
                <TableCell>{new Date(expenseOfExpenses.time).toDateString(0)}</TableCell>
                <TableCell>
                  <IconButton placeholder='edit-expense' edge='end' onClick={() => setEditIndex(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    placeholder='delete-expense'
                    edge='end'
                    onClick={() => {
                      deleteHandler(expense)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}

export default ExpensesList
