import React, { useState } from "react";
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
import { StyledHeaderRow, ModalContainer } from "./styled";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const createExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const updateExpense = (index, expense) => {
    setExpenses(expenses.map((exp, idx) => (idx === index ? expense : exp)))
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
          {expenses.map((expense, index) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.amount} $</TableCell>
              <TableCell sx={{width: 200}}>{expense.tags.join(", ")}</TableCell>
              <TableCell>{expense.time}</TableCell>
              <TableCell>{expense.user}</TableCell>
              <TableCell>
                <IconButton edge="end" onClick={() => setEditIndex(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteExpense(index)}>
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
