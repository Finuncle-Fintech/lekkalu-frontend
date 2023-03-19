import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TablePagination
} from "@mui/material";
import ExpenseFormModal from "./ExpensesModal";
import { Context } from 'provider/Provider';
import { ModalContainer } from "./styled";
import ExpensesList from "./ExpenseList";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (!tags.length) fetchTags();
    fetchExpenses(page, rowsPerPage);
  }, [page, rowsPerPage]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      <ExpensesList
        expenses={expenses}
        getTagNames={getTagNames}
        setEditIndex={setEditIndex}
        deleteExpense={deleteExpense}
      />
      <TablePagination
        component="div"
        count={90}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        rowsPerPageOptions={[]}
      />
    </ModalContainer>
  );
};

export default Expenses;
