import React from 'react';
import {Table, TableBody, TableRow, TableCell, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { ContainerDataList } from './styled';


function convertNumberToShortFormat(number) {
    
    if (number >= 1000) {
      const suffixes = ["", "k", "M", "B", "T"];
      const suffixIndex = Math.floor(Math.log10(number) / 3);
      const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(1);
      return shortNumber + suffixes[suffixIndex];
    }
    return number.toString()
  }

const ExpensesList = ({expenses, getTagNames, setEditIndex, deleteExpense}) => {

    const deleteHandler = (expense) => {

        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to revert this`,
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: "Red"
        }).then((res) => {
            if (res.isConfirmed) {
                deleteExpense(expense.id)
                Swal.fire(
                    'Deleted',
                    'Your expense deleted successfully.',
                    'success'
                )
            }
        })

    }

    return (
        <article style={{backgroundColor:'#D8FDFF'}}>
                {expenses &&
                    Boolean(expenses.length) &&
                    expenses.map((expense, index) =>{
                        const expenseOfExpenses = expense?.data||expense

                        const date = new Date(expenseOfExpenses.time).toDateString(0)
                        const day = date.slice(8,10)
                        const month = date.slice(4,7)
                        const year = date.slice(13,15)
                        
                        return(
                            <ContainerDataList key={expenseOfExpenses.id || index}>
                                <span>{day} {month} '{year}</span>
                                <span> #{getTagNames(expenseOfExpenses.tags)} </span>
                                <span>{convertNumberToShortFormat(expenseOfExpenses.amount)}₹</span> 
                                <div>
                                    <IconButton placeholder="edit-expense" edge="end" onClick={() => setEditIndex(index)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton placeholder="delete-expense" edge="end" onClick={() => {
                                        deleteHandler(expenseOfExpenses)
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </ContainerDataList>
                        )
                    })}
        </article>
    );
};

export default ExpensesList;
