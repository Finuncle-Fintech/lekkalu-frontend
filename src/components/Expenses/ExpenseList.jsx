import React from 'react';
import { Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';

const ExpensesList = ({ expenses, getTagNames, setEditIndex, deleteExpense }) => {

  const deleteHandler = (expense) =>{

      Swal.fire({
        icon:'question',
        title:'Do you want to delete this expense?',
        showConfirmButton:true,
        showCancelButton:true,
        confirmButtonText:'Yes.',
        confirmButtonColor:"#0289C8"
      }).then((res)=>{
        switch(res.isConfirmed){
          case true:
              deleteExpense(expense.id)
        }
      })
    
  }

  return (
    <Table>
      <TableBody>
        {expenses &&
          Boolean(expenses.length) &&
          expenses.map((expense, index) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.amount} ₹</TableCell>
              <TableCell>{getTagNames(expense.tags)}</TableCell>
              <TableCell>{new Date(expense.time).toDateString(0)}</TableCell>
              <TableCell>
                <IconButton placeholder="edit-expense" edge="end" onClick={() => setEditIndex(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton placeholder="delete-expense" edge="end" onClick={() =>{deleteHandler(expense)}}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ExpensesList;
