import React from 'react';
import { Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ExpensesList = ({ expenses, getTagNames, setEditIndex, deleteExpense }) => {
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
                <IconButton placeholder="delete-expense" edge="end" onClick={() => deleteExpense(expense.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ExpensesList;
