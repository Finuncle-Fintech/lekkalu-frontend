import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpenseFormModal from "./ExpensesModal";
import { Context } from 'provider/Provider';
import { StyledHeaderRow, ModalContainer } from "./styled";

const Expenses = () => {
  const {
    expenses,
    fetchExpenses,
    deleteExpenseRequest,
    createExpenseRequest,
    changeExpenseRequest,
  } = useContext(Context);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (!expenses.length) fetchExpenses();
  }, []);

  const deleteExpense = (id) => {
    deleteExpenseRequest(id);
  };

  const createExpense = (expense) => {
    createExpenseRequest(expense);
  };

  const updateExpense = (index, expense) => {
    changeExpenseRequest(index, expense);
  };

  const returnExpenseToEdit = () => {
    return editIndex !== null ? expenses[editIndex] : null
  }

  return (
    <ModalContainer>
      <ExpenseFormModal
        onAddExpense={createExpense}
        onUpdateExpense={updateExpense}
        expenseToEdit={returnExpenseToEdit()}
        editIndex={editIndex}
        onCancelEdit={() => setEditIndex(null)}
      />
      <Typography variant="h6">Expense List</Typography>
      <Table>
        <TableBody>
          {Boolean(expenses.length) &&
            <StyledHeaderRow>
            <TableCell>Amount</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Actions</TableCell>
            </StyledHeaderRow>
          }
          {expenses && Boolean(expenses.length) && expenses.map((expense, index) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.amount} $</TableCell>
              <TableCell sx={{width: 200}}>{expense.tags.join(", ")}</TableCell>
              <TableCell>{new Date(expense.time).toDateString(0)}</TableCell>
              <TableCell>{expense.user}</TableCell>
              <TableCell>
                <IconButton edge="end" onClick={() => setEditIndex(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteExpense(expense.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ModalContainer>
  );
};

export default Expenses;
