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
import { v4 as uuidv4 } from "uuid";
import { ModalContainer } from "./styled";

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
      setTags(expenseToEdit.tags.join(","));
      setOpen(true);
    }
  }, [expenseToEdit]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (editIndex !== null) {
      onCancelEdit();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      amount,
      tags: tags.split(","),
      time: new Date().toLocaleString(),
      user: process.env.REACT_APP_USER,
    };

    if (editIndex !== null) {
      onUpdateExpense(editIndex, { ...expenseToEdit, ...newExpense });
    } else {
      onAddExpense({ id: uuidv4(), ...newExpense });
    }

    setAmount("");
    setTags("");
    handleClose();
  };

  const handleAmountChange = (event) => {
    const newValue = event.target.value;

    if (newValue === "" || (newValue > 1 && !isNaN(newValue))) {
      setAmount(newValue);
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
            <Typography variant="p">Provide tags:</Typography>
            <TextField
              value={tags}
              onChange={(e) => setTags(e.target.value)}
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
