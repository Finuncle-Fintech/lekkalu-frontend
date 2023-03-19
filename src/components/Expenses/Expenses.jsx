import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TablePagination,
  IconButton
} from "@mui/material";
import { SkipNext, SkipPrevious } from '@mui/icons-material';
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
  const rowsPerPage = 10;

  useEffect(() => {
    if (!tags.length) fetchTags();
    fetchExpenses(page, rowsPerPage);
  }, [page]);

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
    createExpenseRequest({ ...expense });
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={() => {
            setPage((prevPage) => Math.max(prevPage - 3, 0));
          }}
        >
          <SkipPrevious />
        </IconButton>
        <TablePagination
          component="div"
          count={90}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          labelDisplayedRows={() => ''}
        />
        <IconButton
          onClick={() => {
            setPage((prevPage) => Math.min(prevPage + 3, Math.floor(8)));
          }}
        >
          <SkipNext />
        </IconButton>
        {page * 10 + 1} - {page * 10 + 10} of 90
      </div>
      <ExpensesList
        expenses={expenses}
        getTagNames={getTagNames}
        setEditIndex={setEditIndex}
        deleteExpense={deleteExpense}
      />
      {!!expenses.length &&
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              setPage((prevPage) => Math.max(prevPage - 3, 0));
            }}
          >
            <SkipPrevious />
          </IconButton>
          <TablePagination
            component="div"
            count={90}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
            labelDisplayedRows={() => ''}
          />
          <IconButton
            onClick={() => {
              setPage((prevPage) => Math.min(prevPage + 3, 8));
            }}
          >
            <SkipNext />
          </IconButton>
          {page * 10 + 1} - {page * 10 + 10} of 90
        </div>
      }
    </ModalContainer>
  );
};

export default Expenses;
