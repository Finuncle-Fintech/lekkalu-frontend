import React from 'react';
import {Table, TableBody, TableRow, TableCell, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { ContainerDataList } from './styled';

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
        <Table style={{backgroundColor:'#D8FDFF'}}>
            <TableBody>
                {expenses &&
                    Boolean(expenses.length) &&
                    expenses.map((expense, index) =>{
                        const date = new Date(expense.time).toDateString(0)
                        const day = date.slice(8,10)
                        const month = date.slice(4,7)
                        const year = date.slice(13,15)

                        return(
                            <ContainerDataList key={expense.id}>
                                <span>{day} {month} '{year}</span>
                                <span> {getTagNames(expense.tags)} </span>
                                <span>{expense.amount}₹</span> 
                                <div>
                                    <IconButton placeholder="edit-expense" edge="end" onClick={() => setEditIndex(index)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton placeholder="delete-expense" edge="end" onClick={() => {
                                        deleteHandler(expense)
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </ContainerDataList>
                        )
                    })}
            </TableBody>
        </Table>
    );
};

export default ExpensesList;
