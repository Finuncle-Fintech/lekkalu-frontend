import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { ModalContainer } from "./styled";
import { formatDate } from "./utils";

const ExpenseFormModal = ({
  onAddExpense,
  onUpdateExpense,
  expenseToEdit,
  editIndex,
  onCancelEdit,
}) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount);
      setTags(expenseToEdit.tags.join(" "));
      setOpen(true);
    }
  }, [expenseToEdit]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function removeExtraSpaces(text) {
    return text.replace(/\s{2,}/g, ' ');
  }

  const handleClose = () => {
    setOpen(false);
    if (editIndex !== null) {
      onCancelEdit();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const arrayTags = removeExtraSpaces(tags).split(" ").map(tag => Number(tag));

    const newExpense = {
      amount,
      tags: arrayTags,
      user: 1,
    };

    if (editIndex !== null) {
      onUpdateExpense(editIndex, { ...expenseToEdit, ...newExpense });
    } else {
      onAddExpense({ time: formatDate(new Date()), ...newExpense });
    }

    setAmount("");
    setTags("");
    handleClose();
  };

  const handleAmountChange = (event) => {
    const newValue = event.target.value;

    if (newValue === "" || (newValue >= 0 && !isNaN(newValue))) {
      setAmount(newValue);
    } else {
      return;
    }
  };

  function isInputValid(input) {
    const regex = /^[\d\s]+$/;
    return regex.test(input) || input === "";
  }

  const handleTagsChange = (event) => {
    const newValue = event.target.value;

    if (isInputValid(newValue)) {
      setTags(newValue);
    } else {
      return;
    }
  };

  return (
    <ModalContainer>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {editIndex !== null ? "Edit Expense" : "Add Expense"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? "Edit Expense" : "Add Expense"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Typography variant="p">Provide the amount:</Typography>
            <TextField
              value={amount}
              onChange={handleAmountChange}
              required
              fullWidth
            />
            <Typography variant="p">Provide tags separated by spaces:</Typography>
            <TextField
              value={tags}
              onChange={handleTagsChange}
              required
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" color="primary">
                {editIndex !== null ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </ModalContainer>
  );
};

export default ExpenseFormModal;
