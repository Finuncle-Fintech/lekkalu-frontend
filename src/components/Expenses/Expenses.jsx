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
import { ModalContainer } from "./styled";

const Expenses = () => {
  const {
    expenses,
    tags,
    fetchExpenses,
    deleteExpenseRequest,
    createExpenseRequest,
    changeExpenseRequest,
    fetchTags
  } = useContext(Context);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (!tags.length) fetchTags();
    if (!expenses.length) fetchExpenses();
  }, []);

  const getTagObjects = (tagValues) => {
    return tagValues
      .map((tagValue) => tags.find((tag) => tag.id === tagValue))
      .filter((tag) => tag !== undefined);
  };

  const getTagNames = (tagValues) => {
    return tagValues
      .map((tagValue) => {
        const foundTag = tags.find((tag) => tag.id === tagValue);
        return foundTag ? foundTag.name : null;
      })
      .filter((tagName) => tagName !== null)
      .join(', ');
  };

  const deleteExpense = (id) => {
    deleteExpenseRequest(id);
  };

  const createExpense = (expense) => {
    createExpenseRequest({ ...expense, tags: getTagObjects(expense.tags) });
  };

  const updateExpense = (index, expense) => {
    changeExpenseRequest(index, expense);
  };

  const returnExpenseToEdit = () => {
    return editIndex !== null ? { ... expenses[editIndex], tags: getTagObjects(expenses[editIndex].tags) } : null
  };

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
          {expenses && Boolean(expenses.length) && expenses.map((expense, index) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.amount} ₹</TableCell>
              <TableCell>{getTagNames(expense.tags)}</TableCell>
              <TableCell>{new Date(expense.time).toDateString(0)}</TableCell>
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
